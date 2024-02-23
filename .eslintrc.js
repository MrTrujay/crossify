module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "error",
  },
  ignorePatterns: ["node_modules/", "dist/", "**/*.d.ts", ".eslintrc.js", "commitlint.config.js", "config/"],
};
