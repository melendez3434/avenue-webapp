import {
  SET_CATEGORIES,
  SET_CURRENT_COMPETITION,
  SET_FOLLOWED_TALENTS,
  INITIALIZE_STORE,
  SET_COMPETITIONS,
  SET_BACK_TO_COMPETITION_SIGNUP,
} from './mutation-types'

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

  [SET_COMPETITIONS](state, competitions) {
    state.competitions = competitions
  },

  [INITIALIZE_STORE](state) {
    state.storeInitialized = true
  },

  [SET_BACK_TO_COMPETITION_SIGNUP](state) {
    state.backToCompetitionSignup = true
  },
}
