<template>
  <div>
    <div
      class="w-full bg-no-repeat h-112 bg-gray-800 bg-cover flex items-end relative"
      :style="{ backgroundImage: `url(${talent.cover_photo})` }"
    >
      <div class="dimmer-gradient w-full absolute top-0 left-0 h-full" />
      <div class="z-10 flex justify-between items-center w-full py-4 px-8">
        <TalentCard :talent="talent" class="ta-hidden md:flex" />
        <TalentSocialMedia :talent="talent" />
      </div>
    </div>

    <div class="container mx-auto flex space-x-6 pt-6 lg:pt-12 available-min-height">
      <div class="w-1/4 flex justify-center">
        <h2 class="text-2xl">About</h2>
      </div>
      <div class="w-3/4">
        <article class="prose lg:prose-lg text-theavenue-white">
          {{ talent.biography }}
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,

  name: 'ArtistPage',

  async asyncData({ $api, params, error }) {
    try {
      const { data: talent } = await $api.talent.get(params.id)

      return { talent }
    } catch {
      error("We couldn't find this artist")
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
<style scoped>
.available-min-height {
  min-height: calc(100vh - 80px - 28rem - 76px);
}
</style>
