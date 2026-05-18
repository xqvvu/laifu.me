const codeIconProse = {
  codeIcon: {
    rs: "catppuccin-rust",
    js: "catppuccin-javascript",
    ts: "catppuccin-typescript",
    go: "catppuccin-go",
    py: "catppuccin-python",

    jsx: "catppuccin-javascript-react",
    tsx: "catppuccin-typescript-react",
    vue: "catppuccin-vue",
    bun: "catppuccin-bun",
    git: "catppuccin-git",
    npm: "catppuccin-npm",
    css: "catppuccin-css",
    yml: "catppuccin-yaml",

    yarn: "catppuccin-yarn",
    pnpm: "catppuccin-pnpm",
    json: "catppuccin-json",
    deno: "catppuccin-deno",
    yaml: "catppuccin-yaml",
    toml: "catppuccin-toml",
    wasm: "catppuccin-web-assembly",
    html: "catppuccin-html",

    astro: "catppuccin-astro",

    svelte: "catppuccin-svelte",

    Makefile: "catppuccin-makefile",
    Justfile: "catppuccin-just",

    Dockerfile: "catppuccin-docker",

    editorconfig: "catppuccin-editorconfig",

    "go.mod": "catppuccin-go-mod",
    "deno.json": "catppuccin-deno",
    "cargo.toml": "catppuccin-cargo",
    "nginx.conf": "catppuccin-nginx",
    "biome.json": "catppuccin-biome",
    "nuxt.config.ts": "catppuccin-nuxt",
    "next.config.ts": "catppuccin-next",
    "vite.config.ts": "catppuccin-vite",
    "eslint.config.ts": "catppuccin-eslint",
    "vitetest.config.ts": "catppuccin-vitest",
    "playwright.config.ts": "catppuccin-playwright",
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
