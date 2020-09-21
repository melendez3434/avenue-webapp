<template>
  <div class="w-full flex py-5 px-8">
    <div class="flex-1 uppercase">
      <h1 class="text-avenue-white-light">The avenue</h1>
    </div>
    <nav class="flex space-x-5 items-center text-sm">
      <a href="#" class="uppercase text-avenue-white-light">shows</a>
      <a href="#" class="uppercase text-avenue-white-light">artists</a>
      <a href="#" class="uppercase text-avenue-white-light">search</a>
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
