<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Have you heard?</p>
    <p class="mt-8 text-lg font-bold">
      The Avenue hosts virtual competitions now!
    </p>
    <p class="my-5 text-lg px-6">
      <slot />
    </p>
    <IcTrophy class="h-28" />
    <nuxt-link
      :to="{ name: 'events' }"
      class="uppercase border border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
    >
      Learn More
    </nuxt-link>
  </div>
</template>
<script>
import IcTrophy from '@/assets/svg/trophy.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'CompetitionModalAnnouncement',

  components: {
    IcTrophy,
    IcClose,
  },

  methods: {
    close() {
      return this.$emit('close')
    },
  },
}
</script>
