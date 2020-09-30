<template>
  <div class="container mx-auto pb-12">
    <div class="flex flex-col space-y-4 mt-8">
      <ArtistListItem v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>

    <Pagination :prev="!!links.prev" :next="!!links.next" @next="next" @prev="prev" />
  </div>
</template>
<script>
import hasPagination from '@/mixins/hasPagination'
import Pagination from '@/components/commons/ui/Pagination'
import ArtistListItem from '@/components/artists/ArtistListItem'

export default {
  name: 'Artists',

  auth: false,

  components: {
    ArtistListItem,
    Pagination,
  },

  mixins: [hasPagination],

  async asyncData({ $api }) {
    const { data: artists, links, meta } = await $api.talent.list()
    return { artists, links, meta }
  },

  methods: {
    async fetchPage(page) {
      const { data: artists, links, meta } = await this.$api.artists.list({ page })

      this.artists = artists
      this.links = links
      this.meta = meta
    },
  },
}
</script>
