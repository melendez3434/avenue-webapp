<template>
  <div>
    <IcMenu @click="open = true" />
    <div v-if="open" class="bg-theavenue-background-light absolute left-0 w-full pb-5">
      <div class="flex items-center justify-between" @click="open = false">
        <nuxt-link
          tag="h1"
          :to="{ name: 'index' }"
          class="pl-2 md:ml-0 text-avenue-white-light font-library uppercase text-2xl text-light-white cursor-pointer"
        >
          The avenue
        </nuxt-link>
        <IcClose />
      </div>
      <MainMenu class="flex flex-col items-center space-y-5 mt-5" @click.native="open = false" />
    </div>
  </div>
</template>

<script>
import MainMenu from '@/components/commons/MainMenu'
import IcMenu from '@/assets/svg/hamburger.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'MobileMenu',

  components: { MainMenu, IcMenu, IcClose },

  data() {
    return {
      open: false,
    }
  },
}
</script>
