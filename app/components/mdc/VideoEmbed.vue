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
  <figure :class="$style.embed">
    <div :class="$style.frame">
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
        :class="$style.media"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        :src="embedSrc"
        :title="label"
      />

      <button
        v-else
        :aria-label="`Load ${label}`"
        :class="$style.placeholder"
        type="button"
        @click="loadEmbed"
      >
        <img v-if="posterSrc" :alt="label" :class="$style.poster" loading="lazy" :src="posterSrc" />
        <span aria-hidden="true" :class="$style.shade" />
        <span aria-hidden="true" :class="$style.play">
          <UIcon name="i-lucide-play" />
        </span>
        <span :class="$style.meta">
          <span :class="$style.provider">{{ providerName }}</span>
          <span :class="$style.title">{{ label }}</span>
        </span>
      </button>
    </div>

    <figcaption v-if="caption || $slots.default" :class="$style.caption">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<style module>
@layer components {
  .embed {
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

  .media,
  .placeholder {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    border: 0;
  }

  .placeholder {
    position: relative;
    padding: 0;
    color: #ffffff;
    cursor: pointer;
  }

  .poster {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
    object-fit: cover;
  }

  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgb(0 0 0 / 0.12), rgb(0 0 0 / 0.68));
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    width: 4rem;
    height: 4rem;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.7);
    border-radius: 999px;
    background: rgb(0 0 0 / 0.58);
    font-size: 1.75rem;
    transform: translate(-50%, -50%);
    transition:
      background-color 160ms ease,
      transform 160ms ease;
  }

  .placeholder:hover .play {
    background: rgb(255 255 255 / 0.18);
    transform: translate(-50%, -50%) scale(1.04);
  }

  .meta {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    display: grid;
    gap: 0.25rem;
    text-align: left;
  }

  .provider {
    color: rgb(255 255 255 / 0.72);
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
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
