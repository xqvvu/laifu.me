<template>
  <span :class="$style.logo" aria-hidden="true">
    <svg
      :class="$style.svg"
      :viewBox="siteLogoViewBox"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :class="$style.signature" :pathLength="siteLogoPathLength" :d="siteLogoPath" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { siteLogoPath, siteLogoPathLength, siteLogoViewBox } from "~/utils/site-logo";
</script>

<style module>
.logo {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  color: var(--site-fg);
}

.svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.signature {
  stroke: currentColor;
  stroke-dasharray: 128;
  stroke-dashoffset: 0;
  stroke-linecap: butt;
  stroke-linejoin: round;
  stroke-width: 2.7;
  transform-origin: 50%;
  animation: site-logo-loop 10s ease-in-out infinite both;
}

:global(a:hover) .signature,
:global(a:focus-visible) .signature {
  animation-duration: 4.5s;
}

@keyframes site-logo-loop {
  0%,
  8% {
    opacity: 0;
    stroke-dashoffset: 128;
  }

  12% {
    opacity: 1;
    stroke-dashoffset: 118;
  }

  28%,
  88% {
    opacity: 1;
    stroke-dashoffset: 0;
  }

  96% {
    opacity: 0;
    stroke-dashoffset: 0;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 128;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature,
  :global(a:hover) .signature,
  :global(a:focus-visible) .signature {
    animation: none;
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
