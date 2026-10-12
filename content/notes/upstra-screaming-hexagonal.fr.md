---
title: Screaming et hexagonale sur Upstra, et ce que j'ai laissé passer en review
summary: Les deux architectures ne s'opposent pas. Upstra les combine, et relire le code montre où la règle de dépendance a cédé, avec mon approbation de relecteur.
date: 2026-11-01
tags: [architecture, nestjs, hexagonal, typescript]
published: false
---

On présente souvent l'architecture hexagonale et la screaming architecture comme deux options concurrentes. Ce n'est pas le cas : elles répondent à deux questions différentes, et Upstra utilise les deux. En relisant le code quelques mois plus tard, j'ai aussi vu où nous les avions appliquées à moitié, et c'est moi qui avais approuvé ces merge requests.

Upstra est une plateforme de gestion d'infrastructure de labo : serveurs, VM, onduleurs, cartes iLO, salles. Back en NestJS, front en Vue 3, et des microservices Python pour parler aux onduleurs. Le code est [public sur GitHub](https://github.com/Upstra/infra-control).

C'était un projet d'équipe. Je répartissais les tâches, je jouais un peu le rôle de chef de projet, et je relisais le code avant chaque merge.

<!-- TODO : taille de l'équipe, durée du projet, contexte (école, entreprise ?). -->

## Deux questions différentes

La **screaming architecture** répond à la question « qu'est-ce que fait ce système ? ». L'idée vient d'un article de Robert C. Martin de 2011 : quand on ouvre le projet, l'arborescence doit parler du métier, pas du framework. Un dossier `servers/` plutôt qu'un dossier `controllers/`.

L'**architecture hexagonale** (ports et adapters, Alistair Cockburn) répond à « dans quel sens vont les dépendances ? ». Le cœur métier ne connaît ni la base, ni HTTP, ni les SDK externes. Il expose des ports, et l'infrastructure les implémente.

La première organise le découpage **horizontal** (par domaine), la seconde le découpage **vertical** (par couche). Rien n'empêche de faire les deux, et c'est ce que fait Upstra.

## Ce que ça donne dans Upstra

Au premier niveau, les modules crient ce que fait l'application :

```
src/modules/
├── servers/
├── vms/
├── ups/
├── ilos/        # cartes HPE iLO : allumage et extinction à distance
├── rooms/
├── groups/
├── permissions/
└── ...
```

Et dans chaque module, on retrouve les couches de l'hexagone :

```
servers/
├── domain/          # entités, services de domaine, ports (interfaces de repository)
├── application/     # use cases, DTO, controllers
└── infrastructure/  # implémentations TypeORM des repositories
```

Quelqu'un qui découvre le projet sait où aller pour toucher aux serveurs, et sait que les use cases sont dans `application/`. Pour la lisibilité, ça marche bien.

## Là où la règle de dépendance cède

L'hexagonale n'a qu'une règle vraiment importante : **le domaine ne dépend de rien**. En relisant `servers/domain/`, je vois deux entorses, que j'ai toutes les deux validées en review.

**L'entité du domaine est une entité TypeORM.** `Server` porte `@Entity`, `@Column`, `@ManyToOne`, et même `@ApiProperty` de Swagger. Le domaine dépend donc de l'ORM et de la doc HTTP. Changer d'ORM ou de format d'API obligerait à toucher au cœur.

**Le service de domaine importe des DTO de la couche application :**

```ts
// servers/domain/services/server.domain.service.ts
import { ServerCreationDto } from '../../application/dto/server.creation.dto';
```

La flèche part du domaine vers l'application, donc dans le mauvais sens. C'est le genre de détail qui ne casse rien au quotidien, et c'est pour ça qu'il passe.

## Pourquoi la review ne l'a pas arrêté

En relisant une merge request, je regardais surtout si la fonctionnalité marchait, si les tests passaient et si le code était lisible. Le sens d'un `import` dans un fichier de service, je ne le regardais presque jamais. Et quand plusieurs personnes livrent en parallèle et que le relecteur est aussi celui qui répartit le travail, l'attention va d'abord au fonctionnel.

Le vrai problème n'était pas l'inattention. C'est qu'une règle d'architecture qui ne repose que sur la vigilance du relecteur n'est pas une règle. Elle tient tant que le relecteur a le temps, et sur un projet avec des délais, il ne l'a jamais longtemps.

<!-- TODO : pourquoi TypeORM dans le domaine au départ ? Délai, facilité avec NestJS, choix explicite de l'équipe ? Une ou deux phrases honnêtes. -->

## Faut-il corriger ? Pas forcément

C'est là que la question de la sur-ingénierie se pose. Séparer proprement l'entité du domaine et l'entité de persistance, c'est une classe de plus et un mapper de plus par agrégat. Sur Upstra, le domaine reste assez simple et on ne change pas d'ORM.

Robert C. Martin le dit lui-même dans l'article sur la Clean Architecture : les cercles sont schématiques, il peut y en avoir plus ou moins. Le problème vient rarement de la théorie. Il vient de son application mécanique : une interface pour chaque classe, un mapper pour chaque objet, une couche parce que le schéma en a une.

La règle que j'applique maintenant : une abstraction doit répondre à un besoin qui existe déjà.

- **Plusieurs implémentations réelles ?** Le port est justifié. Dans Upstra, le pilotage de l'alimentation passe par iLO, par les onduleurs ou par VMware selon l'équipement : là, l'abstraction sert.
  <!-- TODO : vérifier que c'est bien derrière un port commun dans le code. Sinon, prendre un autre exemple réel. -->
- **Besoin de tester sans l'infrastructure ?** Justifié aussi, c'est le principal gain de l'hexagonale.
- **« Au cas où on changerait de base un jour » ?** Non.

<!-- TODO : un exemple vécu d'abstraction inutile (dans Upstra, à l'école ou ailleurs). Mieux vaut un vrai cas modeste qu'un exemple caricatural. -->

## Ce que je referais en tant que lead

- Garder la structure par modules : c'est ce qui a le mieux vieilli.
- Interdire au domaine d'importer `application/` ou `infrastructure/` avec une règle de lint qui bloque la CI. `eslint-plugin-boundaries` ou `dependency-cruiser` font ça très bien. La machine vérifie le sens des dépendances, et la review se concentre sur ce qu'elle seule peut juger : le métier, les noms, les cas limites.
- Écrire les règles d'architecture dans un ADR dès le premier sprint, et les expliquer à chaque personne qui rejoint le projet, plutôt que de les corriger au fil des reviews.
- Accepter TypeORM dans le domaine **en le sachant**, et l'écrire dans cet ADR, plutôt que de prétendre à une hexagonale pure qu'on n'a pas.

Le dernier point est le plus important. Un compromis documenté est un choix d'architecture. Un compromis qu'on découvre en relisant le code est une dette.
