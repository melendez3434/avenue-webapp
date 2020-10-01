export default {
  methods: {
    prev() {
      if (!this.links.prev) return
      this.fetchPage(this.meta.current_page - 1)
    },

    next() {
      if (!this.links.next) return
      this.fetchPage(this.meta.current_page + 1)
    },

    fetchPage(page) {
      console.warn('should implement fetchPage method', page)
    },
  },
}
