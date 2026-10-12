# Notes from the field

Contenu de la section « Notes de terrain » du site.

- `<slug>.fr.md` / `<slug>.en.md` : une note par langue, avec en-tête (voir `_template.md`).
- `published: false` : brouillon, ignoré au build. Passer à `true` pour publier.
- Fichiers préfixés par `_` : jamais publiés (template, backlog d'idées).
- `node scripts/build-notes.mjs` compile les notes publiées vers `src/app/features/notes/data/` (gitignoré).
  Lancé automatiquement par `pnpm start`, `pnpm build` et `pnpm test`.
- La section disparaît de la landing tant qu'aucune note n'est publiée.
- Une note publiée est servie sur `/fr/notes/<slug>` et `/en/notes/<slug>`, prérendue au build.
  Penser à l'ajouter dans `public/sitemap-fr.xml` et `public/sitemap-en.xml`.

Ce dossier n'est pas servi par le site, mais le repo GitHub est public : rien sous NDA ici.
