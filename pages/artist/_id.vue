<template>
  <div>
    <div v-if="$fetchState.pending" class="h-screen">
      <BaseSpinner class="transform translate-y-2/4" />
    </div>
    <section v-else class="available-min-height">
      <TalentProfile :talent="talent" page />
      <TalentEvents
        :talent="talent"
        :events="upcomingEvents.list"
        :meta="upcomingEvents.meta"
        is-future
        @page:previous="fetchUpcomingEvents(upcomingEvents.meta.current_page - 1)"
        @page:next="fetchUpcomingEvents(upcomingEvents.meta.current_page + 1)"
      />
      <TalentEvents
        :talent="talent"
        :events="pastEvents.list"
        :meta="pastEvents.meta"
        @page:previous="fetchPastEvents(pastEvents.meta.current_page - 1)"
        @page:next="fetchPastEvents(pastEvents.meta.current_page + 1)"
      />
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  name: 'ArtistPage',

  data() {
    return {
      talent: null,
      pastEvents: { list: null, meta: null },
      upcomingEvents: { list: null, meta: null },
    }
  },

  async fetch() {
    try {
      const { data: talent } = await this.$api.talent.get(this.$route.params.id)
      const { data: upcomingEventsList, meta: upcomingEventsMeta } = await this.$api.events.list({
        talent: this.$route.params.id,
        upcoming: true,
        page: 0,
      })
      const { data: pastEventsList, meta: pastEventsMeta } = await this.$api.events.list({
        talent: this.$route.params.id,
        past: true,
        page: 0,
      })
      this.pastEvents = { list: pastEventsList, meta: pastEventsMeta }
      this.upcomingEvents = { list: upcomingEventsList, meta: upcomingEventsMeta }
      this.talent = talent
    } catch {
      console.error("We couldn't find this artist or events")
      this.$router.push('/')
    }
  },

  async fetchPastEvents(pageNumber) {
    try {
      const { data: events, meta } = await this.$api.events.list({
        talent: this.$route.params.id,
        past: true,
        page: pageNumber,
      })
      this.pastEvents.list = events
      this.pastEvents.meta = meta
    } catch {
      console.error("We couldn't fetch this events")
    }
  },

  async fetchUpcomingEvents(pageNumber) {
    try {
      const { data: events, meta } = await this.$api.events.list({
        talent: this.$route.params.id,
        past: false,
        page: pageNumber,
      })
      this.upcomingEvents.list = events
      this.upcomingEvents.meta = meta
    } catch {
      console.error("We couldn't fetch this events")
    }
  },

  head() {
    if (!this.talent) return
    const title = `${this.talent.name}, performing on The Avenue`
    const meta = [
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'og:title', name: 'og:title', content: title },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
    ]
    if (this.talent.biography) {
      meta.push({
        hid: 'og:description',
        name: 'og:description',
        content: this.talent.biography,
      })
      meta.push({ hid: 'description', name: 'description', content: this.talent.biography })
    }
    if (this.talent.cover_photo) {
      meta.push({
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content: this.talent.cover_photo,
      })
      meta.push({ hid: 'og:image', name: 'og:image', content: this.talent.cover_photo })
    }
    return {
      title,
      meta,
    }
  },
}
</script>
