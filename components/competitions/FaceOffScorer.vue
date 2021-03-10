<template>
  <div
    class="border border-theavenue-yellow-neon rounded-lg p-6 flex flex-col"
    style="box-shadow: 0px 0px 10px rgba(255, 210, 67);"
  >
    <div class="flex items-center mb-4">
      <img
        v-if="talent.talent.photo"
        :src="talent.talent.photo"
        :alt="`${talent.name}`"
        class="rounded-full w-10 h-10 mr-4"
      />
      <div v-else class="bg-gray-300 rounded-full w-10 h-10 mr-4" />
      <span class="font-bold">{{ talent.name }}</span>
    </div>
    <blockquote class="italic">"{{ talent.motivation }}"</blockquote>
    <span
      class="mt-3 font-league-gothic uppercase text-lg justify-self-center text-center tracking-wider"
    >
      {{ talent.points }} points
    </span>
  </div>
</template>

<script>
export default {
  props: {
    talent: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
