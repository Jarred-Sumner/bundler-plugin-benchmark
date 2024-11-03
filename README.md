# Bundler plugin benchmark

To install dependencies:

```bash
bun install
```

All benchmarks are using the same underlying library - [mdxjs-rs](https://github.com/wooorm/mdxjs-rs).

`bun-onBeforeParse.js` is using Bun's new `onBeforeParse` API.

`bun-onLoad.js`, `esbuild-onLoad.js` and `rolldown-plugin.js` are using the `@rspress/mdx-rs` package as plugins.

Each tool has minification enabled, treehskaing enabled, sourcemaps disabled, and `process.env.NODE_ENV` is set to `production`.

You will need a version of Bun from [this PR](https://github.com/oven-sh/bun/pull/14971) or later.

## Results on MacBook Pro M3

````js
❯ hyperfine  "bun bun-onBeforeParse.js # New" "bun bun-onLoad.js" "bun rolldown-plugin.js" "bun esbuild-onLoad.js" "node rolldown-plugin.js" "node esbuild-onLoad.js" --warmup=100
Benchmark 1: bun bun-onBeforeParse.js # New
  Time (mean ± σ):      13.2 ms ±   0.3 ms    [User: 11.8 ms, System: 6.5 ms]
  Range (min … max):    12.7 ms …  15.6 ms    178 runs

Benchmark 2: bun bun-onLoad.js
  Time (mean ± σ):      18.1 ms ±   0.4 ms    [User: 18.2 ms, System: 8.6 ms]
  Range (min … max):    17.3 ms …  20.5 ms    142 runs

Benchmark 3: bun rolldown-plugin.js
  Time (mean ± σ):      33.7 ms ±   0.5 ms    [User: 39.5 ms, System: 32.3 ms]
  Range (min … max):    33.0 ms …  35.7 ms    81 runs

Benchmark 4: bun esbuild-onLoad.js
  Time (mean ± σ):      36.1 ms ±   0.7 ms    [User: 28.1 ms, System: 7.4 ms]
  Range (min … max):    35.2 ms …  38.9 ms    72 runs

Benchmark 5: node rolldown-plugin.js
  Time (mean ± σ):      55.7 ms ±   1.1 ms    [User: 57.5 ms, System: 30.5 ms]
  Range (min … max):    54.4 ms …  60.2 ms    51 runs

  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet system without any interferences from other programs. It might help to use the '--warmup' or '--prepare' options.

Benchmark 6: node esbuild-onLoad.js
  Time (mean ± σ):      56.2 ms ±   0.5 ms    [User: 91.3 ms, System: 16.7 ms]
  Range (min … max):    54.7 ms …  57.1 ms    50 runs

Summary
  bun bun-onBeforeParse.js # New ran
    1.36 ± 0.04 times faster than bun bun-onLoad.js
    2.54 ± 0.07 times faster than bun rolldown-plugin.js
    2.73 ± 0.08 times faster than bun esbuild-onLoad.js
    4.20 ± 0.12 times faster than node rolldown-plugin.js
    4.24 ± 0.10 times faster than node esbuild-onLoad.js
```

To verify the code produced works, run `dist/hello.js` with Bun or Node.
````
