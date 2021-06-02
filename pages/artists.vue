<template>
  <div>
    <LogoLights class="w-full" />
    <div v-if="$fetchState.pending" class="h-screen">
      <content-placeholders class=" w-full ">
        <content-placeholders-img
          v-for="(line, index) in 6"
          :key="index"
          class="my-1 h-12 md:h-10 w-full"
        />
      </content-placeholders>
    </div>
    <div
      v-else
      class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
    >
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
