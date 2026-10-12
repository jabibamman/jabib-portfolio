---
title: Un calcul de fractales distribué en Rust, de l'architecture à un bug de protocole
summary: Un workspace Cargo conseillé par notre prof d'architecture, des panics remplacés par des Result, et un serveur qui lisait mal les messages de ses workers.
date: 2026-10-12
tags: [rust, cargo, architecture]
published: true
---

En quatrième année à l'ESGI (ma première année de mastère), on a eu un projet en Rust pour le cours d'architecture des logiciels : explorer des fractales avec un réseau de machines. Un serveur découpe l'image en fragments, des workers s'y connectent, calculent leur morceau et renvoient le résultat. Je débutais en Rust.

Nous étions quatre, et les commits s'étalent d'octobre 2023 à mars 2024. Mon rôle était l'architecture : la structure du projet, les bonnes pratiques et le refactoring. Le reste de l'équipe implémentait les fractales. Je ne touchais pas au calcul, seulement à la partie technique, et il n'y a eu aucun désaccord : tout le monde était d'accord, et tout s'est passé proprement.

Le code est [public sur GitHub](https://github.com/jabibamman/frakt), avec sa [documentation](https://jabibamman.github.io/frakt/client).

## Passer d'un dossier à un workspace

Le sujet demandait des crates séparés : le travailleur, le serveur, les éléments communs, et les opérations sur les nombres complexes. Avec une règle : pas de duplication de code entre le travailleur et le serveur. On avait commencé avec un simple dossier. Le 29 octobre 2023, un commit s'intitule « workspace & crate instead of basic folder ». C'est notre tuteur, Pascal Havé, architecte et professeur à l'ESGI, qui nous avait conseillé de le faire pour mieux découper le code.

On a fini avec six crates, plus que les quatre demandés :

```
frakt/
├── complex/   # nombres complexes et fractales : Mandelbrot, Julia, Burning Ship, Newton-Raphson…
├── shared/    # types des messages, erreurs, logger, utilitaires communs
├── server/    # découpe l'image et distribue les fragments
├── client/    # worker : reçoit un fragment, le calcule, renvoie les pixels
├── cli/       # arguments en ligne de commande
└── gui/       # visualisation
```

Ça a bien servi pour travailler à quatre. Chacun ajoutait sa fractale dans `complex` sans toucher au réseau, et `complex` ne sait rien du réseau. Si le client a besoin de quelque chose du serveur, ça descend dans `shared`.

Une chose que je referais autrement : chaque crate déclare ses propres dépendances. Dans notre repo, `image` est en 0.24.7 dans `client` et `shared`, mais en 0.24.9 dans `gui`. Depuis Rust 1.64, on peut les centraliser dans le `Cargo.toml` racine :

```toml
[workspace.dependencies]
image = "0.24.9"

# client/Cargo.toml
[dependencies]
image = { workspace = true }
```

## Des Result à la place des panics

Le 15 novembre 2023, deux commits le même jour : « return result instead of panicking » sur le code d'image, et « refactored without using mut » sur Julia. Le sujet listait ça en bonus : réduire au maximum les `unwrap()`, les `expect()`, les `panic!()` et les `mut`. Nous, on voulait surtout suivre une bonne pratique de gestion des erreurs, pour que tout soit propre.

Résultat, le `main` du client renvoie un `Result` et propage les erreurs avec `?` :

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

Une fonction qui peut échouer le dit dans sa signature, et ignorer un `Result` déclenche un avertissement. Ça ne veut pas dire que le programme ne peut plus planter : un `unwrap()` reste possible.

## Le serveur qui ne lisait pas les tailles

Le protocole du sujet fixe le format des messages sur le flux TCP : deux entiers de 4 octets en big-endian, la taille totale puis la taille du JSON, suivis du JSON et des données binaires.

Côté serveur, le 26 décembre, je corrige la lecture. Avant, le serveur lisait tout le flux d'un coup avec `read_to_end`, puis cherchait le premier `{` pour retrouver le JSON :

```rust
let mut reader = BufReader::new(&stream);
let mut buffer = Vec::new();
reader.read_to_end(&mut buffer)?;
// ...
let json_start = data_str.find('{').unwrap_or(0);
```

Ça ne lit jamais les tailles : la recherche du `{` ne servait qu'à sauter les huit octets d'en-tête. Et `read_to_end` attend que l'autre côté ferme la connexion, ce qui ne colle pas à un flux où un worker envoie un message puis attend la réponse. Après le commit, le serveur lit les deux tailles puis exactement le nombre d'octets annoncé :

```rust
let mut total_size_buffer = [0; 4];
stream.read_exact(&mut total_size_buffer)?;
let total_size = u32::from_be_bytes(total_size_buffer) as usize;

let mut json_size_buffer = [0; 4];
stream.read_exact(&mut json_size_buffer)?;
let json_size = u32::from_be_bytes(json_size_buffer) as usize;

let mut buffer = vec![0; total_size];
stream.read_exact(&mut buffer)?;
```

TCP est un flux d'octets : il n'a pas de frontières de messages. C'est le protocole qui doit les poser, et c'est exactement ce que font ces deux tailles.

## Apprendre Rust

Il m'a fallu plusieurs mois avant d'être à l'aise. Ce qui m'a le plus aidé, c'est [Rustlings](https://github.com/rust-lang/rustlings) : de petits exercices à corriger dans le terminal, qui font pratiquer l'ownership, les emprunts et les `Result` un concept à la fois. Je le recommande à quiconque débute.

Une chose qu'on lit souvent : « Rust empêche les fuites mémoire ». C'est faux. Rust garantit la sûreté mémoire (pas de use-after-free, pas de data race en code safe), mais une fuite reste possible sans une ligne de `unsafe` : un cycle de `Rc`, `std::mem::forget` ou `Box::leak` suffisent. Le Rust Book y consacre une section.

Je n'écris pas de Rust au travail : je fais du Java et du Kotlin.
