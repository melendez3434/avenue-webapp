<template>
  <div
    class="w-full flex landscape:h-12 md:h-20 md:py-5 py-2 lg:px-8 bg-theavenue-background-light relative"
  >
    <div class="flex-1 flex items-center uppercase">
      <nuxt-link
        tag="h1"
        :to="{ name: 'index' }"
        class="whitespace-no-wrap pl-2 md:ml-0 mr-4 text-avenue-white-light font-library uppercase text-lg md:text-2xl landscape:text-lg text-light-white cursor-pointer"
      >
        The avenue
      </nuxt-link>
      <section class="flex flex-row items-center">
        <a
          class="ml-3"
          href="https://m.facebook.com/The-Avenue-Live-104529974684723/?tsid=0.19766261221210102&source=result"
          target="_blank"
        >
          <Facebook class="w-4 h-4 sm:w-6 sm:h-6" />
        </a>
        <a
          class="ml-3"
          href="https://instagram.com/theavenuelive?igshid=12ufzffu2aygl"
          target="_blank"
        >
          <Instagram class="w-5 h-5 sm:w-7 sm:h-7" />
        </a>
        <a class="ml-3" href="https://www.linkedin.com/company/theavenuelive/" target="_blank">
          <Linkedin class="w-4 h-4 sm:w-6 sm:h-6" />
        </a>
      </section>
    </div>
    <nav class="hidden lg:flex items-center text-sm">
      <client-only>
        <MainMenu class="space-x-5" />
      </client-only>
    </nav>
    <MobileMenu class="flex lg:hidden w-full justify-end z-20" />
  </div>
</template>
<script>
import MainMenu from '@/components/commons/MainMenu'
import MobileMenu from '@/components/commons/MobileMenu'
import Facebook from '@/assets/svg/facebook.svg?inline'
import Instagram from '@/assets/svg/instagram.svg?inline'
import Linkedin from '@/assets/svg/linkedin.svg?inline'
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',

  components: { MainMenu, MobileMenu, Facebook, Linkedin, Instagram },

  methods: {
    async logout() {
      this.setBackToCompetition(false)
      await this.$auth.logout()
    },

    ...mapActions({
      setBackToCompetition: 'global/setBackToCompetition',
    }),
  },
}
</script>
