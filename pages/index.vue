<template>
  <div
    class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white pb-12 bg-theavenue-background-light"
  >
    <LogoLights class="w-full" />
    <el-collapse accordion class="grid grid-cols-1 gap-y-1 bg-theavenue-black w-full">
      <LiveEventListItem v-for="event in events" :key="event.id" :event="event" />
    </el-collapse>
    <div class="h-12 w-full">
      <infinite-loading spinner="spiral" @infinite="fetchPage">
        <div slot="no-more" class="mt-4">Thats all!</div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import LiveEventListItem from '@/components/events/LiveEventListItem'
import LogoLights from '@/components/commons/LogoLights'

export default {
  name: 'IndexPage',

  auth: false,

  components: {
    LiveEventListItem,
    LogoLights,
  },

  async asyncData({ $api }) {
    const { data: events, meta } = await $api.events.list()

    return { events, meta }
  },

  methods: {
    async fetchPage($state) {
      const page = this.meta.current_page + 1

      if (page > this.meta.last_page) {
        return $state.complete()
      }

      try {
        const { data: events, meta } = await this.$api.events.list({ page })
        this.events = [...this.events, ...events]
        this.meta = meta
        $state.loaded()
      } catch (e) {
        this.$router.push({ name: 'index' })
      }
    },
  },
}
</script>
