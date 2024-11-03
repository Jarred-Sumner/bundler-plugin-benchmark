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

```js
❯ hyperfine  "bun bun-onBeforeParse.js # New" "bun bun-onLoad.js" "bun rolldown-plugin.js" "bun esbuild-onLoad.js" "node rolldown-plugin.js" "node esbuild-onLoad.js" --warmup=20
Benchmark 1: bun bun-onBeforeParse.js # New
  Time (mean ± σ):      12.1 ms ±   0.6 ms    [User: 9.4 ms, System: 4.8 ms]
  Range (min … max):    11.1 ms …  15.5 ms    201 runs

Benchmark 2: bun bun-onLoad.js
  Time (mean ± σ):      16.6 ms ±   0.6 ms    [User: 14.6 ms, System: 5.4 ms]
  Range (min … max):    15.8 ms …  18.8 ms    137 runs

Benchmark 3: bun rolldown-plugin.js
  Time (mean ± σ):      31.7 ms ±   0.7 ms    [User: 33.5 ms, System: 27.2 ms]
  Range (min … max):    30.3 ms …  34.5 ms    84 runs

Benchmark 4: bun esbuild-onLoad.js
  Time (mean ± σ):      34.9 ms ±   1.1 ms    [User: 24.3 ms, System: 5.5 ms]
  Range (min … max):    33.5 ms …  39.6 ms    79 runs

Benchmark 5: node rolldown-plugin.js
  Time (mean ± σ):      54.0 ms ±   1.2 ms    [User: 52.2 ms, System: 27.8 ms]
  Range (min … max):    52.5 ms …  58.2 ms    52 runs

Benchmark 6: node esbuild-onLoad.js
  Time (mean ± σ):      55.5 ms ±   0.9 ms    [User: 83.1 ms, System: 14.4 ms]
  Range (min … max):    54.1 ms …  58.3 ms    50 runs

Summary
  bun bun-onBeforeParse.js # New ran
    1.37 ± 0.08 times faster than bun bun-onLoad.js
    2.62 ± 0.14 times faster than bun rolldown-plugin.js
    2.90 ± 0.16 times faster than bun esbuild-onLoad.js
    4.47 ± 0.23 times faster than node rolldown-plugin.js
    4.60 ± 0.23 times faster than node esbuild-onLoad.js
```

To verify the code produced works, run `dist/hello.js` with Bun or Node.
