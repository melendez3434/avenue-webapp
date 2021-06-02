<template>
  <div class="px-6 py-10">
    <p class="text-theavenue-white font-medium text-sm">
      Would you like to set up a streaming profile?
    </p>
    <div class="w-full flex items-center justify-between space-x-6 mt-5">
      <R64Button class="w-1/2" secondary @click="handleNo">Not Now</R64Button>
      <R64Button
        class="w-1/2"
        primary-class="bg-theavenue-gray text-theavenue-white"
        @click="handleYes"
      >
        Yes
      </R64Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TalentModalsStreamingProfile',

  methods: {
    handleNo() {
      this.$modal.hide('streaming-profile-modal')
    },

    handleYes() {
      this.$modal.hide('streaming-profile-modal')
      this.$modal.show('talent-signup-modal')
    },
  },
}
</script>
