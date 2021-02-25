<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <LogoLights class="w-full" />
    <el-collapse accordion class="grid grid-cols-1 gap-y-1 bg-theavenue-black w-full">
      <LiveEventListItem v-for="event in events" :key="event.id" :event="event" />
    </el-collapse>
    <EventsNoResults v-if="!events.length" />

    <div v-if="meta.total > meta.per_page" class="h-12 w-full">
      <client-only>
        <infinite-loading spinner="spiral" @infinite="fetchPage">
          <div slot="no-more" class="mt-4">Thats all!</div>
        </infinite-loading>
      </client-only>
    </div>

    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="talent-event-modal"
      scrollable
      height="auto"
    >
      <IcClose class="cursor-pointer absolute top-4 right-4" @click="close" />
      <CompetitionModalAnnouncement>
        Help charity organizations, engage your audience and win the price!
        <template v-slot:link>
          <nuxt-link
            :to="{ name: 'events-talents' }"
            class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
          >
            Learn More
          </nuxt-link>
        </template>
      </CompetitionModalAnnouncement>
    </modal>
    <modal
      width="100%"
      classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
      name="user-event-modal"
      scrollable
      height="auto"
    >
      <IcClose class="cursor-pointer absolute top-4 right-4" @click="close" />
      <CompetitionModalAnnouncement>
        Engage in the competition by helping your favorite chefs win the price while they donate to
        charity organizations
        <template v-slot:link>
          <nuxt-link
            :to="{ name: 'events' }"
            class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
          >
            Learn More
          </nuxt-link>
        </template>
      </CompetitionModalAnnouncement>
    </modal>
  </div>
</template>

<script>
import spacetime from 'spacetime'
import LiveEventListItem from '@/components/events/LiveEventListItem'
import LogoLights from '@/components/commons/LogoLights'
import CompetitionModalAnnouncement from '@/components/competitions/CompetitionModalAnnouncement'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'IndexPage',

  auth: false,

  components: {
    LiveEventListItem,
    LogoLights,
    CompetitionModalAnnouncement,
    IcClose,
  },

  async asyncData({ $api }) {
    try {
      const { data: events, meta } = await $api.events.list({ page: 0 })
      return { events, meta }
    } catch (error) {
      console.warn(error)
      return { events: [], meta: {} }
    }
  },

  data() {
    return {
      maxModalShow: 4,
    }
  },

  computed: {
    isSuitableTalent() {
      return (
        this.$auth.loggedIn &&
        this.$auth.user.talent_id &&
        localStorage.modalCounter < this.maxModalShow
      )
    },
  },

  watch: {
    async '$route.query.category'(category) {
      const { data: events, meta } = await this.$api.events.list({ page: 0, category })
      this.events = events
      this.meta = meta
    },
  },

  mounted() {
    this.$echo
      .channel('theavenue')
      .listen('EventUpdated', ({ event, type }) => {
        this.handleSocketEvent(event, type)
      })
      .listen('EventFinished', ({ event }) => {
        this.handleSocketEvent(event, 'updated')
      })
      .listen('EventIsEndedNow', ({ event }) => {
        this.handleSocketEvent(event, 'deleted')
      })
      .listen('TalentIsLiveNow', ({ event }) => {
        event.is_live = true
        this.handleSocketEvent(event, 'updated')
      })

    if (localStorage.modalCounter) {
      this.modalCounter = localStorage.modalCounter
    } else {
      localStorage.modalCounter = 1
    }

    if (this.isSuitableTalent) {
      this.$modal.show('talent-event-modal')
      localStorage.modalCounter++
    } else {
      if (localStorage.modalCounter < this.maxModalShow) {
        this.$modal.show('user-event-modal')
        localStorage.modalCounter++
      }
    }
  },

  beforeDestroy() {
    this.$echo
      .channel('theavenue')
      .stopListening('EventUpdated')
      .stopListening('EventFinished')
      .stopListening('EventIsEndedNow')
  },

  methods: {
    async fetchPage($state) {
      const page = this.meta.current_page + 1

      if (page > this.meta.last_page) {
        return $state.complete()
      }

      try {
        const { data: events, meta } = await this.$api.events.list({ page })
        this.events = [...this.events, ...events]
        this.meta = meta
        $state.loaded()
      } catch (e) {
        this.$router.push({ name: 'index' })
      }
    },

    handleSocketEvent(event, type) {
      const addEventToList = event => {
        // If there is an event on the list that begins after upcomin event on the list then add it to that position
        const eventStart = spacetime(event.starts_at)
        const indexFrom = this.events.findIndex(e => eventStart.isBefore(spacetime(e.starts_at)))

        if (indexFrom < 0) return

        this.events.splice(indexFrom, 0, event)
      }
      const map = {
        created: () => {
          addEventToList(event)
        },
        updated: () => {
          const index = this.events.findIndex(e => event.id === e.id)

          // If event is in the list then update it
          if (index >= 0) {
            this.$set(this.events, index, event)
            return
          }

          addEventToList(event)
        },
        deleted: () => {
          const index = this.events.findIndex(e => event.id === e.id)
          this.events.splice(index, 1)
        },
      }

      return map[type]()
    },

    close() {
      this.$modal.hide('talent-event-modal')
      this.$modal.hide('user-event-modal')
    },
  },
}
</script>
