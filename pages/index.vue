<template>
  <div class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white pb-12">
    <div class="container mx-auto">
      <div class="mb-5 mt-8">
        <ul class="flex space-x-5">
          <li class="uppercase">All</li>
          <li v-for="genre in genres" :key="genre.id" class="uppercase">{{ genre.name }}</li>
        </ul>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-6">
        <LiveEventListItem v-for="event in events" :key="event.id" :event="event" />
      </div>

      <Pagination :prev="!!links.prev" :next="!!links.next" @next="next" @prev="prev" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import hasPagination from '@/mixins/hasPagination'
import Pagination from '@/components/commons/ui/Pagination'
import LiveEventListItem from '@/components/events/LiveEventListItem'

export default {
  name: 'IndexPage',

  auth: false,

  components: {
    LiveEventListItem,
    Pagination,
  },

  mixins: [hasPagination],

  async asyncData({ $api }) {
    const { data: events, links, meta } = await $api.events.list({ live: true })
    return { events, links, meta }
  },

  computed: {
    ...mapState({
      genres: state => state.global.genres,
    }),
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
<style>
.h-content {
  height: calc(100vh - 68.89px);
}
</style>
