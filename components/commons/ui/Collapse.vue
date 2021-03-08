<template>
  <div class="collapse">
    <div
      :class="{ 'rounded-b-none': open, 'pr-4 py-4 sm:pr-6': noGap }"
      class="flex items-center bg-avenue-blue-dark rounded transition duration-150 ease-in-out collapse__header px-4 py-3"
      @click="toggle"
    >
      <div v-show="showArrow" class="w-6 md:w-12">
        <svg
          :class="{ 'origin-center transform rotate-180': !open }"
          class="text-gray-500 transition duration-150 ease-in-out"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="min-w-0 flex-1 flex items-center cursor-pointer">
        <slot name="header" />
      </div>
    </div>
    <div
      v-if="open"
      :class="{ 'pl-16': indentContent }"
      class="pb-4 text-sm leading-5 bg-avenue-black-light px-4 py-3"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapse',

  props: {
    border: {
      type: [String, Boolean],
      default: false,
    },
    indentContent: {
      type: Boolean,
      default: false,
    },
    noGap: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      open: false,
    }
  },

  computed: {
    showArrow() {
      return !!this.$slots.default
    },
  },

  methods: {
    toggle() {
      if (!this.showArrow) return
      this.open = !this.open
    },
  },
}
</script>

<style lang="postcss">
.no-border-collapse {
  .collapse {
    &__header {
      @apply border-0 p-0 items-baseline;
    }
    &__content {
      @apply border-0 p-0;
    }
  }
}
</style>
