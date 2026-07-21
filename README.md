# Goddo Example

[![JSR](https://jsr.io/badges/@goddo/core)](https://jsr.io/@goddo)

An example project to test the [Goddo](https://jsr.io/@goddo) framework packages published on JSR.

You can find the original framework repository here:
[carlosxfelipe/goddo](https://github.com/carlosxfelipe/goddo).

## Requirements

- [Deno](https://deno.land/) installed on your system.
- [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) for VS
  Code (recommended).

### VS Code Setup

If you use VS Code and have the **Prettier** extension installed, it may conflict with Deno's
formatter. To use Deno's formatter automatically on save, add the following to your
`.vscode/settings.json`:

```json
"[typescript]": {
  "editor.defaultFormatter": "denoland.vscode-deno"
},
"[typescriptreact]": {
  "editor.defaultFormatter": "denoland.vscode-deno"
}
```

## Running the project

To run the development server:

```bash
deno task dev
```

## Available Routes

### UI

- `GET /` - Redirects to `/page`
- `GET /page` - HTML interface for the Todo app

### API (JSON)

- `GET /todos` - List all todos
- `GET /todos/:id` - Get a specific todo by ID
- `POST /todos` - Create a new todo (expects `{"title": "..."}`)
- `PATCH /todos/:id` - Update a todo (expects `{"title": "...", "completed": true}`)
- `DELETE /todos/:id` - Delete a specific todo

### Documentation Plugins

- `GET /docs` - Scalar API Reference for the API (via `@goddo/openapi`)
- `GET /llms.txt` - LLM-friendly documentation (via `@goddo/llms-txt`)

## Benchmarks

This project includes benchmarks to test the performance of the Goddo framework using Deno's
built-in benchmarking tool.

To run the benchmarks, execute the following command:

```bash
deno task bench
```

### Results

**Environment:**

- CPU: Apple M1
- Runtime: Deno 2.9.3 (stable, release, aarch64-apple-darwin)

#### With SQLite (current)

| benchmark                          | time/iter (avg) | iter/s  | (min … max)           | p75     | p99     | p995     |
| ---------------------------------- | --------------- | ------- | --------------------- | ------- | ------- | -------- |
| GET / (Redirect)                   | 1.5 µs          | 659,600 | ( 1.0 µs … 2.3 ms)    | 1.2 µs  | 2.6 µs  | 4.3 µs   |
| GET /page (HTML rendering)         | 25.7 µs         | 38,850  | ( 21.1 µs … 580.4 µs) | 25.8 µs | 43.8 µs | 61.6 µs  |
| GET /todos/ (List todos)           | 5.7 µs          | 173,900 | ( 5.5 µs … 8.7 µs)    | 5.6 µs  | 8.7 µs  | 8.7 µs   |
| GET /todos/1 (Get a specific todo) | 4.6 µs          | 217,200 | ( 4.3 µs … 5.7 µs)    | 4.5 µs  | 5.7 µs  | 5.7 µs   |
| POST /todos/ (Create todo)         | 32.0 µs         | 31,220  | ( 21.9 µs … 9.4 ms)   | 25.4 µs | 34.3 µs | 40.5 µs  |
| PATCH /todos/1 (Update todo)       | 11.1 µs         | 89,690  | ( 10.1 µs … 1.0 ms)   | 11.0 µs | 13.7 µs | 17.1 µs  |
| DELETE /todos/2 (Delete todo)      | 50.3 µs         | 19,890  | ( 40.4 µs … 1.7 ms)   | 44.2 µs | 58.0 µs | 930.5 µs |

#### In-Memory Map (previous)

| benchmark                          | time/iter (avg) | iter/s  | (min … max)           | p75     | p99     | p995    |
| ---------------------------------- | --------------- | ------- | --------------------- | ------- | ------- | ------- |
| GET / (Redirect)                   | 1.5 µs          | 670,700 | ( 1.0 µs … 2.7 ms)    | 1.2 µs  | 2.3 µs  | 4.1 µs  |
| GET /page (HTML rendering)         | 15.4 µs         | 64,960  | ( 13.3 µs … 477.4 µs) | 14.8 µs | 27.1 µs | 34.5 µs |
| GET /todos/ (List todos)           | 1.8 µs          | 559,000 | ( 1.7 µs … 1.9 µs)    | 1.8 µs  | 1.9 µs  | 1.9 µs  |
| GET /todos/1 (Get a specific todo) | 1.9 µs          | 529,600 | ( 1.8 µs … 2.3 µs)    | 1.9 µs  | 2.3 µs  | 2.3 µs  |
| POST /todos/ (Create todo)         | 3.9 µs          | 256,500 | ( 3.8 µs … 4.6 µs)    | 3.9 µs  | 4.6 µs  | 4.6 µs  |
| PATCH /todos/1 (Update todo)       | 3.9 µs          | 258,700 | ( 3.8 µs … 4.2 µs)    | 3.9 µs  | 4.2 µs  | 4.2 µs  |
| DELETE /todos/2 (Delete todo)      | 2.9 µs          | 348,900 | ( 2.8 µs … 3.1 µs)    | 2.9 µs  | 3.1 µs  | 3.1 µs  |

#### Comparison (SQLite vs In-Memory)

| benchmark                          | In-Memory (avg) | SQLite (avg) | Δ (slower by) |
| ---------------------------------- | --------------- | ------------ | ------------- |
| GET / (Redirect)                   | 1.5 µs          | 1.5 µs       | ~0%           |
| GET /page (HTML rendering)         | 15.4 µs         | 25.7 µs      | +67%          |
| GET /todos/ (List todos)           | 1.8 µs          | 5.7 µs       | +217%         |
| GET /todos/1 (Get a specific todo) | 1.9 µs          | 4.6 µs       | +142%         |
| POST /todos/ (Create todo)         | 3.9 µs          | 32.0 µs      | +720%         |
| PATCH /todos/1 (Update todo)       | 3.9 µs          | 11.1 µs      | +185%         |
| DELETE /todos/2 (Delete todo)      | 2.9 µs          | 50.3 µs      | +1,634%       |
