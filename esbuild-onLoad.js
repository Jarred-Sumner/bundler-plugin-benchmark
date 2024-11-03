import { build } from "esbuild";
import { compile } from "@rspress/mdx-rs";
import { readFile } from "fs/promises";

const results = await build({
  entryPoints: ["./hello.jsx"],
  plugins: [
    {
      name: "mdx",
      setup(builder) {
        builder.onLoad({ filter: /\.mdx?$/, namespace: "file" }, async args => {
          const result = await compile({
            value: await readFile(args.path, "utf-8"),
            filepath: args.path,
            jsx: true,
            development: false,
            root: "",
          });
          return { contents: result.code, loader: "jsx" };
        });
      },
    },
  ],
  bundle: true,
  format: "esm",
  platform: "node",
  jsxDev: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  minify: true,
  outfile: "./dist/hello.js",
});

if (results.errors.length > 0) {
  throw results.errors;
}
