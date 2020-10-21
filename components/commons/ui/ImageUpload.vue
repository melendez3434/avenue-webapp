<template>
  <div>
    <div class="flex justify-center items-center my-3">
      <div data-text="Select Image" class="file-upload-wrapper w-auto relative">
        <input
          name="file-upload-field"
          type="file"
          class="file-upload-field absolute inset-0 z-50 m-0 p-0 block cursor-pointer w-full opacity-0"
          @change="changeImage"
        />
      </div>

      <div
        class="text-remate-black border-b border-remate-black text-sm pb-1 font-bold cursor-pointer"
        @click="remove"
      >
        Remove Image
      </div>
    </div>

    <div class="my-6">
      <vue-croppie
        v-if="cropped"
        ref="croppieRef"
        :enable-orientation="true"
        :show-zoomer="false"
        :enable-resize="false"
        :boundary="{ width: 270, height: 270 }"
        :viewport="{ width: 250, height: 250, type }"
        @update="updateImage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',

  props: {
    cropped: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'square',
    },
  },

  mounted() {
    if (this.cropped && this.$refs.croppieRef) {
      this.$refs.croppieRef
        .bind({
          url: this.cropped,
        })
        .catch(() => {
          this.$service.error('There is an error loading the image. Please try again')
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

        this.$refs.croppieRef.bind({
          url: e.target.result,
        })
      }

      reader.readAsDataURL(files[0])
    },

    updateImage() {
      const options = { format: 'jpeg', circle: true }
      this.$refs.croppieRef.result(options, output => {
        this.$emit('update:cropped', output)
      })
    },

    remove() {
      this.$refs.croppieRef.refresh()
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
