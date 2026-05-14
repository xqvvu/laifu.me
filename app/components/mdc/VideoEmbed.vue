<script setup lang="ts">
type Provider = "youtube" | "vimeo" | "bilibili" | "iframe";

const props = withDefaults(
  defineProps<{
    provider?: Provider;
    id?: string;
    src?: string;
    title?: string;
    caption?: string;
    poster?: string;
    start?: number;
    loadOnClick?: boolean;
  }>(),
  {
    provider: "iframe",
    id: undefined,
    src: undefined,
    title: undefined,
    caption: undefined,
    poster: undefined,
    start: undefined,
    loadOnClick: true,
  },
);

const isLoaded = ref(!props.loadOnClick);

const providerName = computed(() => {
  const names: Record<Provider, string> = {
    youtube: "YouTube",
    vimeo: "Vimeo",
    bilibili: "Bilibili",
    iframe: "Embedded video",
  };

  return names[props.provider];
});

const embedSrc = computed(() => {
  if (props.src) {
    return props.src;
  }

  if (!props.id) {
    return "";
  }

  if (props.provider === "youtube") {
    const url = new URL(`https://www.youtube-nocookie.com/embed/${props.id}`);
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");

    if (props.start) {
      url.searchParams.set("start", props.start.toString());
    }

    if (isLoaded.value) {
      url.searchParams.set("autoplay", "1");
    }

    return url.toString();
  }

  if (props.provider === "vimeo") {
    const url = new URL(`https://player.vimeo.com/video/${props.id}`);
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");

    if (isLoaded.value) {
      url.searchParams.set("autoplay", "1");
    }

    return url.toString();
  }

  if (props.provider === "bilibili") {
    const url = new URL("https://player.bilibili.com/player.html");
    url.searchParams.set("bvid", props.id);
    url.searchParams.set("page", "1");
    url.searchParams.set("high_quality", "1");
    url.searchParams.set("autoplay", isLoaded.value ? "1" : "0");
    return url.toString();
  }

  return "";
});

const posterSrc = computed(() => {
  if (props.poster) {
    return props.poster;
  }

  if (props.provider === "youtube" && props.id) {
    return `https://i.ytimg.com/vi/${props.id}/hqdefault.jpg`;
  }

  return "";
});

const label = computed(() => props.title || `${providerName.value} video`);

function loadEmbed() {
  isLoaded.value = true;
}
</script>

<template>
  <figure class="mdc-video-embed">
    <div class="mdc-video-embed__frame">
      <iframe
        v-if="isLoaded && embedSrc"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share;
        "
        allowfullscreen
        class="mdc-video-embed__media"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        :src="embedSrc"
        :title="label"
      />

      <button
        v-else
        :aria-label="`Load ${label}`"
        class="mdc-video-embed__placeholder"
        type="button"
        @click="loadEmbed"
      >
        <img
          v-if="posterSrc"
          :alt="label"
          class="mdc-video-embed__poster"
          loading="lazy"
          :src="posterSrc"
        />
        <span aria-hidden="true" class="mdc-video-embed__shade" />
        <span aria-hidden="true" class="mdc-video-embed__play">
          <UIcon name="i-lucide-play" />
        </span>
        <span class="mdc-video-embed__meta">
          <span class="mdc-video-embed__provider">{{ providerName }}</span>
          <span class="mdc-video-embed__title">{{ label }}</span>
        </span>
      </button>
    </div>

    <figcaption v-if="caption || $slots.default" class="mdc-video-embed__caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>
