import { SET_GENRES, SET_VENUES, SET_CATEGORIES } from './mutation-types'

export default {
  [SET_GENRES](state, genres) {
    state.genres = genres
  },

  [SET_VENUES](state, venues) {
    state.venues = venues
  },

  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
}
