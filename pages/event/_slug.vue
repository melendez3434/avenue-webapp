<template>
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
        class="w-full h-full flex flex-col bg-no-repeat bg-gray-900 bg-cover pt-20 md:pt-0 md:items-center justify-center text-center font-league-gothic uppercase text-2xl tracking-wide"
        :style="{
          backgroundImage: `linear-gradient(
			rgba(0, 0, 0, 0.8),
			rgba(0, 0, 0, 0.9)
		),url(${event.talent.cover_photo})`,
        }"
      >
        <p>{{ event.talent.name }}'s streaming is not live yet or it is idle.</p>
        <p>When its live you'll see it here.</p>
      </div>
    </template>
  </VideoLayout>
</template>
<script>
import spacetime from 'spacetime'
import VideoLayout from '@/components/commons/ui/VideoLayout'
import EventVideo from '@/components/events/EventVideo'

export default {
  name: 'EventPage',

  auth: false,

  components: { VideoLayout, EventVideo },

  async asyncData({ $api, redirect, params }) {
    if (!params.slug) redirect('/')

    try {
      const { data: event } = await $api.events.get(params.slug)
      const selectedAsset = event.assets.length ? event.assets[0].playback_id : ''

      return { event, selectedAsset }
    } catch (e) {
      redirect('/')
    }
  },

  computed: {
    isFinished() {
      return this.event.is_finished
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
