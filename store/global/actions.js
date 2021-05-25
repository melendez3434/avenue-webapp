import {
  SET_CATEGORIES,
  SET_CURRENT_COMPETITION,
  SET_FOLLOWED_TALENTS,
  SET_LOADING_PAGE,
  INITIALIZE_STORE,
  SET_COMPETITIONS,
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

  async fetchCurrentCompetition({ commit }) {
    if (!process.env.BREAKING_BREAD_ID) return

    const { data } = await this.$api.competitions.get(process.env.BREAKING_BREAD_ID)
    commit(SET_CURRENT_COMPETITION, data)
  },

  async fetchCompetitions({ commit }) {
    const { data } = await this.$api.competitions.list()
    commit(SET_COMPETITIONS, data)
  },

  async initStore({ dispatch, commit }) {
    commit(SET_LOADING_PAGE, true)

    await Promise.all([
      dispatch('global/fetchCategories', null, { root: true }),
      dispatch('global/fetchFollowedTalents', null, { root: true }),
      dispatch('global/fetchCurrentCompetition', null, { root: true }),
      dispatch('global/fetchCompetitions', null, { root: true }),
    ])

    commit(INITIALIZE_STORE)
    commit(SET_LOADING_PAGE, false)
  },
}
