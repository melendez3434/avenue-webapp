<template>
  <div>
    <div class="bg-avenue-blue-light rounded-lg inline-block p-4 mt-4">
      <div class="font-bold">{{ message.user.name }}</div>
      <div class="text-avenue-grey">{{ message.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',

  props: {
    message: {
      type: Object,
      required: true,
    },
  },
}
</script>
