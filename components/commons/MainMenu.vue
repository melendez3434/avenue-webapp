<template>
  <div>
    <client-only>
      <el-dropdown trigger="click" placement="top-start">
        <div class="flex items-center" @click="fetchTalents">
          <span
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
          >
            Artists
          </span>
          <IcArrowDown class="w-10 h-10" />
        </div>
        <el-dropdown-menu slot="dropdown" class="w-80">
          <fieldset class="w-full flex justify-center items-center">
            <input
              type="text"
              class="w-10/12 rounded bg-theavenue-background-extra-light h-9 relative text-white text-xs p-2"
            />
            <SearchIcon class="w-6 h-6 absolute right-8 cursor-pointer" />
          </fieldset>
          <el-dropdown-item v-for="talent in talents" :key="talent.id">
            <nuxt-link :to="{ name: 'artist-id', params: { id: talent.id } }">
              {{ talent.name }}
            </nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" placement="top-start">
        <div class="flex items-center">
          <span
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
          >
            {{ activeItem }}
          </span>
          <IcArrowDown class="w-10 h-10" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="category in categoriesFormatted" :key="category.name">
            <nuxt-link :to="{ name: 'index', query: { category: category.id } }">
              {{ category.name }}
            </nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="$auth.loggedIn" trigger="click" placement="top-start">
        <span
          class="uppercase text-theavenue-turquoise-neon font-library text-2xl hover:text-light-turquoise mt-1 focus:outline-none cursor-pointer"
        >
          {{ $auth.user.name }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="$auth.user.has_confirmed_talent">
            <button @click="goToDashboard">
              Dashboard
            </button>
          </el-dropdown-item>
          <el-dropdown-item>
            <button v-if="!$auth.user.talent_id" @click="$modal.show('talent-signup-modal')">
              Start Streaming
            </button>
          </el-dropdown-item>
          <el-dropdown-item>
            <button
              v-if="$auth.user.talent_id && !$auth.user.has_confirmed_talent"
              @click="completeStripe"
            >
              Complete Profile
            </button>
          </el-dropdown-item>
          <el-dropdown-item>
            <button @click="logout">
              Log out
            </button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
import { mapState } from 'vuex'
import IcArrowDown from '@/assets/svg/arrow_down.svg?inline'
import SearchIcon from '@/assets/svg/search.svg?inline'

export default {
  name: 'MainMenu',

  components: {
    IcArrowDown,
    SearchIcon,
  },

  data() {
    return {
      activeItem: 'All Genres',
      talents: [],
    }
  },

  computed: {
    ...mapState({
      categories: state => state.global.categories,
    }),

    isAllGenres() {
      return this.activeItem === 'All Genres'
    },

    categoriesFormatted() {
      const categories = this.categories.filter(c =>
        !this.isAllGenres ? c.name !== this.activeItem : true
      )

      if (!this.isAllGenres) {
        categories.unshift({ name: 'All Genres', id: null })
      }

      return categories
    },
  },

  watch: {
    '$route.query.category': {
      immediate: true,
      handler(category) {
        if (category) {
          const currentCategory = this.categories.find(c => c.id === Number(category))
          this.activeItem = currentCategory ? currentCategory.name : 'All Genres'
          return
        }

        this.activeItem = 'All Genres'
      },
    },
  },

  methods: {
    goToDashboard() {
      window.open(this.$config.baseURL)
    },

    async logout() {
      await this.$auth.logout()
    },

    async completeStripe() {
      const { data: url } = await this.$api.talent.stripeAuthorize(this.$auth.user.talent_id)
      window.location.href = url
    },

    async fetchTalents() {
      try {
        const { data: talents } = await this.$api.talent.list({ all: true })
        this.talents = talents
      } catch {
        console.log('Sorry. Something went wrong when fetching the talents')
      }
    },
  },
}
</script>
<style>
.el-popper.el-dropdown-menu {
  @apply bg-theavenue-background-light;
  @apply border-none;
}

.el-popper.el-dropdown-menu .el-dropdown-menu__item {
  @apply uppercase;
  @apply font-library;
  @apply text-3xl;
  @apply text-theavenue-gray;
  @apply mb-5;
}

.popper__arrow {
  display: hidden;
  visibility: hidden;
}

.el-popper.el-dropdown-menu .el-dropdown-menu__item:focus,
.el-popper.el-dropdown-menu .el-dropdown-menu__item:not(.is-disabled):hover {
  @apply bg-transparent;
  @apply text-theavenue-white;
}
</style>
