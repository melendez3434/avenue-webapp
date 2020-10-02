import { SET_GENRES } from './mutation-types'

export default {
  async fetchGenres({ commit }) {
    const { data } = await this.$api.global.genres()
    commit(SET_GENRES, data)
  },
}
