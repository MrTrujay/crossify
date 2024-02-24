module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: ["node_modules/", "dist/", "**/*.d.ts", ".eslintrc.js", "commitlint.config.js", "config/"],
};
