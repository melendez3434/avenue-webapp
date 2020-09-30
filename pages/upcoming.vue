<template>
  <div class="container mx-auto">
    <h1 class="text-2xl text-avenue-white-light">Upcoming</h1>

    <div class="flex flex-col space-y-4 mt-8">
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>
<script>
import EventListItem from '@/components/events/EventListItem'

export default {
  name: 'Upcoming',

  auth: false,

  components: {
    EventListItem,
  },

  async asyncData({ $api }) {
    const { data: events, links, meta } = await $api.events.list()
    console.log('data', events)
    console.log('links', links)
    console.log('meta', meta)
    return { events, links, meta }
  },
}
</script>
