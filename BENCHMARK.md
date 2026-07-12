## Benchmarks

This project includes benchmarks to test the performance of the Goddo framework using Deno's
built-in benchmarking tool.

To run the benchmarks, execute the following command:

```bash
deno bench benchmarks/
```

### Performance Results (JSR Package / Deno 2.9.2 / Apple M1)

| Benchmark                              | Time/iter (avg) | Iter/s  | (min … max)         | p75     | p99     | p995    |
| -------------------------------------- | --------------- | ------- | ------------------- | ------- | ------- | ------- |
| **GET /** (Redirect)                   | 1.9 µs          | 529,700 | ( 1.3 µs … 2.7 ms)  | 1.6 µs  | 3.5 µs  | 6.0 µs  |
| **GET /page** (HTML rendering)         | 21.6 µs         | 46,200  | ( 17.0 µs … 9.4 ms) | 19.4 µs | 57.3 µs | 88.4 µs |
| **GET /todos/** (List todos)           | 2.0 µs          | 499,000 | ( 1.9 µs … 2.3 µs)  | 2.0 µs  | 2.3 µs  | 2.3 µs  |
| **GET /todos/1** (Get a specific todo) | 2.3 µs          | 431,000 | ( 2.2 µs … 2.7 µs)  | 2.3 µs  | 2.7 µs  | 2.7 µs  |
| **POST /todos/** (Create todo)         | 3.9 µs          | 253,500 | ( 3.7 µs … 5.5 µs)  | 4.0 µs  | 5.5 µs  | 5.5 µs  |
| **PATCH /todos/1** (Update todo)       | 4.3 µs          | 232,600 | ( 4.1 µs … 5.4 µs)  | 4.3 µs  | 5.4 µs  | 5.4 µs  |
| **DELETE /todos/2** (Delete todo)      | 3.0 µs          | 327,900 | ( 2.9 µs … 3.7 µs)  | 3.1 µs  | 3.7 µs  | 3.7 µs  |

### ElysiaJS Performance Results (Bun 1.1.43 / Apple M1)

For comparison, here is the performance of the exact same API built with
[ElysiaJS](https://elysiajs.com/) running on [Bun](https://bun.sh/) (using mitata):

| Benchmark                              | Time/iter (avg) | (min … max)             | p99      |
| -------------------------------------- | --------------- | ----------------------- | -------- |
| **GET /** (Redirect)                   | 1.03 µs         | (750.00 ns … 448.58 µs) | 4.50 µs  |
| **GET /page** (HTML rendering)         | 10.38 µs        | (7.58 µs … 5.30 ms)     | 30.33 µs |
| **GET /todos/** (List todos)           | 1.83 µs         | (1.42 µs … 431.29 µs)   | 6.21 µs  |
| **GET /todos/1** (Get a specific todo) | 1.86 µs         | (1.38 µs … 452.08 µs)   | 6.58 µs  |
| **POST /todos/** (Create todo)         | 3.58 µs         | (2.58 µs … 1.56 ms)     | 14.42 µs |
| **PATCH /todos/1** (Update todo)       | 4.06 µs         | (3.08 µs … 596.29 µs)   | 15.17 µs |
| **DELETE /todos/2** (Delete todo)      | 2.18 µs         | (1.63 µs … 661.17 µs)   | 6.67 µs  |
