<script setup lang="ts">
import { siteLogoPath, siteLogoPathLength, siteLogoViewBox } from "~/utils/site-logo";
</script>

<template>
  <span class="logo" aria-hidden="true">
    <svg
      class="logo__svg"
      :viewBox="siteLogoViewBox"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path class="logo__path" :pathLength="siteLogoPathLength" :d="siteLogoPath" />
    </svg>
  </span>
</template>

<style scoped>
.logo {
  display: grid;
  place-items: center;
  color: var(--ink);
}

.logo__svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/*
 * The signature draws itself in once when the page loads, then stays put.
 * A looping version of this was tried first and rejected: it spent part of
 * every cycle invisible, so the mark periodically vanished from the header.
 *
 * `stroke-dasharray` has to match `siteLogoPathLength` for the reveal to
 * cover the whole path.
 */
.logo__path {
  stroke: currentColor;
  stroke-dasharray: 128;
  stroke-linecap: butt;
  stroke-linejoin: round;
  stroke-width: 2.7;
  animation: logo-draw 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes logo-draw {
  from {
    stroke-dashoffset: 128;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo__path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
