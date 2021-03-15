export default {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('global/fetchCategories')
      await dispatch('global/fetchCurrentCompetition')
    },
  },
}
