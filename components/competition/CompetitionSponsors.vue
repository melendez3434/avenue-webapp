<template>
  <section class="container md:mx-auto mt-20">
    <div class="flex flex-row gap-4 items-start mb-6">
      <IcSponsor class="h-8" />
      <h2 class="text-xl font-bold">Sponsors</h2>
    </div>
    <div class="mt-5 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12 items-end">
      <div v-for="sponsor in sponsors" :key="sponsor.id">
        <img v-if="sponsor.logo" :src="sponsor.logo" :alt="`${sponsor.name} logo`" class="w-full" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompetitionSponsors',

  props: {
    sponsors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
