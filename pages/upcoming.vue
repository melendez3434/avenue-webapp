<template>
  <div class="container mx-auto pb-12">
    <div class="flex flex-col space-y-4 mt-8">
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
    </div>

    <Pagination :prev="!!links.prev" :next="!!links.next" @next="next" @prev="prev" />
  </div>
</template>
<script>
import hasPagination from '@/mixins/hasPagination'
import Pagination from '@/components/commons/ui/Pagination'
import EventListItem from '@/components/events/EventListItem'

export default {
  name: 'Upcoming',

  auth: false,

  components: {
    EventListItem,
    Pagination,
  },

  mixins: [hasPagination],

  async asyncData({ $api }) {
    const { data: events, links, meta } = await $api.events.list()
    return { events, links, meta }
  },

  methods: {
    async fetchPage(page) {
      const { data: events, links, meta } = await this.$api.events.list({ page })

      this.events = events
      this.links = links
      this.meta = meta
    },
  },
}
</script>
