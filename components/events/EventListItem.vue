<template>
  <div
    class="w-full rounded bg-avenue-black-light text-avenue-white-light px-4 py-2 flex justify-between"
  >
    <div class="flex items-center">
      <img
        :src="event.talent.photo"
        :alt="`${event.talent.name} photo`"
        class="w-16 rounded-full"
      />
      <span class="ml-6">{{ event.name }}</span>
    </div>
    <div class="flex flex-col items-center justify-center">{{ dateFormatted }}</div>
  </div>
</template>
<script>
import { format } from 'date-fns'

export default {
  name: 'EventListItem',

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
