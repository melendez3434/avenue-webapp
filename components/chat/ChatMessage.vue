<template>
  <div>
    <div class="bg-avenue-blue-light rounded-lg inline-block p-4 mt-4">
      <div class="font-bold">{{ message.user.name }}</div>
      <div class="text-avenue-grey flex">
        <component :is="comp.type" v-for="(comp, index) in messageComponents" :key="index">
          {{ comp.message }}
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import IcHeart from '@/assets/svg/heart.svg?inline'
import IcSmile from '@/assets/svg/smile.svg?inline'
import IcFire from '@/assets/svg/fire.svg?inline'

export default {
  name: 'ChatMessage',

  // eslint-disable-next-line
  components: { IcHeart, IcSmile, IcFire },

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  computed: {
    messageComponents() {
      const icons = {
        heart: 'IcHeart',
        smile: 'IcSmile',
        fire: 'IcFire',
      }
      return this.message.message.split(':').map(message => {
        return {
          message,
          type: icons[message] || 'span',
        }
      })
    },
  },
}
</script>
