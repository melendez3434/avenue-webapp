<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <Hero @scroll="watchNow" />
    <div v-if="$fetchState.pending">
      <content-placeholders class=" w-full ">
        <content-placeholders-img
          v-for="(line, index) in 6"
          :key="index"
          class="my-1 h-12 md:h-10 w-full"
        />
      </content-placeholders>
    </div>
    <div v-else ref="events">
      <el-collapse accordion class="grid grid-cols-1 gap-y-1 bg-theavenue-black w-full">
        <CompetitionMarqueeItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
        <EventListItem
          v-for="event in events"
          :key="event.id"
          :event="event"
          @ticketPurchased="refetchEvents"
        />
      </el-collapse>
      <EventNoResults v-if="!events.length" />
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
        <CompetitionModalAnnouncement @close="closeModal('talent-event-modal')">
          Help charity organizations, engage your audience and win the prize!
        </CompetitionModalAnnouncement>
      </modal>
      <modal
        width="100%"
        classes="max-w-md md:max-w-2xl inset-x-0 m-auto"
        name="user-event-modal"
        scrollable
        height="auto"
      >
        <CompetitionModalAnnouncement @close="closeModal('user-event-modal')">
          Support your favorite performers as they compete for weekly and overall prizes
        </CompetitionModalAnnouncement>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import spacetime from 'spacetime'
export default {
  name: 'IndexPage',

  auth: false,

  data() {
    return {
      maxModalShow: 4,
      events: [],
      meta: {},
    }
  },

  async fetch() {
    try {
      const { data: events, meta } = await this.$api.events.list({ page: 0 })
      this.events = events
      this.meta = meta
    } catch (error) {
      console.warn(error)
    }
  },

  computed: {
    ...mapState({
      competitions: state => state.global.competitions,
    }),
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
      await this.refetchEvents(category)
    },
    async '$auth.loggedIn'() {
      await this.refetchEvents()
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
      .listen('EventHasEnded', ({ event }) => {
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
      .stopListening('EventHasEnded')
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
    async refetchEvents(category = null) {
      const { data: events, meta } = await this.$api.events.list({ page: 0, category })
      this.events = events
      this.meta = meta
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
    closeModal(modal) {
      return this.$modal.hide(modal)
    },
    watchNow() {
      this.$refs.events.scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>
