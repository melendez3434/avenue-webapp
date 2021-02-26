<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <p class="text-3xl font-bold">Haven't your heard?</p>
    <p class="mt-8 text-lg font-bold">The Avenue hosts cooking competitions now!</p>
    <p class="my-5 text-lg px-6">
      <slot />
    </p>
    <IcDish />
    <nuxt-link
      v-if="isTalent"
      :to="{ name: 'events-talents' }"
      class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
    >
      Learn More
    </nuxt-link>
    <nuxt-link
      v-else
      :to="{ name: 'events' }"
      class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
    >
      Learn More
    </nuxt-link>
  </div>
</template>
<script>
import IcDish from '@/assets/svg/dish.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'CompetitionModalAnnouncemnt',

  components: {
    IcDish,
    IcClose,
  },

  props: {
    isTalent: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    close() {
      return this.$emit('close')
    },
  },
}
</script>
