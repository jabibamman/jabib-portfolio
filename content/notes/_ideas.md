# Idées de notes

Backlog, jamais publié sur le site (fichier préfixé par `_`).
Attention : le repo GitHub est public, donc rien de couvert par le NDA ici non plus.

## Priorité 1 : à publier avant la recherche active

- [ ] **Talend → Spring Batch sans arrêter la prod** (brouillon : `talend-to-spring-batch`)
  - Secteur public, donc le moins sensible. Seul résultat chiffré : -70 % de temps d'exécution sur plus de 12 jobs.
  - Angle : découper la chaîne, isoler les règles métier, tests de non-régression sur les sorties, bascule progressive.
- [ ] **Gestion d'erreurs fonctionnelle avec `Either` (Arrow) dans une API Spring Boot**
  - Pourquoi pas d'exceptions pour les erreurs métier, mapping vers les réponses HTTP, coût en lisibilité pour l'équipe.
  - Très Kotlin, donc parfait pour les cibles Kotlin.
- [ ] **Tenir seul deux applis en production : ce que 20+ incidents par mois m'ont appris**
  - Traitement au cas par cas contre analyse de fond, documentation systématique, bus factor, communication pendant une panne.
  - Rester générique sur les applis et le client.

## Priorité 2

- [ ] **Passer de Java à Kotlin en cours de projet, sans mentor**
  - Ce qui se transpose, les pièges (null-safety face aux libs Java, data classes et JPA, coroutines ou pas), ce que je referais.
- [ ] **Lire une spec réglementaire contre la réalité du terrain**
  - Exemple : schéma prévu pour N co-emprunteurs alors que le métier en gère moins. Pourquoi challenger une spec plutôt que l'implémenter telle quelle.
  - Article court, ne pas nommer la directive si ça permet d'identifier le client ? À trancher.
- [ ] **Écrire des ADR quand on est le seul développeur**
  - À quoi ça sert sans relecteur, la trace pour le suivant, les arbitrages avec l'architecte. Template d'ADR anonymisé.
- [ ] **JWT RS256 avec claims métier dans Spring Security 6**
  - Plus technique, bon pour le SEO. Claims d'exemple génériques, pas ceux du client.
- [ ] **Ce que l'hexagonale change vraiment quand les règles bancaires bougent chaque trimestre** (brouillon : `hexagonal-banking-rules`)
  - Recoupe la note sur `Either` : fusionner ou garder pour plus tard.

## Reprises de l'ancienne série LinkedIn (brouillons corrigés, à compléter)

- [ ] `upstra-screaming-hexagonal` : jours 2 + 3 fusionnés. Screaming et hexagonale combinées, où la règle de dépendance cède dans Upstra, quand une abstraction se justifie.
- [ ] `anemic-domain-model` : jour 4. L'entité `Server` d'Upstra comme exemple réel de modèle anémique, puis sa version riche.
- [ ] `rust-workspace-frakt` : jour 7. Workspace Cargo, gestion d'erreurs, idées reçues corrigées (fuites mémoire, panics).
- [ ] `tdd-pragmatique` : jour 5. Le plus dépendant de ton vécu, beaucoup de TODO.
- Abandonnés : jours 1, 8, 9, 10 (Docker Compose générique), 11.

## Hors banque

- [ ] **BPN : CQRS et Saga en Kotlin et Kafka sur un projet perso**
  - Ici le code peut être montré en entier.
- [ ] **Upstra : piloter des onduleurs et des serveurs iLO depuis des microservices Python**
  - Sujet original, peu traité.

## Rythme

Une note toutes les 2 à 3 semaines. Les trois de priorité 1 en ligne pour mi-décembre 2026.
Chaque note doit aussi servir de réponse toute prête en entretien.
