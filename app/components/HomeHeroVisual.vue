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
          autoAlpha: 0.42,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          stagger: 0.22,
          yoyo: true,
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
  <figure ref="root" :class="$style.visual" aria-label="Editorial reading console">
    <div :class="$style.backdrop" aria-hidden="true">
      <span :class="$style.gridLine" data-hero-line />
      <span :class="$style.gridLine" data-hero-line />
      <span :class="$style.gridLine" data-hero-line />
    </div>

    <div :class="$style.manuscript" data-hero-float data-hero-intro data-hero-piece>
      <div :class="$style.manuscriptHeader">
        <span>Draft 061</span>
        <span>Read / Refine</span>
      </div>
      <div :class="$style.titleBlock">
        <span :class="$style.titleRule" />
        <span :class="$style.titleRule" />
      </div>
      <div :class="$style.copyLines">
        <span data-hero-line />
        <span data-hero-line />
        <span data-hero-line />
        <span data-hero-line />
      </div>
      <div :class="$style.annotation">
        <span :class="$style.annotationMark">01</span>
        <span :class="$style.annotationRule" data-hero-line />
      </div>
    </div>

    <div :class="$style.signalPanel" data-hero-float data-hero-intro data-hero-piece>
      <span :class="$style.signalLabel">Signal map</span>
      <div :class="$style.signalTrack">
        <span :class="$style.signalDot" data-hero-pulse />
        <span :class="$style.signalDot" data-hero-pulse />
        <span :class="$style.signalDot" data-hero-pulse />
      </div>
      <div :class="$style.signalRows">
        <span data-hero-line />
        <span data-hero-line />
        <span data-hero-line />
      </div>
    </div>

    <div :class="$style.indexCard" data-hero-float data-hero-intro data-hero-piece>
      <span :class="$style.indexNumber">2026</span>
      <span :class="$style.indexText">Long memory, low noise.</span>
    </div>

    <div :class="$style.cornerDial" data-hero-intro data-hero-piece>
      <span :class="$style.dialNeedle" data-hero-float />
      <span :class="$style.dialLabel">quiet</span>
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

  .manuscript,
  .signalPanel,
  .indexCard,
  .cornerDial {
    border: 1px solid color-mix(in srgb, var(--site-fg), transparent 72%);
    border-radius: 6px;
    background: color-mix(in srgb, var(--site-panel), var(--site-bg) 8%);
    box-shadow:
      0 22px 46px rgb(31 41 51 / 0.1),
      inset 0 1px 0 rgb(255 255 255 / 0.38);
  }

  :global(.dark) .manuscript,
  :global(.dark) .signalPanel,
  :global(.dark) .indexCard,
  :global(.dark) .cornerDial {
    box-shadow:
      0 22px 46px rgb(0 0 0 / 0.36),
      inset 0 1px 0 rgb(255 255 255 / 0.06);
  }

  .manuscript {
    position: absolute;
    top: 2rem;
    left: 2.1rem;
    width: min(72%, 22rem);
    min-height: 21rem;
    padding: 1.1rem;
    transform: rotate(-2deg);
  }

  .manuscriptHeader {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid color-mix(in srgb, var(--site-line), transparent 20%);
    padding-bottom: 0.85rem;
    font-size: 0.78rem;
    color: var(--site-muted);
  }

  .titleBlock {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.4rem;
  }

  .titleRule {
    display: block;
    height: 0.72rem;
    background: var(--site-fg);
  }

  .titleRule:first-child {
    width: 74%;
  }

  .titleRule:last-child {
    width: 48%;
    background: color-mix(in srgb, #f97316, var(--site-fg) 18%);
  }

  .copyLines {
    display: grid;
    gap: 0.85rem;
    margin-top: 2.2rem;
  }

  .copyLines span,
  .signalRows span,
  .annotationRule {
    display: block;
    height: 1px;
    background: color-mix(in srgb, var(--site-muted), transparent 28%);
  }

  .copyLines span:nth-child(1) {
    width: 92%;
  }

  .copyLines span:nth-child(2) {
    width: 72%;
  }

  .copyLines span:nth-child(3) {
    width: 84%;
  }

  .copyLines span:nth-child(4) {
    width: 52%;
  }

  .annotation {
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
    left: 1.2rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.75rem;
  }

  .annotationMark {
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 1px solid color-mix(in srgb, #0f766e, transparent 26%);
    color: color-mix(in srgb, #0f766e, var(--site-fg) 20%);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .signalPanel {
    position: absolute;
    right: 0;
    bottom: 5.6rem;
    width: min(48%, 15.5rem);
    padding: 1rem;
    transform: rotate(2.5deg);
  }

  .signalLabel {
    display: block;
    font-size: 0.82rem;
    color: var(--site-muted);
  }

  .signalTrack {
    position: relative;
    height: 6.6rem;
    margin-top: 1rem;
    border: 1px solid color-mix(in srgb, var(--site-line), transparent 20%);
    background:
      linear-gradient(
        90deg,
        transparent 49%,
        color-mix(in srgb, var(--site-line), transparent 20%) 49% 51%,
        transparent 51%
      ),
      linear-gradient(
        0deg,
        transparent 49%,
        color-mix(in srgb, var(--site-line), transparent 20%) 49% 51%,
        transparent 51%
      );
  }

  .signalDot {
    position: absolute;
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    border: 1px solid var(--site-panel);
    border-radius: 999px;
    background: #f97316;
    box-shadow: 0 0 0 5px color-mix(in srgb, #f97316, transparent 84%);
  }

  .signalDot:nth-child(1) {
    top: 22%;
    left: 22%;
  }

  .signalDot:nth-child(2) {
    top: 50%;
    left: 58%;
    background: #0f766e;
    box-shadow: 0 0 0 5px color-mix(in srgb, #0f766e, transparent 84%);
  }

  .signalDot:nth-child(3) {
    right: 18%;
    bottom: 18%;
    background: var(--site-fg);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--site-fg), transparent 86%);
  }

  .signalRows {
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .signalRows span:nth-child(1) {
    width: 80%;
  }

  .signalRows span:nth-child(2) {
    width: 54%;
  }

  .signalRows span:nth-child(3) {
    width: 68%;
  }

  .indexCard {
    position: absolute;
    right: 2rem;
    bottom: 0.6rem;
    width: min(54%, 17rem);
    padding: 1rem;
    transform: rotate(-1.5deg);
  }

  .indexNumber {
    display: block;
    color: color-mix(in srgb, #f97316, var(--site-fg) 22%);
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
  }

  .indexText {
    display: block;
    margin-top: 0.45rem;
    color: var(--site-muted);
    font-size: 0.88rem;
  }

  .cornerDial {
    position: absolute;
    top: 0;
    right: 1.25rem;
    display: grid;
    width: 6rem;
    height: 6rem;
    place-items: center;
    border-radius: 999px;
  }

  .cornerDial::before {
    position: absolute;
    inset: 0.85rem;
    border: 1px dashed color-mix(in srgb, var(--site-muted), transparent 34%);
    border-radius: inherit;
    content: "";
  }

  .dialNeedle {
    width: 1px;
    height: 2.25rem;
    background: color-mix(in srgb, #0f766e, var(--site-fg) 20%);
    transform-origin: center bottom;
  }

  .dialLabel {
    position: absolute;
    bottom: 1rem;
    font-size: 0.68rem;
    color: var(--site-muted);
  }

  @media (max-width: 640px) {
    .visual {
      min-height: 13.75rem;
    }

    .visual::before {
      inset: 0.35rem 0.2rem 0 0.2rem;
    }

    .manuscript {
      top: 1.1rem;
      left: 0.6rem;
      width: 74%;
      min-height: 11.8rem;
      padding: 0.8rem;
    }

    .signalPanel {
      right: 0.2rem;
      bottom: 2.25rem;
      width: 51%;
      padding: 0.72rem;
    }

    .indexCard {
      right: 0.8rem;
      bottom: 0.1rem;
      width: 58%;
      padding: 0.72rem;
    }

    .cornerDial {
      right: 0.5rem;
      width: 4.2rem;
      height: 4.2rem;
    }

    .manuscriptHeader,
    .signalLabel,
    .indexText {
      font-size: 0.68rem;
    }

    .titleBlock {
      gap: 0.45rem;
      margin-top: 0.9rem;
    }

    .titleRule {
      height: 0.52rem;
    }

    .copyLines {
      gap: 0.45rem;
      margin-top: 1.25rem;
    }

    .annotation {
      right: 0.8rem;
      bottom: 0.75rem;
      left: 0.8rem;
    }

    .annotationMark {
      width: 1.55rem;
      height: 1.55rem;
      font-size: 0.65rem;
    }

    .signalTrack {
      height: 4.45rem;
      margin-top: 0.65rem;
    }

    .signalRows {
      gap: 0.36rem;
      margin-top: 0.65rem;
    }

    .indexNumber {
      font-size: 1.25rem;
    }
  }
}
</style>
