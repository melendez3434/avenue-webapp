<template>
  <div class="flex flex-col">
    <ChatMessages ref="messages" class="flex-1" :event="event" />
    <div class=" bg-avenue-blue-light h-12 flex items-center justify-center px-8 py-2">
      <div v-if="!$auth.user">
        <span>Please,</span>
        <button
          class="text-avenue-grey uppercase font-bold border-b border-avenue-grey pb-1"
          @click="$modal.show('user-access-modal', { active: 'login' })"
        >
          log in
        </button>
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
