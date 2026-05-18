## Why

Agents can already run the E2E suite, but the repo does not yet give them a crisp debugging workflow for live pages. This creates friction when diagnosing layout, hydration, navigation, console, or network issues because Playwright Test scripts and Playwright MCP page inspection are documented separately and unevenly.

## What Changes

- Add a page debugging capability that defines how agents should use Playwright Test commands and Playwright MCP together.
- Add project scripts for common Playwright debugging flows such as debug mode, report viewing, trace viewing, and codegen.
- Expand agent-facing guidance so future agents know when to run tests, when to start the Nuxt dev server, and how to inspect real pages with Playwright MCP.
- Preserve the existing boundary that Playwright MCP is an agent tool, not a Nuxt runtime dependency.

## Capabilities

### New Capabilities

- `page-debugging`: Agent-facing page debugging workflow for Playwright Test and Playwright MCP.

### Modified Capabilities

None. The existing Playwright E2E behavior remains intact; this change adds a debugging workflow around it.

## Impact

- `package.json` scripts for Playwright debugging commands.
- `AGENTS.md` testing/debugging instructions.
- OpenSpec docs under `openspec/changes/improve-page-debugging/`.
- No production app code, runtime dependency, or browser behavior changes.
