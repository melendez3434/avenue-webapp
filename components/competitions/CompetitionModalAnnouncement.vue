<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <p class="text-3xl font-bold">Haven't your heard?</p>
    <p class="mt-8 text-lg font-bold">The Avenue hosts cooking competitions now!</p>
    <p class="my-5 text-lg px-6">
      Help charity organizations, engage your audience and win the price!
    </p>
    <IcDish />

    <div class="mt-10">
      <nuxt-link
        :to="{ name: 'events-talents' }"
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        Learn More
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import IcDish from '@/assets/svg/dish.svg?inline'

export default {
  name: 'CompetitionModalAnnouncement',
  components: { IcDish },
}
</script>
