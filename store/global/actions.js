import { SET_GENRES, SET_VENUES } from './mutation-types'

export default {
  async fetchGenres({ commit }) {
    const { data } = await this.$api.global.genres()
    commit(SET_GENRES, data)
  },

  async fetchVenues({ commit }) {
    const { data } = await this.$api.global.venues()
    commit(SET_VENUES, data)
  },
}
