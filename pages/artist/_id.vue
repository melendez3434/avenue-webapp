<template>
  <div class="pb-12">
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

    <div class="container mx-auto flex space-x-6 mt-6 lg:mt-12">
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
}
</script>
