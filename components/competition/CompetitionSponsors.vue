<template>
  <section class="container md:mx-auto">
    <div class="flex flex-row gap-4 items-start mb-6">
      <IcSponsor class="h-8" />
      <h2 class="text-xl font-bold">Sponsors</h2>
    </div>
    <div
      class="flex flex-col md:flex-row flex-wrap space-y-4 justify-center md:justify-between md:items-end mt-5 w-full"
    >
      <img
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        :src="sponsor.logo"
        :alt="`${sponsor.name} logo`"
        class="sponsor-item"
      />
    </div>
  </section>
</template>

<script>
import IcSponsor from '@/assets/svg/sponsor.svg?inline'

export default {
  name: 'CompetitionSponsors',

  components: { IcSponsor },

  props: {
    sponsors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style scoped>
.sponsor-item {
  width: 100%;
}
@media (min-width: 768px) {
  .sponsor-item {
    width: calc(30% - 0.5rem);
    margin-right: 0.5rem;
  }
}
</style>
