<template>
  <font-awesome-icon :icon="[iconType, iconName]" />
</template>

<script>
export default {
  name: 'CompetitionIcon',

  props: {
    icon: {
      type: String,
      default: '',
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
