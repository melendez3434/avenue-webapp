<template>
  <div
    v-chat-scroll="{
      always: false,
      smooth: true,
      scrollonremoved: true,
      smoothonremoved: false,
    }"
    class="py-3 px-4 md:py-6 md:px-8 overflow-auto"
  >
    <div v-if="!messages.length">There are no messages yet. Be the first! 😎</div>
    <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script>
export default {
  name: 'ChatMessages',

  props: {
    event: {
      type: [Number, String],
      required: true,
    },
  },

  async fetch() {
    const { data } = await this.$api.events.getChat(this.event)
    this.messages = data
  },

  data() {
    return {
      messages: [],
    }
  },

  async mounted() {
    this.$echo.channel(`event.${this.event}`).listen('ChatMessageCreated', ({ chatMessage }) => {
      this.messages.push(chatMessage)
    })
  },

  beforeDestroy() {
    this.$echo.channel(`event.${this.event}`).stopListening('ChatMessageCreated')
  },

  methods: {
    async addNewMessage(message) {
      const ref = Math.random()
        .toString(36)
        .substring(7)

      message.ref = ref
      this.messages.push(message)

      const index = this.messages.length - 1

      try {
        const { data } = await this.$api.events.sendMessage(this.event, message.message)
        this.messages.splice(index, 1, data)
      } catch (error) {
        this.messages.splice(index, 1)
      }
    },
  },
}
</script>
