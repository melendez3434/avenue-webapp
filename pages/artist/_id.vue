<template>
  <article>
    <TalentProfile :talent="talent" page />
    <TalentEvents :talent="talent" :events="upcomingEvents" />
    <TalentEvents :talent="talent" :events="futureEvents" />
  </article>
</template>

<script>
export default {
  auth: false,

  name: 'ArtistPage',

  async asyncData({ $api, params, error }) {
    try {
      const { data: talent } = await $api.talent.get(params.id)
      const { data: upcomingEvents, meta } = await $api.events.list({
        talent: params.id,
        upcoming: true,
        page: 0,
      })
      console.log(meta)
      return { talent, upcomingEvents }
    } catch {
      error("We couldn't find this artist or events")
    }
  },

  async fetchPage({ $api, params, error }) {
    const page = this.meta.current_page + 1

    try {
      const { data: upcomingEvents, meta } = await this.$api.events.list({
        talent: params.id,
        upcoming: true,
        page,
      })
      this.upcomingEvents = upcomingEvents
      this.meta = meta
    } catch {
      error("We couldn't fetch this events")
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
