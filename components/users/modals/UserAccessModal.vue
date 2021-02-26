<template>
  <div class="relative">
    <div class="absolute text-theavenue-white top-0 right-0 mt-4 mr-6">
      <IcClose
        class="cursor-pointer"
        aria-role="button"
        aria-label="close"
        @click="$modal.hide('user-access-modal')"
      />
    </div>
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
      <LoginForm v-if="isLoginActive" @active="active = $event" />
      <SignUpForm v-if="isSignUpActive" />
      <ForgotPasswordForm v-if="isForgotPasswordActive" />
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/users/LoginForm'
import SignUpForm from '@/components/users/SignUpForm'
import ForgotPasswordForm from '@/components/users/ForgotPasswordForm'
import IcClose from '@/assets/svg/close_2.svg?inline'

export default {
  name: 'UserAccessModal',

  components: {
    LoginForm,
    SignUpForm,
    ForgotPasswordForm,
    IcClose,
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
      active: 'forgot-password',
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

    isForgotPasswordActive() {
      return this.active === 'forgot-password'
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
