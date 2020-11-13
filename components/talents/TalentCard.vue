<template>
  <div class="flex items-center" :class="{ 'cursor-pointer': link }" @click="navigate">
    <img
      v-if="talent.photo"
      :src="talent.photo"
      :alt="`${talent.name} photo`"
      class="rounded-full w-14 h-14"
    />
    <div class="ml-5">
      <p class="font-sans text-xl font-bold leading-6">{{ talent.name }}</p>
      <p class="font-sans text-lg">
        <span v-if="category">{{ category }} /</span>
        <span>{{ talent.artist_type }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalentCard',

  props: {
    talent: {
      type: Object,
      required: true,
    },

    category: {
      type: String,
      default: '',
    },

    link: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    navigate() {
      this.$emit('click')

      if (!this.link) return

      this.$router.push(`/artist/${this.talent.id}`)
    },
  },
}
</script>
