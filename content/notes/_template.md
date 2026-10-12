---
# Copier ce fichier en <slug>.fr.md et/ou <slug>.en.md (slug : minuscules, chiffres, tirets).
# Même slug pour les deux langues : si une traduction manque, l'autre version est affichée.
title: Titre de la note, concret et précis
summary: Une ou deux phrases. Affichée sur la landing, en meta description et en og:description.
date: 2026-11-15
tags: [java, spring-batch]
# false = brouillon : jamais compilé ni publié sur le site (mais visible sur le repo GitHub public).
published: false
---

<!--
Structure conseillée, 800 à 1 500 mots. À supprimer avant publication.

NDA :
- pas de nom de client, de banque, d'application interne, de personne ;
- pas d'endpoint, de schéma d'API ou de nom de claim internes ;
- pas de chiffre (taille d'équipe, planning) qui permettrait d'identifier le client ;
- écrire « une banque française », « une application de crédit à la consommation ».
-->

Accroche : la situation en deux ou trois phrases. Ce qui coinçait, pourquoi c'était intéressant.

## Le contexte

Les contraintes réelles : legacy, prod qui doit tourner, réglementation, équipe, délais.
Juste ce qu'il faut pour comprendre les choix qui suivent.

## Ce que j'ai fait

Le cœur de la note. Les options envisagées, celle retenue et pourquoi.
Un extrait de code anonymisé vaut mieux qu'un long paragraphe :

```kotlin
fun example(): Either<DomainError, Result> = TODO()
```

## Ce que ça a donné

Résultats mesurables si possible (temps d'exécution, incidents, délai de livraison).
Et ce qui n'a pas marché : c'est souvent la partie la plus utile.

## Ce que je referais autrement

Deux ou trois points concrets. Pas de conclusion générique.
