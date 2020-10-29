<template>
  <div class="w-full bg-theavenue-background py-6">
    <footer
      class="container mx-auto flex justify-around md:justify-end md:space-x-8 text-xs md:text-base"
    >
      <nuxt-link
        :to="{ name: 'about-us' }"
        class="text-center uppercase text-avenue-white-light font-library hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        About us
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'privacy' }"
        class="text-center uppercase text-avenue-white-light font-library hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        Privacy policy
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'tos' }"
        class="text-center uppercase text-avenue-white-light font-library hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        Terms of service
      </nuxt-link>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
