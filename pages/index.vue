<template>
  <div class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white pb-12">
    <div class="container mx-auto">
      <div class="mb-5 mt-8">
        <ul class="flex space-x-5">
          <nuxt-link
            as="li"
            :to="{ name: 'index' }"
            class="uppercase"
            :class="{
              'text-avenue-grey': $route.query.venue,
              'text-avenue-white-light': !$route.query.venue,
            }"
          >
            All
          </nuxt-link>
          <nuxt-link
            v-for="venue in venues"
            :key="venue.id"
            as="li"
            :to="{ name: 'index', query: { venue: venue.id } }"
            class="uppercase"
            :class="{
              'text-avenue-grey': $route.query.venue !== venue.id,
              'text-avenue-white-light': $route.query.venue === venue.id,
            }"
          >
            {{ venue.name }}
          </nuxt-link>
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

  async fetch() {
    await this.fetchPage()
  },

  data() {
    return {
      events: [],
      meta: {},
      links: {},
    }
  },

  computed: {
    ...mapState({
      venues: state => state.global.venues,
    }),
  },

  watch: {
    async '$route.query.venue'(venueId) {
      this.fetchPage(null, venueId)
    },
  },

  methods: {
    async fetchPage(page = null, venueId = null) {
      const params = { live: true }
      params.page = page ? page : this.meta.current_page
      params.venue = venueId ? venueId : this.$route.query.venue

      try {
        const { data: events, links, meta } = await this.$api.events.list(params)
        this.events = events
        this.links = links
        this.meta = meta
      } catch (e) {
        this.$router.push({ name: 'index' })
      }
    },
  },
}
</script>
<style>
.h-content {
  height: calc(100vh - 68.89px);
}
</style>
