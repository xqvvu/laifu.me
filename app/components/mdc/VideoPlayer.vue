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
  <figure class="mdc-video-player">
    <div class="mdc-video-player__frame">
      <video
        class="mdc-video-player__media"
        :src="src"
        :poster="poster"
        :title="title"
        :aria-label="label"
        :preload="preload"
        :controls="controls"
        :autoplay="autoplay"
        :muted="muted"
        :loop="loop"
        playsinline
      >
        <a :href="src">Open video</a>
      </video>
    </div>

    <figcaption v-if="caption || $slots.default" class="mdc-video-player__caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<style scoped>
.mdc-video-player {
  margin: 2rem 0;
}

.mdc-video-player__frame {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--site-line);
  border-radius: 8px;
  background: #000000;
}

.mdc-video-player__media {
  display: block;
  width: 100%;
  height: 100%;
  background: #000000;
  object-fit: contain;
}

.mdc-video-player__caption {
  margin-top: 0.625rem;
  color: var(--site-muted);
  font-size: 0.875rem;
  line-height: 1.6;
  text-align: center;
}
</style>
