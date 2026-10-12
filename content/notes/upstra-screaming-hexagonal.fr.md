---
title: Screaming et hexagonale sur Upstra, et ce que j'ai laissé passer en review
summary: Upstra mélange deux architectures qu'on oppose souvent. Relire son code, c'est voir où la règle de dépendance a cédé, et revenir sur une merge request que j'ai validée trop vite.
date: 2026-10-12
tags: [architecture, nestjs, hexagonal, typescript]
published: true
---

Upstra, c'est six mois à trois chez Eurialys. Une plateforme qui pilote l'infrastructure d'un labo : serveurs, VM, onduleurs, cartes iLO. Du NestJS derrière, du Vue 3 devant, et un service Python, `ups_manager`, qui parle vraiment aux machines. Le code est [public sur GitHub](https://github.com/Upstra/infra-control).

J'étais le lead. Je répartissais les tâches, je faisais un peu le chef de projet, et je relisais les merge requests. L'architecture, en revanche, on l'a décidée ensemble : on a réfléchi à trois à ce qui serait le mieux, et on a choisi ça. Les défauts qui suivent sont donc ceux de l'équipe, mais c'est moi qui validais.

## Screaming plus hexagonale

On oppose souvent les deux, alors qu'elles ne répondent pas à la même question. La screaming architecture dit comment ranger le projet : par métier (`servers/`, `vms/`, `ups/`) plutôt que par technique (`controllers/`). L'hexagonale dit dans quel sens vont les dépendances : le domaine ne connaît ni la base ni HTTP, et c'est l'infrastructure qui implémente ses ports. Upstra fait les deux.

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

Et dans chaque module, les couches de l'hexagone :

```
servers/
├── domain/          # entités, services de domaine, ports (interfaces de repository)
├── application/     # use cases, DTO, controllers
└── infrastructure/  # implémentations TypeORM des repositories
```

Quand on ouvre le projet, on sait où aller pour toucher aux serveurs. De ce côté-là, ça a bien tenu.

## Là où ça cède

Le domaine ne devrait dépendre de rien. Dans Upstra, il dépend de trois choses.

**TypeORM.** `Server` porte `@Entity`, `@Column`, `@ManyToOne`, et même `@ApiProperty` de Swagger. C'était plus facile avec NestJS et le temps était court, donc on a pris ce chemin. Changer d'ORM ou de format d'API obligerait à toucher au cœur, mais sur ce projet, on n'en avait pas l'intention.

**Les DTO de l'application.** Le service de domaine des serveurs les importe :

```ts
// servers/domain/services/server.domain.service.ts
import { ServerCreationDto } from '../../application/dto/server.creation.dto';
```

La flèche part dans le mauvais sens. Ça ne casse rien au quotidien.

**Le module `ilos`.** Celui-là, c'est le mien, et le placer dans le domaine était un choix de ma part. Allumer et éteindre un serveur, pour moi, c'était du métier d'Upstra : il avait sa place là. Quand je l'ai écrit, tout me paraissait bon. En le relisant aujourd'hui, je vois ce que j'y ai mis :

```ts
// ilos/domain/services/ilo-power.service.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { PythonExecutorService } from '@/core/services/python-executor';
import { IloPowerAction } from '../../application/dto/ilo-power-action.dto';

// ...
if (httpCode === 401 || message.includes('Authentication failed')) {
  return new HttpException('Invalid iLO credentials', HttpStatus.UNAUTHORIZED);
}
```

Le métier avait sa place dans le domaine. Le lancement de scripts Python et les codes HTTP, non. Un domaine qui renvoie des `HttpException` ne peut être appelé que par HTTP : si un job planifié devait éteindre les serveurs pendant une coupure de courant, il recevrait ces erreurs-là. Cette partie aurait dû être un adapter, dans `infrastructure/`.

## La merge request que j'ai validée à tort

Chaque feature, fix ou chore avait sa merge request, et je les relisais avant de commencer une feature.

Il y en a une dont je me souviens. Le code était bon, on l'a mergée, elle est partie en production. Et en fait elle avait cassé le lien entre le frontend et la migration : le schéma SQL avait changé et je n'y avais pas fait attention. Dès que je l'ai remarqué, j'ai rattrapé la base avec un script de migration.

Si je passe à côté d'un changement de schéma, je ne vais pas repérer un `import` qui part dans le mauvais sens. Compter sur l'œil du relecteur pour faire respecter une règle d'architecture ne tient pas longtemps. Des outils comme `dependency-cruiser` peuvent vérifier le sens des imports en CI.

## Fallait-il tout corriger ?

Pas forcément. Séparer l'entité du domaine et l'entité de persistance, c'est une classe et un mapper de plus par agrégat, pour un projet de six mois à trois. Martin le dit lui-même dans son article sur la Clean Architecture : les cercles sont schématiques, il peut y en avoir plus ou moins.

`IloPowerService` n'a d'ailleurs pas d'interface : une classe, une seule implémentation. Ce n'était pas gênant, puisque NestJS permet de remplacer la classe par un mock dans les tests. L'interface n'aurait rien apporté.

J'ai fait l'erreur inverse sur un projet de financement participatif. Je voulais le faire en microservices, et il y en avait trop. C'est devenu n'importe quoi. Depuis, je me demande si une abstraction répond à un besoin qui existe déjà.

## Aujourd'hui

Sur ma mission, je passe toujours par des ADR, que les architectes doivent valider. J'analyse la situation avant de décider, et quand un sujet n'est pas clair, je pose une réunion pour l'éclaircir.
