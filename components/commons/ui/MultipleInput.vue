<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-3">
      <div class="w-full">
        <label for="link-0 text-xl">Social Networks *</label>
      </div>
      <button type="button" :disabled="maxLinksReached" class="mr-12" @click="addLink">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <div
      v-for="(input, index) in links"
      :key="index"
      :class="{ 'mt-3': index }"
      class="w-full flex flex-col md:flex-row"
    >
      <div class="w-full md:w-5/6 flex flex-col lg:flex-row mt-2">
        <div class="flex-1 md:mr-6">
          <label for="`link-${index}-name`" class="text-sm">
            Name
          </label>
          <R64Select v-model="input.social_media_slug" :options="socialNetworkList" />
          <!-- <input
            :id="`link-${index}-name`"
            v-model="input.name"
            class=" leading-snug outline-none px-3 py-3 block w-full text-white rounded-md focus:shadow-outline focus:border-blue-400 border border-gray-400 placeholder-gray-400"
          /> -->
        </div>
        <div class="flex-1">
          <R64Input
            :id="`link-${index}-url`"
            v-model="input.url"
            label="Link"
            base-class="h-38px leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-avenue-grey rounded-md focus:shadow-outline focus:border-blue-400 uppercase"
            wrapper-class="mb-0"
          />
        </div>
      </div>
      <div class="w-full md:w-1/6 md:pl-10 flex mt-6">
        <div class="flex items-center h-full">
          <span
            :class="{
              'opacity-25': minLinksReached,
              'cursor-pointer': !minLinksReached,
            }"
            class="text-2xl"
            @click="removeLink(index)"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultipleInput',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    socialNetworkList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      links: [{ social_media_slug: '', url: '' }],
      maxLinks: 8,
    }
  },

  computed: {
    minLinksReached() {
      return this.links.length === 1
    },

    maxLinksReached() {
      return this.links.length === this.maxLinks
    },
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.links = newValue
      },
    },
  },

  methods: {
    addLink() {
      if (this.maxLinksReached) return

      this.links.push({ social_media_slug: '', url: '' })
      this.$emit('input', this.links)
    },

    removeLink(index) {
      if (this.minLinksReached) return

      this.links.splice(index, 1)
      this.$emit('input', this.links)
    },
  },
}
</script>
