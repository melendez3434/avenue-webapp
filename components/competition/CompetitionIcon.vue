<template>
  <font-awesome-icon
    :icon="[iconType, iconName]"
    :class="{
      'text-xl md:text-3xl mb-1 md:mb-0': isTitle,
      'text-xl md:text-5xl lg:text-6xl': !isTitle,
    }"
  />
</template>

<script>
export default {
  name: 'CompetitionIcon',

  props: {
    icon: {
      type: String,
      default: '',
    },

    isTitle: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconParts() {
      if (!this.icon) return null
      return this.icon.split(' ')
    },

    iconType() {
      if (!this.icon || !this.iconParts.length) return ''

      return this.iconParts[0]
    },

    iconName() {
      if (!this.icon || !this.iconParts.length) return ''

      const name = this.iconParts[1]

      return name.substring(3, name.length)
    },
  },
}
</script>
