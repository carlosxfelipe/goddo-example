# Goddo Example

[![JSR](https://jsr.io/badges/@goddo/core)](https://jsr.io/@goddo)

An example project to test the [Goddo](https://jsr.io/@goddo) framework packages published on JSR.

You can find the original framework repository here:
[carlosxfelipe/goddo](https://github.com/carlosxfelipe/goddo).

## Running the project

To run the development server:

```bash
deno task dev
```

## Troubleshooting

### "minimum dependency date" Error

If you encounter an error similar to this when running the project:

```text
error: Could not find version of '@goddo/html' that matches specified version constraint '*'

A newer matching version was found, but it was not used because it was newer than the specified minimum dependency date of...
```

This occurs because Deno enforces a time restriction ("minimum dependency date") to prevent the
immediate download of packages that were just published on JSR. This is a mechanism to ensure
security and stability.

Since the Goddo packages are newly released, Deno might block their immediate installation.

To bypass this restriction and force Deno to download the latest versions immediately, run the
following command before starting the server:

```bash
deno cache --minimum-dependency-age 0 src/index.ts
```

After doing this, Deno's global cache will be successfully updated, and you can start the project
normally using `deno task dev`.

## Benchmarks

This project includes benchmarks to test the performance of the Goddo framework using Deno's
built-in benchmarking tool.

To run the benchmarks, execute the following command:

```bash
deno bench benchmarks/
```

### Results

**Environment:**

- CPU: Apple M1
- Runtime: Deno 2.9.3 (stable, release, aarch64-apple-darwin)

| benchmark                            | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------------------ | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| GET / (Redirect)                     |          1.8 µs |       566,900 | (  1.2 µs …   2.6 ms) |   1.5 µs |   3.2 µs |   5.7 µs |
| GET /page (HTML rendering)           |         15.6 µs |        64,150 | ( 13.7 µs … 535.2 µs) |  15.1 µs |  22.9 µs |  29.8 µs |
| GET /todos/ (List todos)             |          1.9 µs |       519,200 | (  1.9 µs …   2.0 µs) |   2.0 µs |   2.0 µs |   2.0 µs |
| GET /todos/1 (Get a specific todo)   |          2.2 µs |       454,100 | (  2.1 µs …   2.6 µs) |   2.2 µs |   2.6 µs |   2.6 µs |
| POST /todos/ (Create todo)           |          4.5 µs |       224,300 | (  3.5 µs …   1.5 ms) |   4.3 µs |   6.1 µs |   8.2 µs |
| PATCH /todos/1 (Update todo)         |          4.4 µs |       225,300 | (  4.3 µs …   4.8 µs) |   4.4 µs |   4.8 µs |   4.8 µs |
| DELETE /todos/2 (Delete todo)        |          3.3 µs |       301,300 | (  3.2 µs …   3.7 µs) |   3.3 µs |   3.7 µs |   3.7 µs |
