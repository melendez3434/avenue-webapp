<template>
  <div class="w-full flex py-5 px-2 md:px-8 bg-theavenue-background-light">
    <div class="flex-1 flex items-center uppercase">
      <nuxt-link
        tag="h1"
        :to="{ name: 'index' }"
        class="text-avenue-white-light font-library uppercase text-2xl text-light-white cursor-pointer"
      >
        The avenue
      </nuxt-link>
    </div>
    <nav class="hidden lg:flex items-center text-sm">
      <MainMenu class="space-x-5" />
    </nav>
    <IcMenu class="lg:hidden" />
  </div>
</template>
<script>
import MainMenu from '@/components/commons/MainMenu'
import IcMenu from '@/assets/svg/hamburger.svg?inline'

export default {
  name: 'Navbar',

  components: { MainMenu, IcMenu },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
