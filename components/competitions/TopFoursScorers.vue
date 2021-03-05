<template>
  <div class="border border-theavenue-yellow-neon rounded-lg p-6">
    <div class="flex items-center">
      <img
        v-if="talent.photo"
        :src="talent.photo"
        :alt="`${talent.name}`"
        class="rounded-full w-10 h-10"
      />
      <span class="font-bold">Chef's name</span>
    </div>
    <blockquote class="italic">
      “Small description and explanation of why they should win that we ask them on the sign up
      form”
    </blockquote>
    <span class="font-league-gothic uppercase text-lg leading-loose">100 points</span>
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
