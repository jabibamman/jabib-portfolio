---
title: Ce qu'un calcul de fractales distribué m'a appris sur Rust
summary: Six crates dans un workspace Cargo, un serveur qui distribue des fragments à des workers, et quelques idées reçues que j'avais sur Rust en commençant.
date: 2026-12-01
tags: [rust, cargo, architecture]
published: false
---

En première année de mastère à l'ESGI, on a eu un projet en Rust : calculer des fractales de façon distribuée. Un serveur découpe l'image en fragments, des workers se connectent, calculent leur morceau et renvoient le résultat. Je n'avais jamais écrit de Rust.

<!-- TODO : projet seul ou en équipe ? Combien de personnes, combien de temps ? -->

Le code est [public sur GitHub](https://github.com/jabibamman/frakt).

## Un workspace plutôt qu'un projet

La première bonne décision a été de découper le projet en **workspace Cargo** : plusieurs crates dans un même dépôt, avec un seul `Cargo.lock` et un seul dossier de build.

```toml
[workspace]
resolver = "2"
members = ["client", "shared", "server", "complex", "cli", "gui"]
```

Chaque crate a un rôle clair :

```
frakt/
├── complex/   # nombres complexes et fractales : Mandelbrot, Julia, Burning Ship, Newton-Raphson…
├── shared/    # types des messages, erreurs, logger, utilitaires communs
├── server/    # découpe l'image et distribue les fragments
├── client/    # worker : reçoit un fragment, le calcule, renvoie les pixels
├── cli/       # parsing des arguments, partagé par le client et le serveur
└── gui/       # visualisation
```

Ce découpage force une discipline utile : `complex` ne sait rien du réseau, `shared` ne sait rien du calcul. Si le client a besoin de quelque chose du serveur, c'est que ça doit descendre dans `shared`. Le compilateur refuse les dépendances circulaires entre crates, donc l'architecture ne peut pas pourrir en silence.

Les commandes restent simples :

```bash
cargo build              # tout le workspace
cargo test               # tous les tests
cargo run -p server
cargo run -p client
```

## Ce que je referais autrement dans le workspace

Chaque crate déclare ses propres versions de dépendances. Le `Cargo.lock` unique évite d'avoir deux versions compatibles de `serde` en parallèle, mais les déclarations sont dupliquées et peuvent dériver. Depuis Rust 1.64, on peut les centraliser :

```toml
# Cargo.toml racine
[workspace.dependencies]
serde = { version = "1.0", features = ["derive"] }

# shared/Cargo.toml
[dependencies]
serde = { workspace = true }
```

Je ne connaissais pas la fonctionnalité à l'époque. C'est la première chose que je changerais.

## La gestion d'erreurs

Le point qui m'a le plus marqué, c'est que Rust rend les erreurs **visibles dans les signatures**. Le `main` du client renvoie un `Result` et propage les erreurs avec `?` :

```rust
fn main() -> Result<(), FractalError> {
    let cli_args = CliClientArgs::parse();
    shared::logger::init_logger(cli_args.verbose, cli_args.debug, cli_args.trace)?;

    let serialized_request =
        FragmentRequest::new(cli_args.worker_name.clone(), 1000).serialize()?;

    let mut stream = connect_to_server(&cli_args)?;
    send_request(&mut stream, &serialized_request)?;
    // ...
}
```

Impossible d'oublier qu'une fonction peut échouer : le type le dit, et ignorer un `Result` déclenche un avertissement. C'est ce qui m'a fait aimer, des années plus tard, `Either` d'Arrow en Kotlin : même idée, l'erreur fait partie du contrat.

Une nuance quand même, parce que je l'ai longtemps mal formulée : Rust ne garantit pas qu'il n'y aura « aucune erreur en prod ». Un `unwrap()` sur une valeur absente ou un indice hors limites provoque un `panic`. Rust garantit que les erreurs **attendues** sont explicites, pas que le programme ne peut pas planter.

## Les idées reçues que j'avais

**« Rust empêche les fuites mémoire. »** Faux. Rust garantit la **sûreté mémoire** : pas de use-after-free, pas de data race en code safe. Mais une fuite est considérée comme sûre : un cycle de `Rc`, `std::mem::forget` ou `Box::leak` fuient sans une ligne de code `unsafe`. Le Rust Book y consacre une section.

**« Le borrow checker est un obstacle. »** Au début, si. Ensuite, il devient un relecteur qui signale les problèmes de partage de données avant qu'ils existent. Les fragments circulent entre le réseau et le calcul : savoir qui possède quoi à chaque étape n'est pas une contrainte du langage, c'est une vraie question de conception.

<!-- TODO : une erreur du borrow checker concrète sur laquelle tu as bloqué, et ce qu'elle t'a appris. C'est le paragraphe le plus intéressant à écrire. -->

**« Les messages d'erreur sont incompréhensibles. »** Ceux du compilateur Rust sont parmi les meilleurs que je connaisse : ils pointent la ligne, expliquent le problème et proposent souvent la correction. Ce qui est dur au début, ce sont les concepts derrière (ownership, lifetimes), pas les messages.

## Ce qui a coûté cher

- **La courbe d'apprentissage.** <!-- TODO : estimation honnête du temps passé avant d'être à l'aise. -->
- **Le temps de compilation**, surtout en build complet. `cargo check` pendant le développement aide beaucoup.
- **Le protocole réseau** : sérialiser les messages en JSON avec `serde`, gérer la taille des messages et les déconnexions des workers. C'est là que la plupart des bugs se trouvaient, pas dans le calcul.

## Ce que j'en garde

Je n'écris pas de Rust au travail : je fais du Java et du Kotlin. Mais ce projet a changé ma façon d'écrire du code ailleurs : rendre les erreurs explicites dans les types, réfléchir à qui possède une donnée et qui la modifie, et découper un projet en modules dont les dépendances sont vérifiées par l'outillage plutôt que par la bonne volonté.
