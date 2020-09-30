<template>
  <div class="container mx-auto pb-12">
    <div class="flex flex-col space-y-4 mt-8">
      <EventListItem v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="mt-12 w-full max-w-sm mx-auto">
      <ul class="flex items-center justify-between w-full">
        <li
          :class="{
            'text-avenue-grey': !links.prev,
            'text-avenue-white-light cursor-pointer': links.prev,
          }"
          @click="prev"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </li>
        <li
          :class="{
            'text-avenue-grey': !links.next,
            'text-avenue-white-light cursor-pointer': links.next,
          }"
          @click="next"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </li>
      </ul>
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

  methods: {
    async prev() {
      if (!this.links.prev) return
      this.fetchPage(this.meta.current_page - 1)
    },

    async next() {
      if (!this.links.next) return
      this.fetchPage(this.meta.current_page + 1)
    },

    async fetchPage(page) {
      const { data: events, links, meta } = await this.$api.events.list({ page })

      this.events = events
      this.links = links
      this.meta = meta
    },
  },
}
</script>
