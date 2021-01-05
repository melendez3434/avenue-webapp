<template>
  <article class="available-min-height">
    <TalentProfile :talent="talent" page />
    <TalentEvents
      :talent="talent"
      :events="upcomingEvents.list"
      :meta="upcomingEvents.meta"
      is-future
      @page:previous="fetchEvents(upcomingEvents.meta.current_page - 1, upcomingEvents, true)"
      @page:next="fetchEvents(upcomingEvents.meta.current_page + 1, upcomingEvents, true)"
    />
    <TalentEvents
      :talent="talent"
      :events="pastEvents.list"
      :meta="pastEvents.meta"
      @page:previous="fetchEvents(pastEvents.meta.current_page - 1, pastEvents, false)"
      @page:next="fetchEvents(pastEvents.meta.current_page + 1, pastEvents, false)"
    />
  </article>
</template>

<script>
export default {
  auth: false,

  name: 'ArtistPage',

  async asyncData({ $api, params, error }) {
    try {
      const { data: talent } = await $api.talent.get(params.id)
      const { data: upcomingEventsList, meta: upcomingEventsMeta } = await $api.events.list({
        talent: params.id,
        upcoming: true,
        page: 0,
      })

      const { data: pastEventsList, meta: pastEventsMeta } = await $api.events.list({
        talent: params.id,
        past: true,
        page: 0,
      })

      const pastEvents = { list: pastEventsList, meta: pastEventsMeta }
      const upcomingEvents = { list: upcomingEventsList, meta: upcomingEventsMeta }

      return { talent, pastEvents, upcomingEvents }
    } catch {
      error("We couldn't find this artist or events")
    }
  },

  async fetchEvents(pageNumber, events, isFuture) {
    events.meta.current_page = pageNumber

    try {
      const { data: events, meta } = await this.$api.events.list({
        talent: this.$route.params.id,
        past: true,
        page: events.meta.current_page,
      })
      if (isFuture) {
        this.upcomingEvents.list = events
        this.upcomingEvents.meta = meta
      } else {
        this.pastEvents.list = events
        this.pastEvents.meta = meta
      }
    } catch {
      console.log("We couldn't fetch this events")
    }

  },

  head() {
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
