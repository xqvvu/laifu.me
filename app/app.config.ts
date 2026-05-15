const codeIconProse = {
  codeIcon: {
    rs: "catppuccin-rust",
    js: "catppuccin-javascript",
    ts: "catppuccin-typescript",

    jsx: "catppuccin-javascript-react",
    tsx: "catppuccin-typescript-react",
    vue: "catppuccin-vue",
    bun: "catppuccin-bun",
    git: "catppuccin-git",
    npm: "catppuccin-npm",
    css: "catppuccin-css",

    yarn: "catppuccin-yarn",
    pnpm: "catppuccin-pnpm",
    json: "catppuccin-json",

    Dockerfile: "catppuccin-docker",

    "nginx.conf": "catppuccin-nginx",
    "nuxt.config.ts": "catppuccin-nuxt",
    "next.config.ts": "catppuccin-next",
    "eslint.config.ts": "catppuccin-eslint",
  },
};

export default defineAppConfig({
  ui: {
    colors: {
      primary: "zinc",
      neutral: "zinc",
    },
    prose: {
      ...codeIconProse,
    },
  },
});
