<template>
  <div class="container md:mx-auto my-16">
    <div class="flex flex-row gap-4 items-start mb-6">
      <IcCamera class="h-6 self-center" />
      <h2 class="text-xl font-bold">Live Now</h2>
    </div>
    <div class="md:grid grid-flow-cols grid-cols-4 gap-6 mt-6">
      <CompetitionLivePerformance
        v-for="performance in livePerformances"
        :key="performance.id"
        :performance="performance"
      />
    </div>
  </div>
</template>

<script>
import IcCamera from '@/assets/svg/live_camera.svg?inline'

export default {
  name: 'CompetitionLiveGrid',

  components: { IcCamera },

  props: {
    livePerformances: {
      type: Array,
      required: true,
    },
  },
}
</script>
