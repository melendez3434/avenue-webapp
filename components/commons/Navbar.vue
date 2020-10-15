<template>
  <div class="w-full flex py-5 md:px-8 bg-theavenue-background-light">
    <div class="flex-1 flex items-center uppercase">
      <nuxt-link
        tag="h1"
        :to="{ name: 'index' }"
        class="pl-2 md:ml-0 text-avenue-white-light font-library uppercase text-2xl text-light-white cursor-pointer"
      >
        The avenue
      </nuxt-link>
    </div>
    <nav class="hidden lg:flex items-center text-sm">
      <MainMenu class="space-x-5" />
    </nav>
    <MobileMenu class="lg:hidden" />
  </div>
</template>
<script>
import MainMenu from '@/components/commons/MainMenu'
import MobileMenu from '@/components/commons/MobileMenu'

export default {
  name: 'Navbar',

  components: { MainMenu, MobileMenu },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
