<template>
  <div class="container mx-auto pb-12">
    <div class="mb-5 mt-8">
      <ul class="flex space-x-5">
        <nuxt-link
          as="li"
          :to="{ name: 'upcoming' }"
          class="uppercase"
          :class="{
            'text-avenue-grey': $route.query.venue,
            'text-avenue-white-light': !$route.query.venue,
          }"
        >
          All
        </nuxt-link>
        <!-- <nuxt-link
          v-for="venue in venues"
          :key="venue.id"
          as="li"
          :to="{ name: 'upcoming', query: { venue: venue.id } }"
          class="uppercase"
          :class="{
            'text-avenue-grey': $route.query.venue !== venue.id,
            'text-avenue-white-light': $route.query.venue === venue.id,
          }"
        >
          {{ venue.name }}
        </nuxt-link> -->
      </ul>
    </div>

    <div class="flex flex-col space-y-4 mt-8">
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
    </div>

    <Pagination :prev="!!links.prev" :next="!!links.next" @next="next" @prev="prev" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
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

  watch: {
    async '$route.query.venue'(venueId) {
      this.fetchPage(null, venueId)
    },
  },

  methods: {
    async fetchPage(page = null, venueId = null) {
      const params = {}
      params.page = page ? page : this.meta.current_page
      params.venue = venueId ? venueId : this.$route.query.venue

      try {
        const { data: events, links, meta } = await this.$api.events.list(params)
        this.events = events
        this.links = links
        this.meta = meta
      } catch (e) {
        this.$router.push({ name: 'upcoming' })
      }
    },
  },
}
</script>
