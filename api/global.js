export default $axios => ({
  async uploadImage(base64File) {
    const type = base64File.substring('data:'.length, base64File.indexOf(';base64'))

    const { data } = await $axios.post('/api/vapor/signed-storage-url', {
      visibility: 'public-read',
    })

    const instance = $axios.create()
    instance.defaults.headers.common = {}

    const file = dataURItoBlob(base64File, type)

    await instance.put(data.url, file, {
      headers: { 'Content-Type': type },
    })

    const extension = type.split('/').pop()

    return `${data.key}.${extension}`
  },

  genres() {
    return $axios.$get('/api/genres')
  },
})

function dataURItoBlob(dataURI, type) {
  const byteString = atob(dataURI.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type })
}
