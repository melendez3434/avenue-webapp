import { SET_GENRES } from './mutation-types'

export default {
  [SET_GENRES](state, genres) {
    state.genres = genres
  },
}
