<template>
  <div class="available-min-height bg-avenue-blue-light flex items-center justify-center">
    <div class="px-24 py-8 text-center flex flex-col items-center">
      <p class="text-3xl font-bold">Welcome to The Avenue!</p>
      <p class="mt-8 text-lg font-bold">The Avenue hosts cooking competitions now!</p>
      <p class="mt-8 text-lg font-bold">Do you want to join Breaking Bread competition?</p>
      <p class="my-5 text-lg px-6">
        <slot />
      </p>
      <IcDish />
      <button
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-10 focus:outline-none cursor-pointer"
        @click="$modal.show('join-event-modal', { competition })"
      >
        I'm in!
      </button>
    </div>
  </div>
</template>

<script>
import IcDish from '@/assets/svg/dish.svg?inline'

export default {
  name: 'WelcomePage',

  components: {
    IcDish,
  },

  async asyncData({ $api }) {
    const { data: competition } = await $api.competitions.get(process.env.BREAKING_BREAD_ID)

    return { competition }
  },
}
</script>
