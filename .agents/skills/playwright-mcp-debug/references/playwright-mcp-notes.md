# Playwright MCP Notes

Official docs reviewed:

- https://playwright.dev/mcp/introduction
- https://playwright.dev/mcp/snapshots
- https://playwright.dev/mcp/tools
- https://playwright.dev/mcp/tools/navigation
- https://playwright.dev/mcp/tools/interaction
- https://playwright.dev/mcp/tools/console
- https://playwright.dev/mcp/tools/network
- https://playwright.dev/mcp/tools/screenshots
- https://playwright.dev/mcp/tools/tracing
- https://playwright.dev/mcp/tools/testing
- https://playwright.dev/mcp/configuration

## Mental Model

Playwright MCP gives an agent structured browser control. Its default strength is the accessibility snapshot: a text representation of the current page with element refs. Refs make interactions deterministic and cheaper than visual coordinate guessing.

Use vision or screenshots when the issue is genuinely visual, canvas-based, image-based, or inaccessible through the accessibility tree. For ordinary app UI, inspect the snapshot first.

## Tool Categories

- Navigation: open URLs, go back/forward, manage tabs, wait for page state.
- Interaction: click, type, fill forms, select options, hover, drag, upload, press keys.
- Console: inspect browser console output for runtime errors, warnings, and hydration messages.
- Network: list and inspect requests/responses when data, routes, assets, feeds, or API calls fail.
- Screenshots: capture viewport or element visuals after narrowing the issue with structured checks.
- Tracing: capture a reproducible interaction trail for complex or timing-sensitive failures.
- Testing/assertions: create or validate explicit page assertions when the behavior should become repeatable coverage.

## Local Nuxt Routine

1. Confirm the server:
   - Check whether `http://localhost:5173` is already reachable.
   - If not, start `pnpm dev` from repo root.
2. Open the concrete route, not just `/`, unless the bug is global shell behavior.
3. Take `browser_snapshot`.
4. Interact using snapshot refs.
5. Check console and network before editing code if the symptom could be hydration, data, route, or asset related.
6. Capture a screenshot only after the state is reproduced.
7. Run or update `pnpm test:e2e` when the scenario should be protected.

## Evidence To Report

Include only what helps the user trust the result:

- URL and viewport inspected.
- Key interaction sequence.
- Snapshot-visible state or assertion target.
- Console or network errors checked.
- Screenshot/trace use, if any.
- Test command run and pass/fail result.

## Troubleshooting

- `ERR_CONNECTION_REFUSED` on `localhost:5173`: the Nuxt dev server is not running or the wrong port is used.
- Browser already in use: close the conflicting MCP session, avoid concurrent sessions, or use an isolated browser profile if available.
- Snapshot misses visual-only content: use screenshot or vision mode, then correlate with DOM/CSS where possible.
- Flaky timing: prefer Playwright waits/assertions over fixed sleeps; reproduce in headed or debug mode before changing code.
- MCP confirms a bug but no test exists: add the smallest Playwright Test coverage that asserts the user-visible behavior.
