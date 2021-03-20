import { SET_CATEGORIES, SET_CURRENT_COMPETITION, SET_FOLLOWED_TALENTS } from './mutation-types'

export default {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },

  [SET_FOLLOWED_TALENTS](state, talents) {
    state.followedTalents = talents
  },

  [SET_CURRENT_COMPETITION](state, competition) {
    state.currentCompetition = competition
  },
}
