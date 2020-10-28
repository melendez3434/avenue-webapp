<template>
  <div
    v-chat-scroll="{
      always: false,
      smooth: true,
      scrollonremoved: true,
      smoothonremoved: false,
    }"
    class="py-6 px-4 md:py-12 md:px-8 overflow-auto"
  >
    <ChatMessage :message="message" />
  </div>
</template>
<script>
export default {
  name: 'ChatMessagesPlaceholder',

  data() {
    return {
      message: {
        user: {
          name: '',
        },
        message:
          'Your event is not live yet. Tip jars and chat will be activated automatically at the event start time',
      },
    }
  },
}
</script>
