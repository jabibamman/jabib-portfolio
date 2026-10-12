---
title: Où le TDD m'aide, et où je ne l'utilise pas
summary: Le TDD est un outil de conception, pas une méthode de validation. Retour de pratique sur ce qu'il apporte, ce qu'il coûte, et les cas où je m'en passe.
date: 2026-12-15
tags: [tdd, testing, java]
published: false
---

J'ai appris le TDD à l'école et je l'ai pratiqué pendant mon alternance à l'INSEE. Pendant longtemps, je l'ai vu comme une façon d'avoir beaucoup de tests. C'est en comprenant que ce n'était pas son but que j'ai commencé à en tirer quelque chose.

<!-- TODO : contexte INSEE en deux phrases, sans détail sensible. Le TDD était-il une pratique d'équipe ou personnelle ? Sur quel type de code (règles de calcul des batchs ?) -->

## Le cycle, et l'étape qu'on saute

Le cycle tient en trois temps :

1. **Red** : écrire un test qui échoue, pour un comportement qui n'existe pas encore ;
2. **Green** : écrire le code le plus simple qui le fait passer ;
3. **Refactor** : nettoyer le code et les tests, sans changer le comportement.

L'étape qu'on saute, c'est la troisième. Red, green, test suivant. Au bout d'une semaine, on a une couverture excellente et un code qu'on n'a jamais restructuré, parce qu'on a toujours pris la solution la plus simple pour passer au vert. Le refactor n'est pas optionnel : c'est lui qui transforme une suite de solutions locales en conception.

## Ce que le TDD apporte vraiment

Écrire le test d'abord oblige à se poser les questions de conception **avant** d'écrire l'implémentation :

- comment s'appelle cette opération, et qu'est-ce qu'elle prend en entrée ?
- de quoi a-t-elle besoin pour fonctionner ? Si le test demande cinq mocks, la classe en fait trop ;
- que se passe-t-il quand l'entrée est invalide ?

Un code difficile à tester est presque toujours un code mal découpé. Le TDD rend ce problème visible tout de suite, au lieu de le découvrir au moment d'écrire les tests après coup.

<!-- TODO : un exemple concret où écrire le test d'abord t'a fait changer la conception. Même petit, c'est ce qui rend la note crédible. -->

## Ce que le TDD ne fait pas

- **Il ne remplace pas les tests d'intégration.** Des tests unitaires verts ne disent rien du mapping SQL, de la configuration Spring ou du contrat avec une API externe.
- **Il ne garantit pas la qualité.** On peut écrire en TDD des tests qui vérifient l'implémentation plutôt que le comportement, et qui cassent au moindre refactor.
- **Il ne trouve pas les cas auxquels on n'a pas pensé.** Il teste ce qu'on a imaginé. Pour le reste, il y a les tests basés sur les propriétés, la recette et la production.

## Où je l'utilise

- **La logique métier avec des règles** : calculs, validations, transitions d'état. Le test décrit la règle, le code la suit.
- **La correction de bugs** : d'abord un test qui reproduit le bug, ensuite la correction. Le bug ne revient pas.
- **Le code que je ne sais pas encore structurer** : écrire les cas un par un m'aide à trouver la forme.

## Où je ne l'utilise pas

- **Le code de câblage** : configuration, mapping d'un DTO vers un autre, controllers sans logique. Un test d'intégration couvre mieux ça.
- **L'exploration** : quand je découvre une API externe ou que je fais un prototype jetable, je n'ai pas encore de comportement à spécifier.
- **Le code legacy sans tests.** Là, je commence par des tests de caractérisation : figer le comportement actuel, même s'il est faux, avant de toucher quoi que ce soit. C'est une autre discipline.

<!-- TODO : vérifier que cette liste correspond à ta pratique réelle, et retirer ce qui n'est pas vrai pour toi. -->

## Le coût

Au début, le TDD ralentit. C'est normal : on apprend en même temps à concevoir de petites unités et à écrire de bons tests. Ce qui m'a aidé :

- des katas courts (FizzBuzz, bowling, Roman numerals) pour pratiquer le cycle sans pression de délai ;
- commencer par le cas nominal le plus simple, pas par les cas limites ;
- accepter qu'un test soit naïf au début, puisque le refactor est là pour ça.

## Ce que je retiens

La question utile n'est pas « est-ce que je fais du TDD ? ». C'est « est-ce que mes tests m'aident à concevoir et à modifier le code sans peur ? ». Le TDD est une façon d'y arriver. Pour certains types de code, c'est la meilleure que je connaisse. Pour d'autres, non.
