import { SET_CATEGORIES, SET_CURRENT_COMPETITION } from './mutation-types'

export default {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },

  [SET_CURRENT_COMPETITION](state, competition) {
    state.currentCompetition = competition
  },
}
