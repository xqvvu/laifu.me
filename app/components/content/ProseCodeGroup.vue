<script setup lang="ts">
import { Fragment, Text, cloneVNode, h } from "vue";
import type { VNode } from "vue";

/**
 * `::code-group` — the same command in several package managers.
 *
 * MDC hands this container the fenced blocks as ordinary children, each
 * carrying `filename` (`pnpm`, `npm`, …) in its props. The group reads those
 * children, lifts the filename out as the tab label, and renders one panel
 * per block. Authors keep writing plain, portable code fences — no tab
 * directive wrapping required.
 *
 * The markup is built in a render function rather than a template because
 * the children have to be re-homed into panels. Its styles are deliberately
 * unscoped: Vue attaches a scope id to vnodes created by a component's own
 * render, and these are created in a child callback, so scoped rules would
 * silently miss them. Class names are namespaced instead.
 */
const slots = useSlots();

/** Unwrap fragments and drop whitespace-only text nodes. */
function flatten(nodes: VNode[]): VNode[] {
  const out: VNode[] = [];
  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      out.push(...flatten(node.children as VNode[]));
    } else if (node.type === Text) {
      continue;
    } else {
      out.push(node);
    }
  }
  return out;
}

function labelOf(node: VNode, index: number) {
  const props = (node.props || {}) as Record<string, unknown>;
  const filename = typeof props.filename === "string" ? props.filename : "";
  const language = typeof props.language === "string" ? props.language : "";
  return filename || language || `代码 ${index + 1}`;
}

const groupName = `code-group-${useId()}`;

// The tab label already names the block, so the inner `ProsePre` must not
// print a second header of its own.
provide("prose-code-group", { hidePreHeader: true });

const render = () => {
  const blocks = flatten((slots.default?.() as VNode[]) || []);

  return h(
    "div",
    { class: "laifu-code-group" },
    blocks.map((node, index) => {
      const id = `${groupName}-${index}`;

      return h("div", { class: "laifu-code-group__item" }, [
        h("input", {
          id,
          class: "laifu-code-group__input",
          type: "radio",
          name: groupName,
          checked: index === 0,
        }),
        h("label", { class: "laifu-code-group__label", for: id }, labelOf(node, index)),
        h("div", { class: "laifu-code-group__panel" }, [cloneVNode(node, { key: index })]),
      ]);
    }),
  );
};
</script>

<template>
  <component :is="render" />
</template>

<style>
.laifu-code-group {
  display: flex;
  flex-wrap: wrap;
  margin-block: 1.35em;
  border: 1px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
}

/*
 * `display: contents` promotes each item's input, label and panel into the
 * group's flex row, so the labels share one line and every panel spans the
 * full width beneath them.
 */
.laifu-code-group__item {
  display: contents;
}

.laifu-code-group__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.laifu-code-group__label {
  order: 0;
  border-bottom: 2px solid transparent;
  margin-inline: 0.15rem;
  padding: 0.55rem 0.85rem;
  color: var(--ink-faint);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  transition: color 120ms ease;
}

.laifu-code-group__label:hover {
  color: var(--ink-soft);
}

.laifu-code-group__input:checked + .laifu-code-group__label {
  border-bottom-color: var(--ink);
  color: var(--ink);
}

.laifu-code-group__input:focus-visible + .laifu-code-group__label {
  outline: 2px solid var(--mark);
  outline-offset: -2px;
}

.laifu-code-group__panel {
  display: none;
  order: 1;
  width: 100%;
  border-top: 1px solid var(--rule);
  padding: 0.35rem 0.2rem;
}

.laifu-code-group__input:checked ~ .laifu-code-group__panel {
  display: block;
}

.laifu-code-group__panel pre {
  margin-block: 0;
}
</style>
