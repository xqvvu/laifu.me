## Why

The repo now has Playwright scripts and brief AGENTS guidance, but future agents still need a reusable, focused procedure for using Playwright MCP well while debugging pages. A local skill can carry the workflow without making `AGENTS.md` long or forcing agents to rediscover the MCP docs.

## What Changes

- Add a repo-local `playwright-mcp-debug` skill under `.codex/skills/`.
- Capture Playwright MCP guidance from official docs in a compact reference file.
- Update `AGENTS.md` to invoke the skill for page debugging and keep the high-level rules concise.
- Keep Playwright MCP as an agent tool, not an npm dependency or app runtime concern.

## Capabilities

### New Capabilities

- `playwright-mcp-debug-skill`: A reusable agent workflow for inspecting and debugging local pages with Playwright MCP.

### Modified Capabilities

None. This change extends agent workflow documentation and skill discovery without changing app behavior.

## Impact

- `.codex/skills/playwright-mcp-debug/`
- `AGENTS.md`
- OpenSpec artifacts under `openspec/changes/add-playwright-mcp-skill/`
- No production app code changes.
