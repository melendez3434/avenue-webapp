<template>
  <div class="px-24 py-12 bg-avenue-blue-light text-center">
    <p class="text-3xl">Haven't your heard?</p>
    <p class="mt-10 text-lg">The Avenue has events now!</p>
    <p class="mt-5 text-lg px-6">
      Compite with other performants, donate to charity and win the prize
    </p>
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
export default {
  name: 'CompetitionModalAnnouncement',
}
</script>
