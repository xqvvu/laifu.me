---
name: openspec-workflow
description: Route new requirements, feature work, behavior changes, bug fixes, and refactors in this repo through the OpenSpec workflow before implementation. Use for any non-trivial change request in /Users/chuanhu9/devs/laifu.me unless the user explicitly asks to skip OpenSpec.
license: MIT
compatibility: Requires openspec CLI and the OpenSpec-generated Codex skills in .codex/skills.
---

# OpenSpec Workflow

Use this as the entry point for new requirements, bug fixes, behavior changes, and refactors in this repository.

## First Checks

Run these before choosing a workflow path:

```bash
openspec list --json
openspec list --specs --json
```

If the request is Nuxt-related, also use `nuxt-remote` first according to `AGENTS.md`. If the change affects user-visible behavior, plan to verify real pages with Playwright MCP after implementation.

## Workflow Routing

- If the user wants to explore or the requirement is still unclear, use `openspec-explore`.
- If the user asks for a new feature, bug fix, behavior change, or refactor and no matching active change exists, use `openspec-propose`.
- If the user asks to implement or continue a prepared OpenSpec change, use `openspec-apply-change`.
- If all implementation tasks are complete and the user wants to finalize, use `openspec-archive-change`.

Do not implement code for a new non-trivial change before a proposal and tasks exist, unless the user explicitly asks to skip OpenSpec.

## Proposal Rules

When creating a proposal:

1. Derive a short kebab-case change name.
2. Create the change with `openspec new change "<name>"`.
3. Use `openspec status --change "<name>" --json` to discover required artifacts.
4. Use `openspec instructions <artifact-id> --change "<name>" --json` for each artifact.
5. Create artifacts in dependency order until the change is apply-ready.
6. Show the generated tasks to the user and wait for confirmation before implementation when the user asked to review tasks first.

Keep artifacts grounded in this codebase. Do not copy OpenSpec instruction context or rule blocks into artifact files.

## Implementation Rules

When applying a change:

1. Use `openspec instructions apply --change "<name>" --json`.
2. Read every context file returned by the CLI.
3. Work through pending tasks in order unless there is a clear dependency reason to reorder.
4. Keep edits narrow and consistent with the existing Nuxt project shape.
5. Mark each task complete in `tasks.md` immediately after finishing it.
6. If implementation reveals a design or requirement issue, pause and update the OpenSpec artifacts before continuing.

Use `pnpm` commands from `package.json` for verification. Run the narrowest useful checks, or `pnpm check` for broad changes.

## Exceptions

OpenSpec is not required for:

- Purely read-only questions.
- Tiny typo fixes.
- Narrow documentation wording edits that do not change behavior or project rules.
- Mechanical formatting with no semantic change.

If unsure, use OpenSpec.
