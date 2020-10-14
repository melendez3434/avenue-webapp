<template>
  <div class="flex items-center">
    <img
      :src="artist.photo"
      :alt="`${artist.name} photo`"
      class="rounded-full"
      :class="{ 'w-16 h-16': !isSmallSize, 'w-10 h-10': isSmallSize }"
    />
    <div class="ml-5">
      <p
        class="font-sans font-bold leading-6"
        :class="{ 'text-lg': isSmallSize, 'text-2xl': !isSmallSize }"
      >
        {{ artist.name }}
      </p>
      <p class="font-sans" :class="{ 'text-lg': !isSmallSize }">{{ artist.artist_type }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistAvatar',

  props: {
    artist: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'base',
    },
  },

  computed: {
    isSmallSize() {
      return this.size === 'sm'
    },
  },
}
</script>
