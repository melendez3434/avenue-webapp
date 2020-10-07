<template>
  <div class="w-full flex py-5 px-8 bg-theavenue-background-light">
    <div class="flex-1 flex items-center uppercase">
      <nuxt-link
        tag="h1"
        :to="{ name: 'index' }"
        class="text-avenue-white-light font-library uppercase text-2xl text-light-white cursor-pointer"
      >
        The avenue
      </nuxt-link>
    </div>
    <nav class="flex space-x-5 items-center text-sm">
      <nuxt-link
        :to="{ name: 'index' }"
        class="uppercase text-avenue-white-light font-library text-2xl text-light-white"
      >
        Music
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'index' }"
        class="uppercase text-avenue-white-light font-library text-2xl text-light-white"
      >
        Food
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'artists' }"
        class="uppercase text-avenue-white-light font-library text-2xl text-light-white"
      >
        Stand-Up
      </nuxt-link>
      <button
        v-if="!$auth.loggedIn"
        type="button"
        class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-turquoise-neon text-light-turquoise border border-theavenue-turquoise-neon rounded-lg"
        @click="$modal.show('login-modal')"
      >
        Login
      </button>
      <nuxt-link
        v-if="!$auth.loggedIn"
        :to="{ name: 'signup' }"
        class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-yellow-neon text-light-yellow border border-theavenue-yellow-neon rounded-lg"
      >
        Sign Up
      </nuxt-link>
      <nuxt-link
        v-if="$auth.loggedIn"
        class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
        :to="{ name: 'talent' }"
      >
        Sign up as a Talent
      </nuxt-link>
      <button
        v-if="$auth.loggedIn"
        class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
        @click="logout"
      >
        Log out
      </button>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',

  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
