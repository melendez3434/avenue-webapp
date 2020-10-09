<template>
  <div class="px-6 py-10">
    <div class="flex space-x-6">
      <button
        class="uppercase text-lg pb-0.5 border-b-2"
        :class="{
          'border-theavenue-white': isLoginActive,
          'border-transparent': !isLoginActive,
        }"
        @click="active = 'login'"
      >
        Login
      </button>
      <button
        class="uppercase text-lg pb-0-5 border-b-2"
        :class="{
          'border-theavenue-white': isSignUpActive,
          'border-transparent': !isSignUpActive,
        }"
        @click="active = 'signup'"
      >
        Sign up
      </button>
    </div>
    <div class="mt-8">
      <LoginForm v-if="isLoginActive" />
      <SignUpForm v-if="isSignUpActive" />
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/users/LoginForm'
import SignUpForm from '@/components/users/SignUpForm'

export default {
  name: 'UserAccessModal',

  components: {
    LoginForm,
    SignUpForm,
  },

  props: {
    activeTab: {
      type: String,
      default: 'login',
    },
  },

  data() {
    return {
      active: 'login',
    }
  },

  computed: {
    isLoginActive() {
      return this.active === 'login'
    },

    isSignUpActive() {
      return this.active === 'signup'
    },
  },

  watch: {
    activeTab: {
      immediate: true,
      handler() {
        this.active = this.activeTab
      },
    },
  },
}
</script>
