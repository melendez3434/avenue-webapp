<template>
  <div>
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
      :to="{ name: 'index' }"
      class="uppercase text-avenue-white-light font-library text-2xl text-light-white"
    >
      Stand-Up
    </nuxt-link>
    <client-only>
      <template v-if="$auth.loggedIn">
        <button
          v-if="!$auth.user.talent_id"
          class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
          @click="$modal.show('talent-signup-modal')"
        >
          Sign up as a Talent
        </button>
        <button
          v-if="$auth.user.talent_id && !$auth.user.has_confirmed_talent"
          class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
          @click="completeStripe"
        >
          Complete Sign up
        </button>
        <button
          class="bg-avenue-white-light text-avenue-black-light rounded-lg py-1 px-2 uppercase"
          @click="logout"
        >
          Log out
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-turquoise-neon text-light-turquoise border border-theavenue-turquoise-neon rounded-lg"
          @click="$modal.show('user-access-modal', { active: 'login' })"
        >
          Login
        </button>
        <button
          :to="{ name: 'signup' }"
          class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-yellow-neon text-light-yellow border border-theavenue-yellow-neon rounded-lg"
          @click="$modal.show('user-access-modal', { active: 'signup' })"
        >
          Sign Up
        </button>
      </template>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',

  methods: {
    async logout() {
      await this.$auth.logout()
    },

    async completeStripe() {
      const { data: url } = await this.$api.talent.stripeAuthorize(this.$auth.user.talent_id)
      window.location.href = url
    },
  },
}
</script>
