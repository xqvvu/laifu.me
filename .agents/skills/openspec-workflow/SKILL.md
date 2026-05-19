---
name: openspec-workflow
description: Route non-trivial feature work, behavior changes, bug fixes, refactors, and architecture decisions through an OpenSpec proposal -> implementation -> archive workflow. Use when a repo has or should have an openspec/ directory, unless the user explicitly asks to skip OpenSpec.
license: MIT
compatibility: Requires only the openspec CLI.
---

# OpenSpec Workflow

Use this skill to keep implementation aligned with repo-local OpenSpec artifacts. The durable source of truth is `openspec/specs/`; active changes live in `openspec/changes/<change-name>/` until archived.

## Trigger Rules

Use OpenSpec before implementation for:

- New features or behavior changes.
- Bug fixes where expected behavior needs clarification.
- Refactors, migrations, API/schema changes, or architecture decisions.
- Cross-cutting changes touching multiple modules.
- Any request where tasks, acceptance criteria, or scope should be reviewable.

OpenSpec is optional for:

- Read-only questions, investigation, or code review with no edits.
- Tiny typo fixes and comments with no behavior change.
- Mechanical formatting or one-line local fixes with obvious intent.
- Emergency fixes when the user explicitly asks to skip planning.

If unsure, use OpenSpec or ask once before editing.

## Initial Recon

Run from the repo root:

```bash
openspec list --json
openspec list --specs --json
```

If `openspec/` is missing and OpenSpec is appropriate, initialize only with user intent:

```bash
openspec init --tools codex .
```

Then inspect project guidance such as `openspec/AGENTS.md`, `AGENTS.md`, `README.md`, and relevant specs before proposing changes.

## Workflow Routing

- **Explore**: If the request is unclear, inspect active changes/specs/code and ask only for missing decisions that affect behavior or scope.
- **Propose**: If no matching active change exists, create one and write required artifacts.
- **Continue**: If a matching active change exists, inspect it and continue from the current status.
- **Implement**: If proposal artifacts and tasks exist, apply tasks against the codebase.
- **Archive**: After implementation and verification, archive so specs become the current source of truth.

Do not implement a new non-trivial change before proposal/spec/task artifacts exist unless the user explicitly asks to skip OpenSpec.

## Propose

When creating a proposal:

1. Derive a short verb-led kebab-case change name, for example `add-session-timeout`.
2. Create the change with `openspec new change "<name>"`.
3. Use `openspec status --change "<name>" --json` to discover required artifacts.
4. Use `openspec instructions <artifact-id> --change "<name>" --json` for each artifact.
5. Read listed dependency artifacts before writing the next artifact.
6. Create artifacts in dependency order until `applyRequires` are complete.
7. Validate with `openspec validate "<name>" --strict`.
8. Show the change name, artifact paths, and task summary. Wait for approval only when the user asked to review first or scope is risky.

Artifact quality rules:

- `proposal.md`: explain why, what changes, what stays out of scope, and success criteria.
- Delta specs: describe behavior as requirements and scenarios. Keep implementation details in design/tasks unless they are externally observable behavior.
- `design.md`: record technical approach, tradeoffs, data/API impacts, rollout/migration considerations, and open risks.
- `tasks.md`: make tasks ordered, small, and verifiable. Include testing/validation tasks.
- Do not paste OpenSpec instruction, context, or rules blocks into artifacts.
- Prefer updating artifacts over guessing when implementation reveals a requirement or design mismatch.

Useful inspection commands:

```bash
openspec show "<name>"
openspec show "<name>" --json --type change
openspec show "<name>" --json --type change --deltas-only
openspec status --change "<name>"
```

## Implement

When applying a change:

1. Select the change from user input, conversation context, or `openspec list --json`; if ambiguous, ask.
2. Run `openspec status --change "<name>" --json`.
3. Run `openspec instructions apply --change "<name>" --json`.
4. Read every path in `contextFiles` plus relevant code before editing.
5. Work through pending tasks in dependency order.
6. Keep code edits scoped to the approved behavior.
7. Mark each completed task in the tasks file immediately after implementation and verification.
8. If reality diverges from the proposal/spec/design, update the OpenSpec artifacts and re-run validation before continuing.

Verification:

- Run the narrowest meaningful repo checks first, then broader checks if the change touches shared behavior.
- Validate the OpenSpec change again with `openspec validate "<name>" --strict`.
- Do not mark implementation done while tests or required manual verification remain unperformed unless clearly documented.

## Archive

Archive only after implementation tasks are complete and verification has passed or the user explicitly accepts remaining risk.

1. Confirm task checkboxes are complete.
2. Run `openspec validate "<name>" --strict`.
3. Run `openspec archive "<name>" --yes`.
4. Confirm the active change is gone and specs are updated:

```bash
openspec list --json
openspec list --specs --json
```

Use `openspec archive "<name>" --skip-specs --yes` only for tooling, infrastructure, or documentation changes that intentionally do not modify capability specs.

## Best Practices

- Treat `openspec/specs/` as the current system behavior, not a changelog.
- Keep changes small and cohesive; prefer multiple changes for unrelated goals.
- Check existing specs and active changes before proposing to avoid contradictions.
- Write observable requirements with scenarios; avoid vague goals like "improve UX" without acceptance criteria.
- Keep implementation plans grounded in the real codebase and existing conventions.
- Update artifacts fluidly when new facts appear; OpenSpec is iterative, not a rigid waterfall.
- Archive promptly after verified implementation so future work starts from current specs.

## Command Reference

```bash
openspec --help
openspec init --tools codex .
openspec list --json
openspec list --specs --json
openspec new change "<name>"
openspec status --change "<name>" --json
openspec instructions <artifact-id> --change "<name>" --json
openspec instructions apply --change "<name>" --json
openspec show "<name>" --json --type change
openspec validate "<name>" --strict
openspec validate --all --strict
openspec archive "<name>" --yes
```
