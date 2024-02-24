const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const cleaner = require("rollup-plugin-cleaner");
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/umd/index.js",
    format: "umd",
    name: "crossify",
  },
  plugins: [
    cleaner({
      targets: [path.resolve(__dirname, "../dist/umd")],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: "dist/umd/types",
        },
      },
    }),
    terser(),
  ],
};
