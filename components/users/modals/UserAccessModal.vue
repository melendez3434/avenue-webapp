<template>
  <div class="px-6 py-10">
    <div class="flex space-x-6">
      <button
        class="uppercase text-lg pb-0.5 border-b-2"
        :class="{
          'border-theavenue-white': active === 'login',
          'border-transparent': active !== 'login',
        }"
      >
        Login
      </button>
      <button
        class="uppercase text-lg pb-0-5 border-b-2"
        :class="{
          'border-theavenue-white': active === 'signup',
          'border-transparent': active !== 'signup',
        }"
      >
        Sign up
      </button>
    </div>
    <div class="mt-8">
      <LoginForm />
    </div>
  </div>
</template>
<script>
import LoginForm from '@/components/users/LoginForm'

export default {
  name: 'UserAccessModal',

  components: {
    LoginForm,
  },

  data() {
    return {
      active: 'login',
    }
  },
}
</script>
