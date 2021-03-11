<template>
  <el-collapse-item :name="title">
    <template slot="title">
      <nuxt-link
        :to="{ name: route }"
        class="w-full bg-theavenue-white flex items-center justify-center font-league-gothic text-yellow-300 text-2xl md:text-6xl py-2 px-4 uppercase"
      >
          <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
            {{ title }}
          </p>
      </nuxt-link>
    </template>
    </div>
  </el-collapse-item>
</template>
<script>

export default {
  name: 'CurrentEventListItem',

  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    }
  },
}
</script>
<style>
</style>
