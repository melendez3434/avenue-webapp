<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="bg-avenue-black-light rounded-lg py-12 px-6 w-96">
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

      <R64Button class="mt-8" :disabled="$v.form.$invalid" @click="login">
        Login
      </R64Button>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  auth: false,

  name: 'AuthLogin',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('sanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        this.$router.push({ path: '/' })
      } catch (e) {
        console.log(e)
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
