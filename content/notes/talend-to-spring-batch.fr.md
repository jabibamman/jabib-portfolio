---
title: Découper une chaîne batch Talend pour la réécrire en Spring Batch sans arrêter la production
summary: Isoler les fonctions métier d'un job legacy, les couvrir de tests, puis basculer sans fenêtre d'indisponibilité.
date: 2026-11-15
tags: [java, spring-batch, talend, legacy]
published: false
---

<!-- Plan : contexte (service public, jobs Talend critiques) → découpage → tests de non-régression sur les sorties → bascule progressive → résultat (-70 % sur 12+ jobs) → ce que je referais. -->
