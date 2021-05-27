<template>
  <el-collapse-item :name="talent.id">
    <template slot="title">
      <div
        class="w-full bg-theavenue-white text-theavenue-black flex items-center justify-center font-league-gothic text-2xl md:text-6xl py-2 px-4 uppercase"
      >
        <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
          {{ talent.name }}
        </p>
      </div>
    </template>
    <div
      class="w-full bg-no-repeat h-86 bg-gray-800 bg-cover flex items-center justify-center relative"
      :style="{
        backgroundImage: talent.cover_photo ? `url(${talent.cover_photo})` : null,
      }"
    >
      <div class="dimmer-gradient w-full absolute top-0 left-0 h-full" />
      <div
        class="container mx-auto flex items-end justify-between h-full text-theavenue-white z-10 mb-12"
      >
        <TalentCard
          :talent="talent"
          class="hidden md:flex"
          :category="talent.category.name"
          link
        />
      </div>
    </div>
  </el-collapse-item>
</template>
<script>

export default {
  name: 'TalentListItem',

  props: {
    talent: {
      type: Object,
      required: true,
    },
  },

}
</script>
<style>
.el-collapse-item__header {
  @apply w-full;
  @apply p-0;
