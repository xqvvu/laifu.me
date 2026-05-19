<template>
  <div :class="$style.visual" aria-label="Floating notes knowledge structure">
    <span :class="[$style.thread, $style.threadA]" aria-hidden="true" />
    <span :class="[$style.thread, $style.threadB]" aria-hidden="true" />
    <span :class="[$style.thread, $style.threadC]" aria-hidden="true" />

    <span :class="[$style.node, $style.nodeA]" aria-hidden="true" />
    <span :class="[$style.node, $style.nodeB]" aria-hidden="true" />
    <span :class="[$style.node, $style.nodeC]" aria-hidden="true" />
    <span :class="[$style.node, $style.nodeD]" aria-hidden="true" />

    <article :class="[$style.note, $style.noteBack]" aria-hidden="true">
      <span :class="$style.spine" />
      <span :class="$style.title" />
      <span :class="$style.line" />
      <span :class="[$style.line, $style.lineShort]" />
      <span :class="$style.line" />
    </article>

    <article :class="[$style.note, $style.noteFront]" aria-hidden="true">
      <span :class="$style.spine" />
      <span :class="$style.bookmark" />
      <span :class="$style.title" />
      <span :class="$style.line" />
      <span :class="[$style.line, $style.lineShort]" />
      <span :class="$style.line" />
      <span :class="[$style.line, $style.lineTiny]" />
      <span :class="$style.tag" />
    </article>
  </div>
</template>

<style module>
@layer components {
  .visual {
    position: relative;
    aspect-ratio: 1;
    width: min(100%, 18rem);
    min-height: 12rem;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 24%);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgb(255 255 255 / 0.4), transparent 44%),
      radial-gradient(
        circle at 52% 42%,
        color-mix(in srgb, var(--site-accent), transparent 88%),
        transparent 64%
      ),
      color-mix(in srgb, var(--site-panel), var(--site-bg) 18%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.28);
    transform: translateZ(0);
  }

  :global(.dark) .visual {
    background:
      linear-gradient(135deg, rgb(255 255 255 / 0.04), transparent 46%),
      radial-gradient(
        circle at 52% 42%,
        color-mix(in srgb, var(--site-accent), transparent 90%),
        transparent 64%
      ),
      color-mix(in srgb, var(--site-panel), var(--site-bg) 18%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08);
  }

  .visual::before {
    position: absolute;
    inset: 0.875rem;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 45%);
    border-radius: 6px;
    content: "";
    pointer-events: none;
    transform: rotate(-3deg);
  }

  .visual::after {
    position: absolute;
    right: 1.125rem;
    bottom: 1.125rem;
    width: 2.75rem;
    height: 1px;
    background: color-mix(in srgb, var(--site-accent), transparent 54%);
    content: "";
    pointer-events: none;
  }

  .note {
    position: absolute;
    top: 3.15rem;
    left: 4.75rem;
    width: 9.2rem;
    height: 10.8rem;
    border: 1px solid color-mix(in srgb, var(--site-fg), transparent 72%);
    border-radius: 6px;
    background: color-mix(in srgb, var(--site-panel), var(--site-bg) 10%);
    box-shadow:
      0 18px 40px rgb(31 41 51 / 0.08),
      inset 0 1px 0 rgb(255 255 255 / 0.35);
    transform-origin: 50% 70%;
  }

  :global(.dark) .note {
    box-shadow:
      0 18px 40px rgb(0 0 0 / 0.34),
      inset 0 1px 0 rgb(255 255 255 / 0.06);
  }

  .noteBack {
    opacity: 0.72;
    transform: translate(-1.35rem, -0.45rem) rotate(-8deg) scale(0.88);
  }

  .noteFront {
    animation: home-hero-note-float 8s ease-in-out infinite;
    transform: rotate(4deg);
  }

  .spine,
  .title,
  .line,
  .tag,
  .bookmark {
    position: absolute;
    display: block;
    border-radius: 999px;
    background: color-mix(in srgb, var(--site-muted), transparent 36%);
  }

  .spine {
    top: 1.15rem;
    bottom: 1.35rem;
    left: 1rem;
    width: 0.18rem;
    background: color-mix(in srgb, var(--site-accent), transparent 18%);
  }

  .title {
    top: 1.35rem;
    left: 1.75rem;
    width: 4.4rem;
    height: 0.28rem;
    background: color-mix(in srgb, var(--site-fg), transparent 24%);
  }

  .line {
    left: 1.75rem;
    width: 5.85rem;
    height: 0.18rem;
  }

  .line:nth-of-type(4) {
    top: 3.05rem;
  }

  .line:nth-of-type(5) {
    top: 4.2rem;
  }

  .line:nth-of-type(6) {
    top: 5.35rem;
  }

  .lineShort {
    width: 4.55rem;
  }

  .lineTiny {
    top: 6.5rem;
    width: 3.25rem;
  }

  .tag {
    right: 1.1rem;
    bottom: 1.2rem;
    width: 2.35rem;
    height: 0.22rem;
    background: color-mix(in srgb, var(--site-fg), transparent 28%);
  }

  .bookmark {
    top: 0.95rem;
    right: 1.25rem;
    width: 0.7rem;
    height: 2.75rem;
    border-radius: 0 0 3px 3px;
    background: color-mix(in srgb, var(--site-accent), transparent 10%);
  }

  .thread {
    position: absolute;
    height: 1px;
    background: color-mix(in srgb, var(--site-muted), transparent 40%);
    transform-origin: left center;
  }

  .threadA {
    top: 5.15rem;
    left: 2.2rem;
    width: 4.9rem;
    transform: rotate(22deg);
  }

  .threadB {
    top: 7.8rem;
    right: 2.15rem;
    width: 5.1rem;
    transform: rotate(154deg);
  }

  .threadC {
    top: 2.8rem;
    right: 3.25rem;
    width: 4.2rem;
    transform: rotate(142deg);
  }

  .node {
    position: absolute;
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    border: 1px solid color-mix(in srgb, var(--site-bg), transparent 10%);
    border-radius: 999px;
    background: var(--site-accent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--site-accent), transparent 90%);
  }

  .nodeA {
    top: 4.6rem;
    left: 1.85rem;
  }

  .nodeB {
    top: 2.35rem;
    right: 2.8rem;
    width: 0.48rem;
    height: 0.48rem;
    opacity: 0.72;
  }

  .nodeC {
    right: 1.8rem;
    bottom: 4.75rem;
    width: 0.52rem;
    height: 0.52rem;
    opacity: 0.82;
  }

  .nodeD {
    bottom: 3.1rem;
    left: 3.45rem;
    width: 0.46rem;
    height: 0.46rem;
    opacity: 0.64;
  }

  @media (prefers-reduced-motion: reduce) {
    .noteFront {
      animation: none;
    }
  }

  @keyframes home-hero-note-float {
    0%,
    100% {
      transform: rotate(4deg) translateY(0);
    }

    50% {
      transform: rotate(2.5deg) translateY(-0.35rem);
    }
  }
}
</style>
