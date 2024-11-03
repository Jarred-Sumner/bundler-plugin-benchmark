import { build } from "bun";
import mdx from "../bun/packages/bun-build-mdx-rs";
import addon from "../bun/packages/bun-build-mdx-rs/target/release/libmdx_bun.dylib" with { type: "file" };

const results = await build({
  entrypoints: ["./hello.jsx"],
  plugins: [mdx({ addon })],
  minify: true,
  outdir: "./dist",
  target: "bun",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (results.logs.length > 0) {
  console.log(results.logs);
}
