<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="bg-avenue-black-light rounded-lg py-10 px-6 w-96">
      <div class="flex uppercase space-x-6 mb-10 text-avenue-white">
        <nuxt-link :to="{ name: 'login' }">Log in</nuxt-link>
        <nuxt-link :to="{ name: 'signup' }">Sign Up</nuxt-link>
      </div>
      <form @submit="login">
        <R64Input
          v-model="form.email"
          label="Email Address"
          name="email"
          :v="$v.form.email"
          error-message="A valid email address is required"
        />

        <R64Input
          v-model="form.password"
          type="password"
          label="Password"
          name="password"
          class="mt-8"
          :v="$v.form.password"
          error-message="Password is required"
        />

        <nuxt-link class="text-avenue-white text-xs" :to="{ name: 'forgot' }">
          Trouble logging in?
        </nuxt-link>

        <p v-if="error" class="bg-avenue-red text-white rounded py-1 px-3 mt-3 text-center">
          {{ error }}
        </p>

        <R64Button type="submit" class="mt-8" :disabled="$v.form.$invalid">
          Login
        </R64Button>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  auth: 'guest',

  name: 'AuthLogin',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    }
  },

  methods: {
    async login(e) {
      e.preventDefault()
      try {
        await this.$auth.loginWith('sanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        this.error = null
        this.$router.push({ path: '/' })
      } catch (e) {
        this.error = e.response.data.error
      }
    },
  },

  validations: {
    form: {
      email: { email, required },
      password: { required },
    },
  },
}
</script>
<style scoped>
.nuxt-link-exact-active {
  @apply border-b-2;
  @apply border-avenue-white;
}
</style>
