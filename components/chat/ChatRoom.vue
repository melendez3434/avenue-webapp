<template>
  <div class="flex flex-col bg-avenue-blue-light">
    <!-- Using a key reloads the socket events when user goes from guess to auth -->
    <ChatMessages :key="$auth.loggedIn" ref="messages" :event="event.id" />
    <client-only>
      <div
        class=" bg-theavenue-background-extra-light h-20 items-center justify-center px-8 py-2 hidden md:flex"
      >
        <div class="w-full flex rounded-lg bg-avenue-blue-dark items-center">
          <ChatRoomInput
            ref="input"
            class="bg-avenue-blue-dark flex-1 text-xs rounded-l-lg"
            @submit="addMessage"
            @click="canSendMessages"
          />
          <div class="pr-2 flex landscape:hidden">
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
            <img
              ref="fire"
              src="~assets/emojis/fire.png"
              @click="$refs.input.addEmoji($refs.fire)"
            />
          </div>
        </div>
        <el-popover
          v-if="$auth.loggedIn"
          v-model="jarsVisible"
          placement="top"
          trigger="click"
          @show="jarsVisible = true"
          @hide="jarsVisible = false"
        >
          <div>
            <div>Support:</div>
            <div
              v-for="jar in event.tip_jars"
              :key="jar.id"
              class="cursor-pointer py-2"
              @click="selectJar(jar.id)"
            >
              {{ jar.name }}
            </div>
          </div>

          <IcTipjar slot="reference" class="h-20" />
        </el-popover>
      </div>
      <div class="block md:hidden">
        <p class="text-xs text-theavenue-white px-2 py-3 text-center bg-theavenue-background-dark">
          If you want to have a better experience that includes chatting, please open The Avenue in
          a desktop or download our
          <span class="cursor-pointer font-bold" @click="$modal.show('mobile-app-modal')">
            mobile app
          </span>
        </p>
      </div>
    </client-only>
  </div>
</template>

<script>
import IcTipjar from '@/assets/svg/tipjar_mini.svg?inline'

export default {
  name: 'ChatRoom',

  components: { IcTipjar },

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      jarsVisible: false,
    }
  },

  methods: {
    selectJar(id) {
      this.$emit('click:jar', id)
      this.jarsVisible = false
    },

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

    canSendMessages() {
      if (!this.$auth.user) {
        return this.$modal.show('user-access-modal', {
          active: 'login',
          title: this.event.talent.name,
          subtitle: 'Log in or sign up to chat',
        })
      }

      this.$refs.input.$el.focus()
    },
  },
}
</script>
