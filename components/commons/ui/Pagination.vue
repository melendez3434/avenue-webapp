<template>
  <div class="mt-12 w-full max-w-sm mx-auto">
    <ul class="flex items-center justify-between w-full">
      <li
        :class="{
          'text-avenue-grey': !prev,
          'text-avenue-white-light cursor-pointer': prev,
        }"
        @click="$emit('prev')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </li>
      <li
        :class="{
          'text-avenue-grey': !next,
          'text-avenue-white-light cursor-pointer': next,
        }"
        @click="$emit('next')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Pagination',

  props: {
    prev: {
      type: Boolean,
      required: true,
    },
    next: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
