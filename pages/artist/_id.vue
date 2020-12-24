<template>
  <article class="available-min-height">
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

  methods: {
    async fetchUpcomingEvents(pageNumber) {
      this.upcomingEvents.meta.current_page = pageNumber

      try {
        const { data: upcomingEvents, meta } = await this.$api.events.list({
          talent: this.$route.params.id,
          upcoming: true,
          page: this.upcomingEvents.meta.current_page,
        })
        this.upcomingEvents.list = upcomingEvents
        this.upcomingEvents.meta = meta
      } catch {
        console.log("We couldn't fetch this events")
      }
    },

    async fetchPastEvents(pageNumber) {
      this.pastEvents.meta.current_page = pageNumber

      try {
        const { data: pastEvents, meta } = await this.$api.events.list({
          talent: this.$route.params.id,
          past: true,
          page: this.pastEvents.meta.current_page,
        })
        this.pastEvents.list = pastEvents
        this.pastEvents.meta = meta
      } catch {
        console.log("We couldn't fetch this events")
      }
    },
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
