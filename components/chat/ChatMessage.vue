<template>
  <div>
    <div class="bg-avenue-blue-light rounded-lg inline-block px-4 py-2 md:px-4 md:py-4 mt-1 md:mt-4">
      <div>
        <span class="font-bold">{{ message.user.name }}</span>
        <span v-if="isTip" class="text-sm text-avenue-grey">donated</span>
      </div>
      <div class="text-avenue-grey flex">
        <component
          :is="comp.type"
          v-for="(comp, index) in messageComponents"
          :key="index"
          :class="{ 'text-theavenue-green-neon font-library text-2xl': isTip }"
        >
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
