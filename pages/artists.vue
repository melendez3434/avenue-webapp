<template>
  <div class="container mx-auto pb-12">
    <div class="mb-5 mt-8">
      <ul class="flex space-x-5">
        <nuxt-link
          as="li"
          :to="{ name: 'artists' }"
          class="uppercase"
          :class="{
            'text-avenue-grey': $route.query.genre,
            'text-avenue-white-light': !$route.query.genre,
          }"
        >
          All
        </nuxt-link>
        <!-- <nuxt-link
          v-for="genre in genres"
          :key="genre.id"
          as="li"
          :to="{ name: 'artists', query: { genre: genre.id } }"
          class="uppercase"
          :class="{
            'text-avenue-grey': $route.query.genre !== genre.id,
            'text-avenue-white-light': $route.query.genre === genre.id,
          }"
        >
          {{ genre.name }}
        </nuxt-link> -->
      </ul>
    </div>

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

  async fetch() {
    await this.fetchPage()
  },

  data() {
    return {
      artists: [],
      meta: {},
      links: {},
    }
  },

  watch: {
    async '$route.query.genre'(genreId) {
      this.fetchPage(null, genreId)
    },
  },

  methods: {
    async fetchPage(page = null, genreId = null) {
      const params = {}
      params.page = page ? page : this.meta.current_page
      params.genre = genreId ? genreId : this.$route.query.genre

      try {
        const { data: artists, links, meta } = await this.$api.talent.list(params)
        this.artists = artists
        this.links = links
        this.meta = meta
      } catch (e) {
        this.$router.push({ name: 'artists' })
      }
    },
  },
}
</script>
