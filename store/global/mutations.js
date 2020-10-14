import { SET_CATEGORIES } from './mutation-types'

export default {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
}
