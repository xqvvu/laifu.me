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
    name: "plugin/better-tailwindcss",
    ...betterTailwindCSS.configs.recommended,
  },
  {
    name: "plugin/mdclint",
    ...(await mdcLint({
      files: ["README.md", "content/**/*.md"],
      preset: "mdc",
    })),
  },
);
