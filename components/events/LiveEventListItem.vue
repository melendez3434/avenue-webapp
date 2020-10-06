<template>
  <nuxt-link
    :to="{ name: 'event-slug', params: { slug: event.id } }"
    class="w-full bg-theavenue-white text-theavenue-black flex items-center justify-center relative font-league-gothic py-2"
  >
    <p class="text-6xl uppercase">{{ event.name }}</p>
    <p class="text-6xl uppercase">{{ dateFormatted }}</p>
  </nuxt-link>
</template>
<script>
import { format } from 'date-fns'

export default {
  name: 'LiveEventListItem',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    dateFormatted() {
      return format(new Date(this.event.starts_at), 'EEEE, LLLL d / h:mm aa')
    },
  },
}
</script>
