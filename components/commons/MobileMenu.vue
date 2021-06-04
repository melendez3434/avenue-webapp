<template>
  <div>
    <IcMenu @click="open = true" />
    <div v-if="open" class="bg-theavenue-background-light absolute left-0 w-full pb-5">
      <div class="flex items-center justify-between" @click="open = false">
        <nuxt-link
          tag="h1"
          :to="{ name: 'index' }"
          class="pl-2 md:ml-0 text-avenue-white-light font-library uppercase text-lg md:text-2xl landscape:text-lg text-light-white cursor-pointer"
        >
          The avenue
        </nuxt-link>
        <IcClose aria-role="button" aria-label="close" />
      </div>
      <div class="flex flex-col items-center space-y-5 mt-5">
        <nuxt-link
          :to="{ name: 'events' }"
          class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        >
          Events
        </nuxt-link>
        <nuxt-link
          v-for="competition in competitions"
          :key="competition.id"
          :to="{ name: 'events-id', params: { id: competition.id } }"
          class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        >
          {{ competition.name }}
        </nuxt-link>
        <a
          v-for="category in categories"
          :key="category.name"
          :href="`/?category=${category.id}`"
          :to="{ name: 'index', query: { category: category.id } }"
          class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
          @click.prevent="setCategory(category)"
        >
          {{ category.name }}
        </a>
        <template v-if="$auth.loggedIn">
          <span
            class="uppercase text-theavenue-turquoise-neon font-library text-2xl hover:text-light-turquoise mt-1 focus:outline-none"
          >
            {{ $auth.user.name }}
          </span>
          <button
            v-if="$auth.user.has_confirmed_talent"
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
            @click="goToDashboard"
          >
            Dashboard
          </button>
          <button
            v-if="!$auth.user.talent_id"
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
            @click="startStreaming"
          >
            Sign Up to Stream
          </button>
          <button
            v-if="$auth.user.talent_id && !$auth.user.has_confirmed_talent"
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
            @click="completeStripe"
          >
            Complete Profile
          </button>
          <button
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
            @click="logout"
          >
            Log out
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-turquoise-neon text-light-turquoise border border-theavenue-turquoise-neon rounded-lg"
            @click="login"
          >
            Login
          </button>
          <button
            :to="{ name: 'signup' }"
            class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-yellow-neon text-light-yellow border border-theavenue-yellow-neon rounded-lg"
            @click="signUp"
          >
            Sign Up
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IcMenu from '@/assets/svg/hamburger.svg?inline'
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  name: 'MobileMenu',

  components: { IcMenu, IcClose },

  data() {
    return {
      open: false,
    }
  },

  computed: {
    ...mapState({
      categories: state => state.global.categories,
      competitions: state => state.global.competitions,
    }),
  },

  methods: {
    goToDashboard() {
      window.open(this.$config.baseURL)
    },

    async logout() {
      this.setBackToCompetition(false)
      this.setCurrentCompetition(null)
      await this.$auth.logout()
    },

    setCategory(category) {
      this.open = false
      this.$router.push({ name: 'index', query: { category: category.id } })
    },

    async completeStripe() {
      const { data: url } = await this.$api.talent.stripeAuthorize(this.$auth.user.talent_id)
      window.location.href = url
    },

    startStreaming() {
      this.open = false
      this.$modal.show('talent-signup-modal')
    },

    login() {
      this.open = false
      this.$modal.show('user-access-modal', { active: 'login' })
    },

    signUp() {
      this.open = false
      this.$modal.show('user-access-modal', { active: 'signup' })
    },

    ...mapActions({
      setBackToCompetition: 'global/setBackToCompetition',
      setCurrentCompetition: 'global/setCurrentCompetition',
    }),
  },
}
</script>
