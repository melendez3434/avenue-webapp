export default {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('global/fetchGenres')
      await dispatch('global/fetchVenues')
    },
  },
}
