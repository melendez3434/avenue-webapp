<template>
  <div class="space-y-6">
    <div
      v-for="event in events"
      :key="event.id"
      class="flex justify-between border-b border-gray-800"
    >
      <h3 class="font-league-gothic text-2xl uppercase">{{ event.duration }}</h3>
      <h3 class="font-league-gothic text-2xl uppercase">{{ talent.name }} - {{ event.name }}</h3>
      <h3 class="font-league-gothic text-2xl uppercase">Jan 01/2020</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalentPastEvents',

  props: {
    events: {
      type: Object,
      default: null,
    },
  },
}
</script>
