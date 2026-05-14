import betterTailwindCSS from "eslint-plugin-better-tailwindcss";
import { mdcLint } from "mdclint";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    name: "laifu.me/custom",
    rules: {
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "off",
    },
  },
  {
    name: "plugin/tailwindcss",
    ...betterTailwindCSS.configs.recommended,
    settings: {
      "better-tailwindcss": {
        detectComponentClasses: true,
        entryPoint: "app/assets/css/main.css",
      },
    },
    rules: {
      ...betterTailwindCSS.configs.recommended.rules,
      "better-tailwindcss/enforce-consistent-class-order": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unknown-classes": "error",
    },
  },
  {
    name: "plugin/mdclint",
    ...(await mdcLint({
      files: ["README.md", "content/**/*.md"],
      preset: "mdc",
    })),
  },
);
