<template>
  <div>
    <div class="px-6 py-10 bg-theavenue-background">
      <p v-if="heading.subtitle" class="text-sm leading-5">{{ heading.subtitle }}</p>
      <p class="text-2xl leading-tight font-medium">{{ heading.title }}</p>
    </div>
    <div class="flex space-x-6 px-6 pt-10">
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
    <div class="mt-8 px-6 pb-10">
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
    title: {
      type: String,
      default: 'Welcome to The Avenue',
    },
    subtitle: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      active: 'login',
      heading: {
        title: '',
        subtitle: '',
      },
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
    title: {
      immediate: true,
      handler() {
        this.heading.title = this.title
      },
    },
    subtitle: {
      immediate: true,
      handler() {
        this.heading.subtitle = this.subtitle
      },
    },
  },
}
</script>
