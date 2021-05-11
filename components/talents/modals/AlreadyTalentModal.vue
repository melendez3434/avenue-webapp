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
      <p class="font-bold">You already are a performer on The Avenue</p>
    </div>
    <R64Button class="mt-8" @click="close">
      Close
    </R64Button>
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
  },
}
</script>
