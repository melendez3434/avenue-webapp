<template>
  <div class=" bg-red-600 pt-12 px-8 overflow-auto">
    <div v-if="!messages.length">There is no messages yet. Be the first! 😎</div>
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

  data() {
    return {
      messages: [],
    }
  },

  async created() {
    const { data } = await this.$api.events.getChat(this.event)
    this.messages = data
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
