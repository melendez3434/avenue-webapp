<template>
  <div>
    <client-only>
      <el-dropdown trigger="click" placement="top-start">
        <span
          class="uppercase text-avenue-white-light font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        >
          {{ activeItem }}
        </span>
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

export default {
  name: 'MainMenu',

  data() {
    return {
      activeItem: 'All Genres',
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

    setCategory(category) {
      this.$router.push({ name: 'index', params: { query: category.id } })
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
