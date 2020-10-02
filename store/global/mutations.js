import { SET_GENRES, SET_VENUES } from './mutation-types'

export default {
  [SET_GENRES](state, genres) {
    state.genres = genres
  },

  [SET_VENUES](state, venues) {
    state.venues = venues
  },
}
