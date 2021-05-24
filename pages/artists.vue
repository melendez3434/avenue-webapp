<template>
  <div>
    <div v-if="$fetchState.pending" class="h-screen">
      <base-spinner class="transform translate-y-2/4" />
    </div>
    <div
      v-else
      class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
    >
      <LogoLights class="w-full" />
      <el-collapse accordion class="grid grid-cols-1 gap-y-1 bg-theavenue-black w-full">
        <TalentListItem v-for="talent in talents" :key="talent.id" :talent="talent" />
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,

  async fetch() {
    try {
      const { data: talents } = await this.$api.talent.list({ all: true, items_per_page: 10000 })
      this.talents = talents
    } catch {
      console.error('Sorry. Something went wrong fetching the talents')
      this.$router.push('/')
    }
  },

  data() {
    return {
      talents: [],
    }
  },
}
</script>
