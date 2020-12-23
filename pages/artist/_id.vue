<template>
  <article>
    <TalentProfile :talent="talent" page />
    <TalentEvents :talent="talent" :events="events" @update:page="updatePage" />
  </article>
</template>

<script>
export default {
  auth: false,

  name: 'ArtistPage',

  async asyncData({ $api, params, error }) {
    try {
      const { data: talent } = await $api.talent.get(params.id)
      const { data: events } = await $api.events.list({ talent: params.id })
      return { talent, events }
    } catch {
      error("We couldn't find this artist or events")
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
