import { build } from "bun";
import { compile } from "@rspress/mdx-rs";

const results = await build({
  entrypoints: ["./hello.jsx"],
  plugins: [
    {
      name: "mdx",
      setup(builder) {
        builder.onLoad(
          { filter: /\.mdx?$/, namespace: "file" },
          async (args) => {
            const result = await compile({
              value: await Bun.file(args.path).text(),
              filepath: args.path,
              jsx: true,
              development: false,
              root: "",
            });
            return { contents: result.code, loader: "jsx" };
          }
        );
      },
    },
  ],
  minify: true,
  outdir: "./dist",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (results.logs.length > 0) {
  console.log(results.logs);
}
