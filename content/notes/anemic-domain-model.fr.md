---
title: Notre modèle de domaine était anémique, et sa documentation disait le contraire
summary: Relire une entité Upstra avec un œil DDD. Ce qu'est un modèle anémique, pourquoi il s'installe sans bruit, et comment le rendre riche sans tout réécrire.
date: 2026-11-15
tags: [ddd, architecture, typescript, nestjs]
published: false
---

Le modèle de domaine anémique est l'anti-pattern DDD le plus facile à écrire sans s'en rendre compte : des entités qui ne contiennent que des données, et toute la logique dans des services. Martin Fowler l'a décrit dès 2003. Nous l'avons pourtant reproduit sur Upstra, un projet d'équipe qui revendiquait le DDD, et dont je relisais le code avant chaque merge.

## Ce que j'ai trouvé en relisant

Dans Upstra, un serveur a un état : allumé ou éteint. La documentation du service de domaine est ambitieuse :

```ts
/**
 * Manages core server operations within the domain layer, including state transitions
 * (e.g. UP/DOWN), health checks, and delegation to lower-level adapters (iLO, SSH).
 * - Performing business rules when changing a server's state (graceful shutdown, force restart).
 */
@Injectable()
export class ServerDomainService {
```

Et voici ce qu'il fait réellement :

```ts
updateServerEntityFromDto(server: Server, dto: ServerUpdateDto): Server {
  server.name = dto.name ?? server.name;
  server.state = dto.state ?? server.state;
  server.ip = dto.ip ?? server.ip;
  // ...
  return server;
}
```

Aucune règle. L'état est une `string` qu'on écrase avec ce qui arrive dans la requête. Rien n'empêche de passer un serveur à `"UP"` sans l'avoir démarré, ni d'écrire `"up"` ou `"STARTING"`. La logique métier annoncée par le commentaire n'est pas dans ce service : elle est éparpillée dans les use cases, ou elle n'existe pas.

<!-- TODO : vérifier où vit réellement la logique d'allumage et d'extinction (use cases ? module ilos ?) et le dire précisément. -->

## Pourquoi c'est un problème

Ce n'est pas une question d'élégance.

- **Les états invalides sont représentables.** Si le code peut construire un serveur dans un état absurde, il finira par le faire.
- **Les règles se dupliquent.** Chaque use case qui touche à l'état doit refaire ses vérifications, et un jour l'un d'eux oubliera.
- **Les tests ne protègent pas l'essentiel.** On teste des services qui copient des champs, alors que les vraies règles sont ailleurs.

On paie le coût du DDD (couches, vocabulaire, structure) sans en avoir le bénéfice.

## La même entité, en version riche

L'idée : l'entité garde ses invariants, et on ne modifie l'état qu'à travers des méthodes qui portent un sens métier.

```ts
export type PowerState = 'UP' | 'DOWN';

export class Server {
  private constructor(
    readonly id: string,
    private name: string,
    private powerState: PowerState,
    private priority: number,
  ) {}

  static register(id: string, name: string, priority: number): Server {
    if (!name.trim()) throw new InvalidServerName();
    if (priority < 1) throw new InvalidPriority(priority);
    return new Server(id, name, 'DOWN', priority);
  }

  markStarted(): void {
    if (this.powerState === 'UP') throw new ServerAlreadyUp(this.id);
    this.powerState = 'UP';
  }

  markStopped(): void {
    if (this.powerState === 'DOWN') throw new ServerAlreadyDown(this.id);
    this.powerState = 'DOWN';
  }

  get isUp(): boolean {
    return this.powerState === 'UP';
  }
}
```

Ce qui a changé :

- l'état est un type fermé et non une `string` ;
- impossible de créer un serveur sans nom ou avec une priorité invalide ;
- impossible de changer l'état sans passer par une méthode qui vérifie la transition ;
- les tests unitaires portent sur l'entité, sans base ni framework.

L'appel réel à la carte iLO reste dans un adapter. L'entité ne sait pas *comment* on éteint un serveur, elle sait *quand* ce changement a un sens.

## Ce qui ne va pas dans l'entité

Le modèle riche a ses propres excès. Tout ne doit pas finir dans l'entité :

- **la validation de format d'une requête HTTP** reste dans le DTO ;
- **les règles qui portent sur plusieurs agrégats** (« pas deux serveurs avec la même priorité dans un groupe ») vont dans un service de domaine. C'est précisément son rôle ;
- **l'orchestration** (charger, appeler iLO, sauvegarder, notifier) reste dans le use case.

Upstra a d'ailleurs une `DuplicatePriorityException` dans le domaine des serveurs : c'est typiquement une règle de service de domaine, pas d'entité.

## Le DDD ne commence pas dans le code

Un modèle anémique est souvent le symptôme d'autre chose : on a commencé par les tables. Le DDD commence par le langage du métier : quels mots les gens utilisent, quelles transitions ont un sens pour eux, quelles règles ils considèrent comme évidentes. Les patterns tactiques (entités, value objects, agrégats) viennent ensuite traduire ce langage.

<!-- TODO : un retour de ta pratique actuelle, en restant générique (« sur une application de crédit... ») : est-ce que tu modélises différemment aujourd'hui, en Kotlin avec Either par exemple ? Deux ou trois phrases suffisent. -->

## Ce que ça change pour la review

Un modèle anémique ne se voit pas dans une merge request. Chaque diff est raisonnable : un champ de plus dans le DTO, une ligne de plus dans `updateServerEntityFromDto`. C'est l'accumulation qui pose problème, et la review regarde le diff, pas l'accumulation.

Depuis, en relisant du code, je me pose une question simple sur chaque entité modifiée : « quelle règle cette classe garantit-elle ? ». Si la réponse est « aucune », c'est le moment d'en parler, avant que dix autres champs suivent le même chemin.

## Ce que je retiens

Le signe le plus fiable d'un modèle anémique n'est pas l'absence de méthodes. C'est le **setter public sur un champ qui a des règles**. Si `server.state = ...` compile depuis n'importe où, les règles sur l'état ne sont garanties nulle part.
