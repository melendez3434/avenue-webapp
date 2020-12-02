<template>
  <div
    class="md:bg-theavenue-background-extra-light rounded-lg px-4 py-2 mt-1 md:mt-2 flex flex-row md:flex-col items-center md:items-start text-sm md:text-base"
  >
    <div>
      <span class="font-bold">{{ message.user.name }}</span>
      <span v-if="isTip" class="text-sm text-avenue-grey ml-3 md:ml-0">tipped</span>
    </div>
    <div class="text-avenue-grey flex ml-3 md:ml-0">
      <component
        :is="comp.type"
        v-for="(comp, index) in messageComponents"
        :key="index"
        :class="{ 'text-theavenue-green-neon font-library text-2xl': isTip }"
      >
        {{ isTip ? '$$$' : comp.message }}
      </component>
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
    isTip() {
      return this.message.type === 'tip'
    },

    messageComponents() {
      const icons = {
        heart: 'IcHeart',
        smile: 'IcSmile',
        fire: 'IcFire',
      }
      return this.message.message.split(':').map(message => {
        const icon = message.split('.')[0] // nuxt adds an extra hash in production
        return {
          message,
          type: icons[icon] || 'span',
        }
      })
    },
  },
}
</script>
