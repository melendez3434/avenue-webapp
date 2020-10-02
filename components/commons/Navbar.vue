<template>
  <div class="w-full flex py-5 px-8">
    <div class="flex-1 uppercase">
      <nuxt-link as="h1" :to="{ name: 'index' }" class="text-avenue-white-light">
        The avenue
      </nuxt-link>
    </div>
    <nav class="flex space-x-5 items-center text-sm">
      <nuxt-link :to="{ name: 'index' }" class="uppercase text-avenue-white-light">shows</nuxt-link>
      <nuxt-link :to="{ name: 'artists' }" class="uppercase text-avenue-white-light">
        artists
      </nuxt-link>
      <!-- <nuxt-link href="#" class="uppercase text-avenue-white-light">search</nuxt-link> -->
      <nuxt-link
        v-if="!$auth.loggedIn"
        :to="{ name: 'login' }"
        class="bg-avenue-grey text-avenue-white-light rounded-lg py-1 px-2 uppercase"
      >
        log in
      </nuxt-link>
      <nuxt-link
        v-if="!$auth.loggedIn"
        :to="{ name: 'signup' }"
        class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
      >
        sign up
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
