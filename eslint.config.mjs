import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "lib/generated/**/*",
      "node_modules/**/*",
      ".next/**/*",
      "out/**/*",
      "dist/**/*",
      "build/**/*",
      "*.min.js",
      "*.bundle.js",
      "*.wasm",
      "*.wasm.js",
      "*.edge.js",
      "*.edge.js.map",
      "*.wasm.js.map",
      "*.wasm.map"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-this-alias": "warn",
      "@typescript-eslint/no-require-imports": "error"
    }
  }
];

export default eslintConfig;
