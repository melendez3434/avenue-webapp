<template>
  <nuxt-link
    :to="{ name: 'event-slug', params: { slug: event.id } }"
    class="w-full bg-no-repeat h-86 bg-gray-800 bg-cover flex items-center justify-center relative"
    :style="{ backgroundImage: `url(${event.talent.cover_photo})` }"
  >
    <div class="absolute top-0 left-0 ml-4 mt-1 text-avenue-red flex items-center z-10">
      <IcLive />
    </div>
    <div class="w-full h-full absolute top-0 left-0" style="background: rgba(0,0,0,0.3)" />
    <svg
      class="text-avenue-black-light"
      width="124"
      height="124"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 12.3301L9 16.6603L9 8L15 12.3301Z" fill="currentColor" />
    </svg>
  </nuxt-link>
</template>
<script>
import IcLive from '@/assets/svg/live.svg?inline'

export default {
  name: 'LiveEventListItem',

  components: {
    IcLive,
  },

  props: {
    event: {
      type: Object,
      required: true,
    },
  },
}
</script>
