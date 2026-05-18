---
name: playwright-mcp-debug
description: Use when Codex needs to inspect, debug, verify, or troubleshoot local web pages with Playwright MCP, especially Nuxt pages in this repo. Trigger for layout, rendering, hydration, navigation, form interaction, console error, network request, accessibility snapshot, screenshot, trace, or browser-state debugging tasks where an agent should operate a real page rather than only read code.
---

# Playwright MCP Debug

Use Playwright MCP as the live page inspection layer. Use Playwright Test for repeatable tests and regression coverage. Keep MCP out of npm dependencies unless the user explicitly asks to change MCP setup.

## Workflow

1. Ground the target.
   - Identify the route, viewport, user action, and expected behavior.
   - In this repo, verify `pnpm dev` is serving `http://localhost:5173` before opening local pages.
   - If the task is Nuxt-specific, follow repo instructions and check `nuxt-remote` before changing implementation.

2. Start with a snapshot.
   - Use `browser_snapshot` before clicking or typing.
   - Use snapshot refs for `browser_click`, `browser_type`, form fills, selection, and navigation.
   - Prefer role/name/text evidence from snapshots over coordinates.

3. Reproduce the issue on the real page.
   - Navigate to the concrete URL.
   - Perform the smallest user interaction sequence that demonstrates the issue.
   - Resize or emulate mobile only when the bug depends on viewport.

4. Inspect evidence.
   - Use console messages for hydration, runtime, and warning checks.
   - Use network requests for data loading, route, feed, API, asset, and status issues.
   - Use screenshots after targeted checks to confirm visual layout.
   - Use traces when the sequence is multi-step or hard to explain from a static snapshot.

5. Close the loop with project commands.
   - Run or update Playwright Test only when the behavior should be regression-covered.
   - Use `pnpm test:e2e`, `pnpm test:e2e:headed`, `pnpm test:e2e:ui`, or `pnpm test:e2e:debug` as appropriate.
   - Report what page was inspected, what actions were performed, what evidence was checked, and what remains unverified.

## Debug Patterns

- Layout issue: snapshot -> viewport resize -> screenshot -> overflow/layout assertions if persistent.
- Hydration issue: snapshot after load -> console messages -> repeat with the smallest route -> add a targeted E2E assertion when stable.
- Navigation issue: snapshot -> click by ref -> URL assertion -> network requests if the route or payload fails.
- Data issue: snapshot visible state -> network requests/status/body summary -> server route or content query inspection.
- Interaction issue: snapshot -> ref-based action -> visible state assertion -> headed/debug run if timing-sensitive.

## Reference

Read `references/playwright-mcp-notes.md` when you need tool categories, official-doc-derived details, or troubleshooting guidance.
