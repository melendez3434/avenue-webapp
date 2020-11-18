<template>
  <VideoLayout :event="event">
    <EventVideo :playback-id="event.talent.playback_id" />
    <template #placeholder>
      <div
        class="w-full h-full flex items-start pt-20 md:pt-0 md:items-center justify-center text-center"
      >
        Streaming is not live yet or it is idle. When its live you'll watch it here.
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
      return { event }
    } catch (e) {
      redirect('/')
    }
  },

  computed: {
    startTimeZoneDate() {
      return spacetime(this.event.starts_at, 'UTC').goto(this.userTimezone)
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

    dateFormatted() {
      return this.startTimeZoneDate.format(
        '{month-short} {date-pad}, {year} at {hour}:{minute-pad}{ampm}'
      )
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
