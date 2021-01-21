<template>
  <section class="bg-avenue-blue-light p-6 h-72 relative">
    <IcClose aria-role="button" aria-label="close" class="absolute top-4 right-4" />
    <header>
      <h2 class="text-2xl mb-3">Stay Tuned!</h2>
      <p>This streaming is about to end but these events are live now</p>
    </header>
    <ul v-for="event in events" :key="event.id">
      <li class="h-3/6 w-40 flex flex-col justify-center items-center">
        <EventThumbnail :event="event" />
        <span>{{ event.talent.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  components: { IcClose },

  props: {
    events: {
      type: Array,
      default: null,
    },
  },
}
</script>
