export default {
  name: 'CollapseGroup',

  data() {
    return {
      open: false,
    }
  },

  render(h) {
    console.log('slots', this.$slots)
    console.log('children', this.$children)
    return h('div', this.$slots.default)
  },
}
