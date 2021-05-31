<template>
  <div class="flex items-center justify-end">
    <client-only>
      <el-dropdown trigger="click" placement="top-start">
        <div class="flex items-center">
          <span
            class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
          >
            Competitions
          </span>
          <IcArrowDown class="w-10 h-10" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="competition in competitions" :key="competition.name">
            <nuxt-link :to="{ name: 'events-id', params: { id: competition.id } }">
              {{ competition.name }}
            </nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
          <fieldset class="w-full flex justify-center items-center mb-4">
            <input45
              v-model="search"
              placeholder="search artists"
              type="text"
              class="w-11/12 rounded bg-white h-9 relative text-grey-dark text-xs p-2 placeholder-gray-500"
              @keyup="fetchTalents"
            />
            <IcSearch class="w-6 h-6 absolute right-6 cursor-pointer" />
          </fieldset>
          <base-spinner v-if="isLoading" />
          <TalentsDropdown :talents="talents" />
          <nuxt-link
            v-if="showViewAll"
            :to="{ name: 'artists' }"
            class="text-base text-theavenue-gray ml-4 hover:text-white"
          >
            View All
          </nuxt-link>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" placement="top-start">
        <div class="flex items-center">
          <span
            class="whitespace-no-wrap uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
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
              Sign Up to Stream
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
          class="py-0.5 px-3 font-library uppercase text-2xl text-theavenue-yellow-neon text-light-yellow border border-theavenue-yellow-neon rounded-lg whitespace-no-wrap"
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
import IcSearch from '@/assets/svg/search.svg?inline'
import debounce from 'lodash/debounce'

export default {
  name: 'MainMenu',

  components: {
    IcArrowDown,
    IcSearch,
  },

  data() {
    return {
      activeItem: 'All Genres',
      search: '',
      isLoading: false,
      talents: [],
    }
  },

  computed: {
    ...mapState({
      categories: state => state.global.categories,
      competitions: state => state.global.competitions,
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

    showViewAll() {
      return this.search.length === 0 && this.talents.length > 0
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

    fetchTalents: debounce(async function() {
      this.isLoading = true
      try {
        const { data: talents } = await this.$api.talent.list({
          items_per_page: 10,
          name: this.search || null,
        })
        this.talents = talents
      } catch {
        console.error('Sorry. Something went wrong when fetching the talents')
      }
      this.isLoading = false
    }, 500),
  },
}
</script>
<style scoped>
.el-popper.el-dropdown-menu {
  @apply bg-theavenue-background-light;
  @apply border-gray-100;
}

.el-popper.el-dropdown-menu .el-dropdown-menu__item {
  @apply uppercase;
  @apply font-library;
  @apply text-3xl;
  @apply text-theavenue-gray;
  @apply my-5;
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
