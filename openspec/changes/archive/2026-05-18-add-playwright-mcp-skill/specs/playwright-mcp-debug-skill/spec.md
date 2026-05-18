## ADDED Requirements

### Requirement: Local Playwright MCP Debug Skill
The repository SHALL provide a local Codex skill that describes how agents debug local pages with Playwright MCP.

#### Scenario: Agent needs to debug a page
- **WHEN** an agent is asked to inspect, debug, verify, or troubleshoot user-visible page behavior
- **THEN** the agent can use the local `playwright-mcp-debug` skill for the workflow

### Requirement: Snapshot-First Workflow
The skill SHALL instruct agents to start page inspection with accessibility snapshots and use snapshot refs for interactions before relying on screenshots.

#### Scenario: Agent interacts with a page
- **WHEN** an agent needs to click, type, select, hover, or navigate through UI
- **THEN** the agent uses snapshot-derived refs for the interaction whenever possible

### Requirement: Debug Evidence
The skill SHALL require agents to collect relevant evidence from page state, console messages, network requests, screenshots, traces, or E2E tests depending on the issue.

#### Scenario: Agent reports a page debugging result
- **WHEN** an agent finishes a debugging task
- **THEN** the agent reports the inspected URL, relevant interactions, evidence checked, and remaining risk

### Requirement: Agent Guidance Linkage
`AGENTS.md` SHALL point agents to the local skill for Playwright MCP page debugging instead of duplicating the full workflow inline.

#### Scenario: Agent reads repo instructions
- **WHEN** an agent reads `AGENTS.md`
- **THEN** the agent sees that Playwright MCP page debugging should use the local `playwright-mcp-debug` skill
