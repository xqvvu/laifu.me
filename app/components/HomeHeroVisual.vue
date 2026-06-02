<script setup lang="ts">
import { gsap } from "gsap";

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;
let mm: gsap.MatchMedia | undefined;

onMounted(() => {
  if (!root.value) return;
  const heroRoot = root.value;

  ctx = gsap.context(() => {
    mm = gsap.matchMedia(heroRoot);

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        gsap.set("[data-hero-piece]", { autoAlpha: 1 });

        gsap.from("[data-hero-intro]", {
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          y: 18,
        });

        gsap.from("[data-hero-line]", {
          duration: 1.2,
          ease: "power3.inOut",
          scaleX: 0,
          stagger: 0.06,
          transformOrigin: "left center",
        });

        if (conditions?.reduce) return;

        gsap.to("[data-hero-float]", {
          duration: 5.8,
          ease: "sine.inOut",
          repeat: -1,
          rotation: (index) => (index % 2 === 0 ? 1.8 : -1.4),
          stagger: 0.18,
          y: (index) => (index % 2 === 0 ? -8 : 7),
          yoyo: true,
        });

        gsap.to("[data-hero-pulse]", {
          autoAlpha: 0.48,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          stagger: 0.22,
          yoyo: true,
        });

        gsap.to("[data-hero-orbit]", {
          duration: 8,
          ease: "none",
          repeat: -1,
          rotation: 360,
          transformOrigin: "center center",
        });
      },
    );
  }, heroRoot);
});

onUnmounted(() => {
  mm?.revert();
  ctx?.revert();
});
</script>

<template>
  <figure ref="root" :class="$style.visual" aria-label="Abstract editorial composition">
    <div :class="$style.backdrop" aria-hidden="true">
      <span :class="$style.gridLine" data-hero-line />
      <span :class="$style.gridLine" data-hero-line />
      <span :class="$style.gridLine" data-hero-line />
    </div>

    <div :class="$style.paperPlane" data-hero-float data-hero-intro data-hero-piece>
      <span :class="$style.paperFold" />
      <div :class="$style.paperWindows">
        <span data-hero-line />
        <span data-hero-line />
        <span data-hero-line />
      </div>
      <span :class="$style.paperAccent" data-hero-pulse />
    </div>

    <div :class="$style.flowPanel" data-hero-float data-hero-intro data-hero-piece>
      <span :class="$style.flowArc" />
      <span :class="$style.flowArc" />
      <span :class="$style.flowNode" data-hero-pulse />
      <span :class="$style.flowNode" data-hero-pulse />
      <span :class="$style.flowNode" data-hero-pulse />
    </div>

    <div :class="$style.prismCard" data-hero-float data-hero-intro data-hero-piece>
      <span :class="$style.prismShard" />
      <span :class="$style.prismShard" />
      <span :class="$style.prismShard" />
    </div>

    <div :class="$style.orbitDial" data-hero-intro data-hero-piece>
      <span :class="$style.orbitRing" data-hero-orbit>
        <span :class="$style.orbitDot" data-hero-pulse />
      </span>
      <span :class="$style.orbitCore" />
    </div>
  </figure>
</template>

<style module>
@layer components {
  .visual {
    position: relative;
    isolation: isolate;
    width: min(100%, 36rem);
    min-height: 28rem;
    margin-inline: auto;
    color: var(--site-fg);
  }

  .visual::before {
    position: absolute;
    inset: 1rem 0 0 1.25rem;
    z-index: -2;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 24%);
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--site-line), transparent 64%) 1px,
        transparent 1px
      ),
      linear-gradient(
        0deg,
        color-mix(in srgb, var(--site-line), transparent 68%) 1px,
        transparent 1px
      ),
      linear-gradient(135deg, color-mix(in srgb, #f97316, transparent 86%), transparent 36%),
      color-mix(in srgb, var(--site-panel), var(--site-bg) 16%);
    background-size:
      3.5rem 3.5rem,
      3.5rem 3.5rem,
      auto,
      auto;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.32);
    content: "";
  }

  .visual::after {
    position: absolute;
    right: 0.9rem;
    bottom: 2.15rem;
    z-index: -1;
    width: 36%;
    height: 42%;
    border: 1px solid color-mix(in srgb, #0f766e, transparent 36%);
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, #0f766e, transparent 88%) 0 2px,
      transparent 2px 10px
    );
    content: "";
  }

  :global(.dark) .visual::before {
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--site-line), transparent 36%) 1px,
        transparent 1px
      ),
      linear-gradient(
        0deg,
        color-mix(in srgb, var(--site-line), transparent 42%) 1px,
        transparent 1px
      ),
      linear-gradient(135deg, color-mix(in srgb, #f97316, transparent 90%), transparent 36%),
      color-mix(in srgb, var(--site-panel), var(--site-bg) 12%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
  }

  .backdrop {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .gridLine {
    position: absolute;
    display: block;
    height: 1px;
    background: color-mix(in srgb, var(--site-fg), transparent 56%);
  }

  .gridLine:nth-child(1) {
    top: 4.2rem;
    left: 2.6rem;
    width: 55%;
  }

  .gridLine:nth-child(2) {
    top: 18.5rem;
    right: 2rem;
    width: 44%;
  }

  .gridLine:nth-child(3) {
    top: 2.3rem;
    right: 4.5rem;
    width: 1px;
    height: 20rem;
  }

  .paperPlane,
  .flowPanel,
  .prismCard,
  .orbitDial {
    border: 1px solid color-mix(in srgb, var(--site-fg), transparent 72%);
    border-radius: 6px;
    background: color-mix(in srgb, var(--site-panel), var(--site-bg) 8%);
    box-shadow:
      0 22px 46px rgb(31 41 51 / 0.1),
      inset 0 1px 0 rgb(255 255 255 / 0.38);
  }

  :global(.dark) .paperPlane,
  :global(.dark) .flowPanel,
  :global(.dark) .prismCard,
  :global(.dark) .orbitDial {
    box-shadow:
      0 22px 46px rgb(0 0 0 / 0.36),
      inset 0 1px 0 rgb(255 255 255 / 0.06);
  }

  .paperPlane {
    position: absolute;
    top: 2rem;
    left: 2.1rem;
    width: min(72%, 22rem);
    min-height: 21rem;
    overflow: hidden;
    padding: 1.1rem;
    transform: rotate(-2deg);
  }

  .paperPlane::before {
    position: absolute;
    inset: 1.1rem;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 18%);
    background:
      radial-gradient(
        circle at 20% 24%,
        color-mix(in srgb, #0f766e, transparent 82%) 0 0.28rem,
        transparent 0.32rem
      ),
      linear-gradient(
        135deg,
        transparent 0 54%,
        color-mix(in srgb, var(--site-line), transparent 18%) 54% 55%,
        transparent 55%
      );
    content: "";
  }

  .paperPlane::after {
    position: absolute;
    right: -3.8rem;
    bottom: -3.1rem;
    width: 12rem;
    height: 12rem;
    border: 1px solid color-mix(in srgb, #f97316, transparent 58%);
    border-radius: 999px;
    background: radial-gradient(
      circle,
      color-mix(in srgb, #f97316, transparent 84%) 0 34%,
      transparent 35%
    );
    content: "";
  }

  .paperFold {
    position: absolute;
    top: 1.1rem;
    right: 1.1rem;
    width: 7.5rem;
    height: 7.5rem;
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, #f97316, transparent 80%),
        transparent 62%
      ),
      color-mix(in srgb, var(--site-panel), var(--site-bg) 14%);
    clip-path: polygon(100% 0, 100% 100%, 0 0);
  }

  .paperWindows {
    position: absolute;
    top: 4.1rem;
    left: 3.1rem;
    display: grid;
    width: 54%;
    gap: 0.8rem;
  }

  .paperWindows span {
    display: block;
    height: 0.72rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--site-fg), transparent 18%);
  }

  .paperWindows span:nth-child(1) {
    width: 86%;
  }

  .paperWindows span:nth-child(2) {
    width: 58%;
    background: color-mix(in srgb, #f97316, var(--site-fg) 16%);
  }

  .paperWindows span:nth-child(3) {
    width: 72%;
    background: color-mix(in srgb, #0f766e, var(--site-fg) 18%);
  }

  .paperAccent {
    position: absolute;
    left: 3.1rem;
    bottom: 3rem;
    display: block;
    width: 5.8rem;
    height: 5.8rem;
    border: 1px solid color-mix(in srgb, #0f766e, transparent 38%);
    border-radius: 999px;
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, #0f766e, transparent 88%) 0 2px,
      transparent 2px 9px
    );
  }

  .flowPanel {
    position: absolute;
    right: 0;
    bottom: 5.6rem;
    width: min(48%, 15.5rem);
    min-height: 9.2rem;
    overflow: hidden;
    padding: 1rem;
    transform: rotate(2.5deg);
  }

  .flowPanel::before {
    position: absolute;
    inset: 0.9rem;
    background:
      linear-gradient(
        90deg,
        transparent 49%,
        color-mix(in srgb, var(--site-line), transparent 18%) 49% 51%,
        transparent 51%
      ),
      linear-gradient(
        0deg,
        transparent 49%,
        color-mix(in srgb, var(--site-line), transparent 18%) 49% 51%,
        transparent 51%
      );
    content: "";
  }

  .flowArc {
    position: absolute;
    display: block;
    border: 1px solid color-mix(in srgb, var(--site-muted), transparent 32%);
    border-radius: 999px;
  }

  .flowArc:nth-child(1) {
    right: -2.5rem;
    bottom: -2.8rem;
    width: 10rem;
    height: 10rem;
  }

  .flowArc:nth-child(2) {
    top: -3.2rem;
    left: -2.1rem;
    width: 8.4rem;
    height: 8.4rem;
    border-color: color-mix(in srgb, #f97316, transparent 54%);
  }

  .flowNode {
    position: absolute;
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    border: 1px solid var(--site-panel);
    border-radius: 999px;
    background: #f97316;
    box-shadow: 0 0 0 5px color-mix(in srgb, #f97316, transparent 84%);
  }

  .flowNode:nth-child(3) {
    top: 22%;
    left: 22%;
  }

  .flowNode:nth-child(4) {
    top: 50%;
    left: 58%;
    background: #0f766e;
    box-shadow: 0 0 0 5px color-mix(in srgb, #0f766e, transparent 84%);
  }

  .flowNode:nth-child(5) {
    right: 18%;
    bottom: 18%;
    background: var(--site-fg);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--site-fg), transparent 86%);
  }

  .prismCard {
    position: absolute;
    right: 2rem;
    bottom: 0.6rem;
    width: min(54%, 17rem);
    min-height: 6.9rem;
    overflow: hidden;
    padding: 1rem;
    transform: rotate(-1.5deg);
  }

  .prismCard::before {
    position: absolute;
    inset: 1rem;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 12%);
    content: "";
  }

  .prismShard {
    position: absolute;
    display: block;
    border-radius: 999px;
  }

  .prismShard:nth-child(1) {
    top: 1.6rem;
    left: 1.4rem;
    width: 74%;
    height: 0.74rem;
    background: color-mix(in srgb, var(--site-fg), transparent 18%);
  }

  .prismShard:nth-child(2) {
    top: 3.25rem;
    left: 1.4rem;
    width: 48%;
    height: 0.74rem;
    background: color-mix(in srgb, #f97316, var(--site-fg) 18%);
  }

  .prismShard:nth-child(3) {
    right: -1.1rem;
    bottom: -1.5rem;
    width: 6.4rem;
    height: 6.4rem;
    border: 1px solid color-mix(in srgb, #0f766e, transparent 40%);
    background: radial-gradient(
      circle,
      color-mix(in srgb, #0f766e, transparent 82%) 0 38%,
      transparent 39%
    );
  }

  .orbitDial {
    position: absolute;
    top: 0;
    right: 1.25rem;
    display: grid;
    width: 6rem;
    height: 6rem;
    place-items: center;
    border-radius: 999px;
  }

  .orbitDial::before {
    position: absolute;
    inset: 0.85rem;
    border: 1px dashed color-mix(in srgb, var(--site-muted), transparent 34%);
    border-radius: inherit;
    content: "";
  }

  .orbitRing {
    position: relative;
    width: 3.8rem;
    height: 3.8rem;
    border: 1px solid color-mix(in srgb, #0f766e, transparent 36%);
    border-radius: inherit;
  }

  .orbitDot {
    position: absolute;
    top: -0.24rem;
    left: 50%;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: inherit;
    background: #f97316;
    box-shadow: 0 0 0 5px color-mix(in srgb, #f97316, transparent 84%);
    transform: translateX(-50%);
  }

  .orbitCore {
    position: absolute;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: inherit;
    background: color-mix(in srgb, var(--site-fg), transparent 12%);
  }

  @media (max-width: 640px) {
    .visual {
      min-height: 13.75rem;
    }

    .visual::before {
      inset: 0.35rem 0.2rem 0 0.2rem;
    }

    .paperPlane {
      top: 1.1rem;
      left: 0.6rem;
      width: 74%;
      min-height: 11.8rem;
      padding: 0.8rem;
    }

    .paperPlane::before {
      inset: 0.75rem;
    }

    .paperPlane::after {
      right: -4.8rem;
      bottom: -4.3rem;
    }

    .paperFold {
      top: 0.75rem;
      right: 0.75rem;
      width: 4.8rem;
      height: 4.8rem;
    }

    .paperWindows {
      top: 2.75rem;
      left: 1.55rem;
      gap: 0.46rem;
      width: 58%;
    }

    .paperWindows span {
      height: 0.48rem;
    }

    .paperAccent {
      left: 1.55rem;
      bottom: 1.45rem;
      width: 3.4rem;
      height: 3.4rem;
    }

    .flowPanel {
      right: 0.2rem;
      bottom: 2.25rem;
      width: 51%;
      min-height: 5.8rem;
      padding: 0.72rem;
    }

    .prismCard {
      right: 0.8rem;
      bottom: 0.1rem;
      width: 58%;
      min-height: 4.2rem;
      padding: 0.72rem;
    }

    .prismShard:nth-child(1),
    .prismShard:nth-child(2) {
      left: 1rem;
      height: 0.48rem;
    }

    .prismShard:nth-child(1) {
      top: 1rem;
    }

    .prismShard:nth-child(2) {
      top: 2.05rem;
    }

    .prismShard:nth-child(3) {
      width: 4rem;
      height: 4rem;
    }

    .orbitDial {
      right: 0.5rem;
      width: 4.2rem;
      height: 4.2rem;
    }

    .orbitRing {
      width: 2.55rem;
      height: 2.55rem;
    }
  }
}
</style>
