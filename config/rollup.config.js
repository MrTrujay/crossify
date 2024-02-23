const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const cleaner = require("rollup-plugin-cleaner");
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/lib/index.js",
    format: "cjs",
  },
  plugins: [
    cleaner({
      targets: [path.resolve(__dirname, "../dist/lib")],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: "dist/lib/types",
        },
      },
    }),
    terser(),
  ],
};
