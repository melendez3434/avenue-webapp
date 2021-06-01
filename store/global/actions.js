import {
  SET_CATEGORIES,
  SET_CURRENT_COMPETITION,
  SET_FOLLOWED_TALENTS,
  INITIALIZE_STORE,
  SET_COMPETITIONS,
  SET_BACK_TO_COMPETITION_SIGNUP,
} from './mutation-types'

export default {
  async fetchCategories({ commit }) {
    const { data } = await this.$api.global.categories()
    commit(SET_CATEGORIES, data)
  },

  async fetchFollowedTalents({ commit }) {
    const { data } = await this.$api.talent.followedList()
    commit(SET_FOLLOWED_TALENTS, data)
  },

  async setCurrentCompetition({ commit }, competition) {
    commit(SET_CURRENT_COMPETITION, competition)
  },

  async fetchCompetitions({ commit }) {
    const { data } = await this.$api.competitions.list()
    commit(SET_COMPETITIONS, data)
  },

  async initStore({ dispatch, commit }) {
    await Promise.all([
      dispatch('global/fetchCategories', null, { root: true }),
      dispatch('global/fetchCurrentCompetition', null, { root: true }),
      dispatch('global/fetchCompetitions', null, { root: true }),
    ])

    commit(INITIALIZE_STORE)
  },

  async setBackToCompetition({ commit }) {
    commit(SET_BACK_TO_COMPETITION_SIGNUP)
  },
}
