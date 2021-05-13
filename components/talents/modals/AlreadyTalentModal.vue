<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <IcClose
      class="cursor-pointer absolute top-4 right-4"
      aria-role="button"
      aria-label="close"
      @click="close"
    />
    <div>
      <h3 class="font-bold mb-6 text-2xl">Hi there!</h3>
      <p class="font-bold">
        You already are a performer on The Avenue. Go to your dashboard to start performing live!
      </p>
    </div>
    <div class="flex flex-col mt-8 space-y-6">
      <R64Button @click="goToDashboard">
        Go to dashboard
      </R64Button>
      <R64Button @click="close">
        Close
      </R64Button>
    </div>
  </div>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'AlreadyTalentModal',

  components: {
    IcClose,
  },

  methods: {
    close() {
      this.$emit('close')
    },

    goToDashboard() {
      window.open(this.$config.baseURL)
    },
  },
}
</script>
