<template>
  <div
    ref="editable"
    class="p-2 outline-none cursor-text flex h-10 items-center justify-start"
    placeholder="write a comment..."
    contenteditable
    @keydown.enter="submit"
  />
</template>

<script>
export default {
  name: 'ChatRoomInput',

  computed: {
    listeners() {
      return { ...this.$listeners, keydown: this.onInput }
    },
  },

  methods: {
    submit() {
      const html = this.$refs.editable.innerHTML
      console.log('html', html)
      const path = process.env.NODE_ENV === 'production' ? '/_nuxt/img/' : '/_nuxt/assets/emojis/'
      const sanitized = html
        .replaceAll(`<img src="${path}`, ':')
        .replaceAll('.png">', ':')
        .replaceAll('<br>', '')
        .replaceAll('<div>', '')
        .replaceAll('</div>', '')
        .replaceAll('&nbsp;', ' ')
      this.$emit('submit', sanitized)
    },

    clear() {
      this.$refs.editable.innerHTML = ''
    },

    addEmoji(icon) {
      this.$refs.editable.appendChild(icon.cloneNode(true))
      const editable = this.$refs.editable
      editable.focus()
      document.execCommand('selectAll', false, null)
      document.getSelection().collapseToEnd()
    },
  },
}
</script>
<style>
[contenteditable][placeholder]:empty:not(:focus):before {
  content: attr(placeholder);
  position: absolute;
  color: gray;
  background-color: transparent;
}
</style>
