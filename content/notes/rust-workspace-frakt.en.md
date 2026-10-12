---
title: A distributed fractal renderer in Rust, from architecture to a protocol bug
summary: A Cargo workspace suggested by our architecture tutor, panics replaced by Results, and a server that read its workers' messages the wrong way.
date: 2026-10-12
tags: [rust, cargo, architecture]
published: true
---

In my fourth year at ESGI (the first year of my master's), we had a Rust project for the software architecture course: exploring fractals with a network of machines. A server splits the image into fragments, workers connect to it, compute their piece and send the result back. I was a beginner in Rust.

There were four of us, and the commits run from October 2023 to March 2024. My role was the architecture: the project's structure, good practices and refactoring. The rest of the team implemented the fractals. I didn't touch the computation, only the technical side, and there were no disagreements: everyone was on board, and it all went smoothly.

The code is [public on GitHub](https://github.com/jabibamman/frakt), with its [documentation](https://jabibamman.github.io/frakt/client).

## From a folder to a workspace

The assignment asked for separate crates: the worker, the server, the shared parts, and the complex-number operations. With one rule: no code duplication between the worker and the server. We had started with a plain folder. On October 29, 2023, a commit is titled "workspace & crate instead of basic folder". Our tutor, Pascal Havé, an architect and ESGI professor, had advised us to do it to split the code better.

We ended up with six crates, more than the four required:

```
frakt/
├── complex/   # complex numbers and fractals: Mandelbrot, Julia, Burning Ship, Newton-Raphson…
├── shared/    # message types, errors, logger, common utilities
├── server/    # splits the image and hands out the fragments
├── client/    # worker: receives a fragment, computes it, sends the pixels back
├── cli/       # command-line arguments
└── gui/       # visualization
```

It worked well for a team of four. Everyone added their fractal to `complex` without touching the network code, and `complex` knows nothing about the network. If the client needs something from the server, it moves down into `shared`.

One thing I'd do differently: each crate declares its own dependencies. In our repo, `image` is at 0.24.7 in `client` and `shared`, but at 0.24.9 in `gui`. Since Rust 1.64, you can centralize them in the root `Cargo.toml`:

```toml
[workspace.dependencies]
image = "0.24.9"

# client/Cargo.toml
[dependencies]
image = { workspace = true }
```

## Results instead of panics

On November 15, 2023, two commits the same day: "return result instead of panicking" on the image code, and "refactored without using mut" on Julia. The assignment listed this as a bonus: cut down as much as possible on `unwrap()`, `expect()`, `panic!()` and `mut`. For our part, we mostly wanted to follow good error-handling practice so that everything stayed clean.

As a result, the client's `main` returns a `Result` and propagates errors with `?`:

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

A function that can fail says so in its signature, and ignoring a `Result` triggers a warning. That doesn't mean the program can no longer crash: an `unwrap()` is still possible.

## The server that never read the sizes

The assignment fixes the format of messages on the TCP stream: two 4-byte big-endian integers, the total size and then the JSON size, followed by the JSON and the binary data.

On the server side, on December 26, I fixed the reading. Before, the server read the whole stream at once with `read_to_end`, then looked for the first `{` to find the JSON:

```rust
let mut reader = BufReader::new(&stream);
let mut buffer = Vec::new();
reader.read_to_end(&mut buffer)?;
// ...
let json_start = data_str.find('{').unwrap_or(0);
```

It never reads the sizes: looking for the `{` only served to skip the eight header bytes. And `read_to_end` waits for the other side to close the connection, which doesn't fit a stream where a worker sends a message and then waits for the reply. After the commit, the server reads the two sizes and then exactly the announced number of bytes:

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

TCP is a stream of bytes: it has no message boundaries. The protocol has to set them, and that's exactly what these two sizes do.

## Learning Rust

It took me several months to feel comfortable. What helped me most was [Rustlings](https://github.com/rust-lang/rustlings): small exercises to fix in the terminal, which practice ownership, borrowing and `Result` one concept at a time. I recommend it to anyone starting out.

Something you often read: "Rust prevents memory leaks". It's false. Rust guarantees memory safety (no use-after-free, no data races in safe code), but a leak is still possible without a single line of `unsafe`: a cycle of `Rc`, `std::mem::forget` or `Box::leak` is enough. The Rust Book has a section on it.

I don't write Rust at work: I do Java and Kotlin.
