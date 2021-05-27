import {
  SET_CATEGORIES,
  SET_CURRENT_COMPETITION,
  SET_FOLLOWED_TALENTS,
  INITIALIZE_STORE,
  SET_COMPETITIONS,
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
    state.storeInitialized
  },
<<<<<<< HEAD
=======

  [SET_LOADING_PAGE](state, value) {
    state.loadingPage = value
  },

>>>>>>> b553634e01ec0719eea2ef248efe0afe6e5f6b55
}
