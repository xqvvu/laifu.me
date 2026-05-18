## Context

Playwright MCP documentation emphasizes structured snapshots, element refs, capabilities, and tool categories for navigation, interaction, console, network, screenshots, tracing, and test assertions. In this repo, the highest-value use case is local page debugging for a Nuxt blog running on port `5173`.

The skill should be local because it can reference repo-specific scripts and conventions while still staying useful across pages in this project.

## Goals / Non-Goals

**Goals:**

- Give agents a repeatable page debugging loop.
- Make the snapshot/ref interaction model explicit.
- Include just enough Playwright MCP reference material to avoid rediscovery.
- Keep `AGENTS.md` short by delegating detail to the skill.

**Non-Goals:**

- Install or configure Playwright MCP in npm.
- Replace committed Playwright E2E tests.
- Document every Playwright MCP tool exhaustively.
- Add app features or change runtime behavior.

## Decisions

1. Create `.codex/skills/playwright-mcp-debug`.

   Rationale: Repo-local placement lets this skill reference `pnpm dev`, `localhost:5173`, and existing Playwright scripts.

2. Keep `SKILL.md` procedural and move details to `references/playwright-mcp-notes.md`.

   Rationale: The skill should load quickly and only pull the deeper reference when the task needs MCP tool details or troubleshooting.

3. Structure the workflow around snapshots before screenshots.

   Rationale: Playwright MCP snapshots expose the page accessibility tree and element refs that support deterministic interaction, while screenshots are best used as visual confirmation.

4. Require a short evidence trail in final responses.

   Rationale: Page debugging work is hard to trust without noting which page was inspected, which interactions were performed, and what console/network/test evidence was observed.

## Risks / Trade-offs

- Agents may overuse screenshots -> The skill explicitly starts from snapshots and interactions.
- MCP sessions may collide with active browsers -> The reference includes the fresh/isolated session fallback.
- Skill guidance can become stale as MCP evolves -> `AGENTS.md` still instructs agents to consult current Playwright docs for setup or authoring changes.
