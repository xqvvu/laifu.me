## Context

The repo already has a working Playwright E2E suite backed by `@nuxt/test-utils/playwright`. The missing piece is an agent-friendly page debugging workflow that connects repeatable Playwright Test commands with live Playwright MCP inspection.

Nuxt 4 testing guidance keeps E2E tests on `@nuxt/test-utils` and supports hydration-aware navigation. Playwright Test documentation exposes debugging workflows through headed mode, UI mode, debug mode, reports, traces, screenshots, and codegen. Playwright MCP is useful for agent-driven inspection of running pages, but it should stay outside the application dependency graph.

## Goals / Non-Goals

**Goals:**

- Make the page debugging path obvious for agents working in this repo.
- Provide scripts for common Playwright debugging operations without changing production code.
- Document when to use Playwright Test versus Playwright MCP.
- Keep the workflow compatible with the existing Nuxt dev server on port `5173`.

**Non-Goals:**

- Add Playwright MCP as an npm dependency.
- Replace the E2E suite with MCP-only manual checks.
- Introduce broad visual snapshot testing.
- Change app runtime behavior.

## Decisions

1. Keep `@nuxt/test-utils/playwright` as the E2E integration.

   Rationale: It matches Nuxt 4 testing guidance and the current suite already relies on `goto(..., { waitUntil: "hydration" })`.

2. Add package scripts for debugging instead of requiring agents to remember raw commands.

   Rationale: Scripts are discoverable through `package.json`, align with the existing `test:e2e:*` shape, and reduce command drift.

3. Document Playwright MCP as an agent tool, not a project dependency.

   Rationale: MCP is provided by the Codex environment. Committing it as a runtime or test dependency would blur responsibilities and make local setup heavier.

4. Prefer accessibility snapshots and interactions before screenshots in MCP guidance.

   Rationale: Accessibility snapshots give stable element references for debugging and interaction. Screenshots are still useful for visual confirmation after targeted checks.

## Risks / Trade-offs

- Playwright debug scripts can be noisy or interactive in CI -> Keep them as local debugging scripts and leave CI-oriented E2E behavior unchanged.
- Agents may try to use MCP without a running app -> AGENTS guidance will explicitly start with checking or starting `pnpm dev` on port `5173`.
- Browser profile conflicts can happen with MCP -> Document using a fresh browser session or avoiding concurrent MCP sessions.
