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

The benchmark results and analysis are documented in [BENCHMARK.md](./BENCHMARK.md).

To run the benchmarks, execute the following command:

```bash
deno bench benchmarks/
```
