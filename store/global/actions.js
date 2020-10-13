import { SET_GENRES, SET_VENUES, SET_CATEGORIES } from './mutation-types'

export default {
  async fetchGenres({ commit }) {
    const { data } = await this.$api.global.genres()
    commit(SET_GENRES, data)
  },

  async fetchVenues({ commit }) {
    const { data } = await this.$api.global.venues()
    commit(SET_VENUES, data)
  },

  async fetchCategories({ commit }) {
    const { data } = await this.$api.global.categories()
    commit(SET_CATEGORIES, data)
  },
}
