<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <LogoLights class="w-full" />
    <el-collapse accordion class="grid grid-cols-1 gap-y-1 bg-theavenue-black w-full">
      <TalentListItem v-for="talent in talents" :key="talent.id" :talent="talent" />
    </el-collapse>
  </div>
</template>

<script>
export default {
  auth: false,

  async asyncData({ $api }) {
    try {
      const { data: talents } = await $api.talent.list({ all: true, items_per_page: 10000 })
      return { talents }
    } catch {
      console.error('Sorry. Something went wrong fetching the talents')
      return { talents: [] }
    }
  },
}
</script>
