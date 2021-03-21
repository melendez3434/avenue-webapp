<template>
  <section>
    <VideoLayout :event="event">
      <EventVideo
        :key="activePlaybackId"
        :playback-id="activePlaybackId"
        :offline="isFinished"
        :assets="event.assets"
        @selected-asset="selectedAsset = $event"
      />
      <template #placeholder>
        <div
          class="w-full h-screen flex flex-col md:items-center justify-center bg-no-repeat bg-cover bg-center pt-20 md:pt-0 text-center font-league-gothic uppercase text-2xl tracking-wide"
          :style="{
            backgroundImage: `linear-gradient(
			      rgba(0, 0, 0, 0.85),
			      rgba(0, 0, 0, 0.9)
		        ),url(${event.talent.cover_photo})`,
          }"
        >
          <p>{{ event.talent.name }}'s stream is not live yet or it is idle.</p>
          <p>When it's live you'll see it here.</p>
        </div>
      </template>
    </VideoLayout>
    <OtherLiveEvents v-if="showOtherEvents" :events="otherLiveEvents" @close="closeModal" />
  </section>
</template>
<script>
import spacetime from 'spacetime'
import VideoLayout from '@/components/commons/ui/VideoLayout'
import EventVideo from '@/components/events/EventVideo'

export default {
  name: 'EventPage',

  auth: false,

  components: { VideoLayout, EventVideo },

  async asyncData({ $api, redirect, params, $auth }) {
    if (!params.slug) redirect('/')

    try {
      if ($auth.loggedIn) {
        await $api.events.view(params.slug)
      }
      const { data: event } = await $api.events.get(params.slug)
      const selectedAsset = event.assets.length ? event.assets[0].playback_id : ''
      return { event, selectedAsset }
    } catch (e) {
      redirect('/')
    }
  },

  data() {
    return {
      showModal: false,
      otherEvents: [],
    }
  },

  computed: {
    isFinished() {
      return this.event.is_finished
    },

    showOtherEvents() {
      return this.showModal && this.otherLiveEvents.length > 0
    },

    otherLiveEvents() {
      return this.otherEvents.slice(0, 4).filter(event => event.id != this.event.id)
    },

    activePlaybackId() {
      if (!this.isFinished) {
        return this.event.talent.playback_id
      }

      return this.selectedAsset
    },

    eventStartTimeZoneDate() {
      return spacetime(this.event.starts_at, 'UTC')
        .goto(this.event.timezone)
        .format('{month-short} {date-pad}, {year} at {hour}:{minute-pad}{ampm}')
    },

    timezoneFormatted() {
      const [, city] = this.event.timezone.split('/')
      return city.replace('_', ' ')
    },
  },

  mounted() {
    this.$echo.channel(`event.${this.event.id}`).listen('EventIsEndedNow', () => {
      this.fetchOtherLiveEvents()
    })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event.id}`).stopListening('EventIsEndedNow')
  },

  methods: {
    closeModal() {
      return (this.showModal = false)
    },

    async fetchOtherLiveEvents() {
      try {
        const { data: otherEvents } = await this.$api.events.list({ suggestions: true })
        this.otherEvents = otherEvents
        this.showModal = true
      } catch {
        console.error("Couldn't fetch other live events")
      }
    },
  },

  head() {
    const title = `${this.event.talent.name}, performing live on ${this.eventStartTimeZoneDate} (${this.timezoneFormatted}) on The Avenue`
    const meta = [
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
    ]

    if (this.event.talent.biography) {
      meta.push({
        hid: 'og:description',
        name: 'og:description',
        content: this.event.talent.biography,
      })
      meta.push({ hid: 'description', name: 'description', content: this.event.talent.biography })
    }
    if (this.event.talent.cover_photo) {
      meta.push({
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content: this.event.talent.cover_photo,
      })
      meta.push({ hid: 'og:image', name: 'og:image', content: this.event.talent.cover_photo })
    }

    return {
      title,
      meta,
    }
  },
}
</script>
