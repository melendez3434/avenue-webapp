<template>
  <div ref="chat" class="flex flex-col">
    <ChatMessages ref="messages" class="flex-1" :event="event" />
    <div class=" bg-avenue-blue-light h-12 flex items-center justify-center px-8">
      <div v-if="!$auth.user">
        <span>Please,</span>
        <nuxt-link
          :to="{ name: 'login' }"
          class="text-avenue-grey uppercase font-bold border-b border-avenue-grey pb-1"
        >
          log in
        </nuxt-link>
        <span>if you want to join the chat 🤠</span>
      </div>
      <input
        v-else
        v-model="message"
        type="text"
        class="bg-avenue-blue-dark rounded-lg w-full p-2 text-xs"
        placeholder="write a comment..."
        @keydown.enter="addMessage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoom',

  props: {
    event: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      message: '',
    }
  },

  mounted() {
    const streamHeight = document.getElementById('streaming').offsetHeight
    // From the stream height  the tip jar height
    this.$refs.chat.style.maxHeight = `calc(${streamHeight}px - 256px)`
  },

  methods: {
    addMessage() {
      if (!this.message) return

      this.$refs.messages.addNewMessage({
        user: this.$auth.user,
        message: this.message,
      })

      this.message = ''
    },
  },
}
</script>
<style>
.chat-max-height {
  /* get off the full scren the tip jar and navbar height */
  max-height: calc(100vh - 256px - 69px);
}
</style>
