<template>
  <div>
    <el-dropdown-item v-for="talent in talents" :key="talent.id">
      <nuxt-link class="flex items-start" :to="{ name: 'artist-id', params: { id: talent.id } }">
        <img
          v-if="talent.photo"
          :src="talent.photo"
          :alt="`${talent.name} photo`"
          class="rounded-full w-6 h-6 mr-3 mt-1.5"
        />
        {{ talent.name }}
      </nuxt-link>
    </el-dropdown-item>
    <!-- <div v-if="!talents.length" class="ml-4 mb-4 text-white">
      <p>No results</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    talents: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.el-popper.el-dropdown-menu .el-dropdown-menu__item {
  @apply uppercase;
  @apply font-library;
  @apply text-base;
  @apply text-theavenue-gray;
  @apply mb-5;
}

.el-popper.el-dropdown-menu .el-dropdown-menu__item:focus,
.el-popper.el-dropdown-menu .el-dropdown-menu__item:not(.is-disabled):hover {
  @apply bg-transparent;
  @apply text-theavenue-white;
}
</style>
