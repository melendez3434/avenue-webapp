<template>
  <div
    class="w-full rounded bg-avenue-black-light text-avenue-white-light px-4 py-2 flex justify-between"
  >
    <div class="flex items-center">
      <img :src="artist.photo" :alt="`${artist.name} photo`" class="w-16 rounded-full" />
      <span class="ml-6">{{ artist.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistListItem',

  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
}
</script>
