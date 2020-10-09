<template>
  <div class="flex flex-col bg-avenue-blue-light">
    <ChatMessages ref="messages" class="flex-1" :event="event" />
    <div
      class=" bg-theavenue-background-extra-light h-20 flex items-center justify-center px-8 py-2"
    >
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
      <div v-else class="w-full flex rounded-lg bg-avenue-blue-dark items-center">
        <ChatRoomInput
          ref="input"
          class="bg-avenue-blue-dark flex-1 text-xs rounded-l-lg"
          @submit="addMessage"
        />
        <div class="pr-2 flex">
          <img
            ref="heart"
            src="~assets/emojis/heart.png"
            @click="$refs.input.addEmoji($refs.heart)"
          />
          <img
            ref="smile"
            src="~assets/emojis/smile.png"
            @click="$refs.input.addEmoji($refs.smile)"
          />
          <img ref="fire" src="~assets/emojis/fire.png" @click="$refs.input.addEmoji($refs.fire)" />
        </div>
      </div>
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

  methods: {
    addMessage(message) {
      if (!message) return

      this.$refs.messages.addNewMessage({
        user: this.$auth.user,
        message,
      })

      this.$refs.input.clear()
    },

    addEmoji(emoji) {
      this.message = `${this.message}:${emoji}:`
    },
  },
}
</script>
