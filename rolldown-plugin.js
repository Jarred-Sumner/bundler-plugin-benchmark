import { compile } from "@rspress/mdx-rs";
import { readFile } from "fs/promises";
import { rolldown, defineConfig } from "rolldown";
import { replacePlugin } from "rolldown/experimental";
function mdxPlugin() {
  return {
    name: "mdx",
    async load(id) {
      if (!id.match(/\.mdx?$/)) {
        return null;
      }

      const source = await readFile(id, "utf-8");
      const result = await compile({
        value: source,
        filepath: id,
        jsx: true,
        development: false,
        root: "",
      });

      return {
        // note: it throws an error if the code is a buffer
        code: result.code,
        map: null,
      };
    },
  };
}

const result = await rolldown(
  defineConfig({
    input: "./hello.jsx",
    treeshake: true,

    plugins: [
      replacePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      mdxPlugin(),
    ],
    minify: true,
    moduleTypes: {
      ".jsx": "jsx",
      ".mdx": "jsx",
    },
    output: {
      minify: true,
      sourcemap: false,
      treeshale: true,
      format: "esm",
      dir: "./dist",
    },
  }),
);

await result.write({});
