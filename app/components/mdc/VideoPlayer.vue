<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    poster?: string;
    title?: string;
    caption?: string;
    preload?: "none" | "metadata" | "auto";
    controls?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
  }>(),
  {
    poster: undefined,
    title: undefined,
    caption: undefined,
    preload: "metadata",
    controls: true,
    autoplay: false,
    muted: false,
    loop: false,
  },
);

const label = computed(() => props.title || props.caption || "Video");
</script>

<template>
  <figure :class="$style.player">
    <div :class="$style.frame">
      <video
        :aria-label="label"
        :autoplay="autoplay"
        :class="$style.media"
        :controls="controls"
        :loop="loop"
        :muted="muted"
        playsinline
        :poster="poster"
        :preload="preload"
        :src="src"
        :title="title"
      >
        <a :href="src">Open video</a>
      </video>
    </div>

    <figcaption v-if="caption || $slots.default" :class="$style.caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<style module>
@layer components {
  .player {
    max-width: 100%;
    margin: 2rem 0;
  }

  .frame {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    background: #000000;
  }

  .media {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    background: #000000;
    object-fit: contain;
  }

  .caption {
    margin-top: 0.625rem;
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    text-align: center;
  }
}
</style>
