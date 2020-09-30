<template>
  <div class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white pb-12">
    <!-- <div class="w-full flex h-full flex-1 h-content">
      <div id="twitch-streaming" class="flex-1" style="height: 85%" />
      <div
        class="w-full bg-avenue-black flex flex-col space-y-4 text-avenue-white-light px-8 py-4 overflow-y-scroll"
      >
        <div v-for="comment in Array(10).keys()" :key="comment" class="flex space-x-5">
          <div>
            <div class="w-10 h-10 bg-avenue-white rounded-full" />
          </div>
          <div class="bg-avenue-black-light rounded py-1 px-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipscing elit. Id vivamus
          </div>
        </div>
      </div>
    </div> -->
    <div class="container mx-auto">
      <div class="mt-8 grid grid-cols-2 gap-6">
        <LiveEventListItem v-for="event in events" :key="event.id" :event="event" />
      </div>

      <Pagination :prev="!!links.prev" :next="!!links.next" @next="next" @prev="prev" />
    </div>
  </div>
</template>

<script>
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
