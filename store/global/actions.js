import { SET_CATEGORIES, SET_CURRENT_COMPETITION } from './mutation-types'

export default {
  async fetchCategories({ commit }) {
    const { data } = await this.$api.global.categories()
    commit(SET_CATEGORIES, data)
  },

  async fetchCurrentCompetition({ commit }) {
    const { data } = await this.$api.competitions.get(process.env.BREAKING_BREAD_ID)
    commit(SET_CURRENT_COMPETITION, data)
  },
}
