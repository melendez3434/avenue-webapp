<template>
  <section class="container md:mx-auto my-20">
    <div class="flex flex-row gap-4 items-start mb-6">
      <IcSponsor class="h-8" />
      <h2 class="text-xl font-bold">Sponsors</h2>
    </div>
    <div class="mt-5 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12 items-end h-10 lg:h-32">
      <div v-for="sponsor in sponsors" :key="sponsor.id" class="h-full">
        <img v-if="sponsor.logo" :src="sponsor.logo" :alt="`${sponsor.name} logo`" class="h-full" />
      </div>
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
