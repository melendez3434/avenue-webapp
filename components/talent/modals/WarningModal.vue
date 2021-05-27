<template>
  <div class="px-6 py-10">
    <p class="text-theavenue-white font-medium text-sm text-center">
      {{ text }}
    </p>
    <div class="w-full flex items-center justify-between space-x-6 mt-5">
      <R64Button
        full
        primary-class="bg-theavenue-gray text-theavenue-white"
        @click="$modal.hide('warning-modal')"
      >
        Ok
      </R64Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WarningModal',

  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
