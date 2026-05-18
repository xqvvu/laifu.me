## ADDED Requirements

### Requirement: Playwright Debug Commands
The project SHALL expose package scripts for repeatable Playwright debugging workflows, including headed execution, UI mode, debug mode, HTML report viewing, trace viewing, and code generation.

#### Scenario: Agent discovers debug commands
- **WHEN** an agent inspects `package.json`
- **THEN** the agent can find scripts for headed E2E runs, UI mode, debug mode, report viewing, trace viewing, and code generation

### Requirement: Playwright MCP Page Inspection Guidance
The repository guidance SHALL describe how agents use Playwright MCP to inspect a running Nuxt page with accessibility snapshots, page interactions, console output, network requests, and screenshots when debugging user-visible behavior.

#### Scenario: Agent debugs a visible page issue
- **WHEN** a change affects layout, navigation, rendering, hydration, or other user-visible behavior
- **THEN** the agent uses Playwright MCP against the running local app before relying only on screenshots or static code inspection

### Requirement: Tool Boundary
The debugging workflow MUST distinguish Playwright Test from Playwright MCP: Playwright Test is the committed repeatable test runner, and Playwright MCP is the agent-operated live inspection tool.

#### Scenario: Agent updates test setup
- **WHEN** an agent changes E2E setup or debugging guidance
- **THEN** the agent keeps Playwright MCP out of app runtime dependencies and does not replace committed Playwright tests with MCP-only checks

### Requirement: Local Server Assumption
The guidance SHALL tell agents to verify or start the Nuxt dev server on port `5173` before opening localhost pages with Playwright MCP.

#### Scenario: Agent opens localhost
- **WHEN** an agent needs to inspect a local page with Playwright MCP
- **THEN** the agent confirms `pnpm dev` is serving the app on `http://localhost:5173` or starts it before navigating
