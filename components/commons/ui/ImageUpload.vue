<template>
  <div>
    <div class="flex justify-center items-center my-3">
      <div data-text="Select Image" class="file-upload-wrapper w-auto relative">
        <input
          name="file-upload-field"
          type="file"
          class="file-upload-field absolute inset-0 z-50 m-0 p-0 block cursor-pointer w-full opacity-0"
          @change="changeImage"
          @click="e => (e.target.value = null)"
        />
      </div>

      <div
        v-if="cropped"
        class="text-remate-black border-b border-remate-black text-sm pb-1 font-bold cursor-pointer"
        @click="remove"
      >
        Remove Image
      </div>
    </div>

    <div class="my-6">
      <div v-show="cropped" ref="croppie" />
    </div>
  </div>
</template>

<script>
import Croppie from 'croppie'
import 'croppie/croppie.css'

export default {
  name: 'ImageUpload',

  props: {
    cropped: {
      type: String,
      default: '',
    },
    viewport: {
      type: Object,
      default: () => ({ width: 250, height: 250, type: 'circle' }),
    },
    resultSize: {
      type: [Object, String],
      default: 'viewport',
    },
  },

  data() {
    return {
      croppie: null,
    }
  },

  computed: {
    boundary() {
      return {
        width: this.viewport.width + 20,
        height: this.viewport.height + 20,
      }
    },
  },

  beforeDestroy() {
    this.$refs.croppie.removeEventListener('update', this.updateImage)
    this.croppie.destroy()
  },

  mounted() {
    this.initCroppie()

    if (this.cropped) {
      this.croppie.bind({
        url: this.cropped,
      })
    }
  },

  methods: {
    changeImage(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      const reader = new FileReader()
      reader.onload = async e => {
        await this.$emit('update:cropped', e.target.result)

        this.croppie.bind({
          url: e.target.result,
        })
      }

      reader.readAsDataURL(files[0])
    },

    updateImage() {
      const options = {
        format: 'jpeg',
        size: this.resultSize,
        circle: this.viewport.type === 'circle',
      }
      this.croppie.result(options).then(output => {
        this.$emit('update:cropped', output)
      })
    },

    initCroppie() {
      this.$refs.croppie.addEventListener('update', this.updateImage)
      this.croppie = new Croppie(this.$refs.croppie, {
        enableOrientation: true,
        showZoomer: false,
        boundary: this.boundary,
        viewport: this.viewport,
      })
    },

    remove() {
      this.croppie.destroy()
      this.initCroppie()
      this.$emit('update:cropped', '')
    },
  },
}
</script>

<style lang="postcss">
.file-upload-wrapper:after {
  content: attr(data-text);
  @apply .text-white .rounded .text-sm .p-3 .mr-3 .font-bold .cursor-pointer .block .relative .top-0 .left-0;
}

.croppie-container .cr-viewport {
  border: 1px solid #e0dfde;
}
.croppie-container .cr-resizer {
  @apply .border-0;
}
</style>
