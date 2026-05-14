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
        :aria-label="label"
        :autoplay="autoplay"
        class="mdc-video-player__media"
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

    <figcaption v-if="caption || $slots.default" class="mdc-video-player__caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>
