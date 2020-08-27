<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <R64Input
      v-model="form.email"
      label="Email Address"
      placeholder="user@example.com"
      name="email"
      :v="$v.form.email"
      error-message="A valid email address is required"
    />

    <R64Input
      v-model="form.password"
      type="password"
      label="Password"
      placeholder="*********"
      name="password"
      :v="$v.form.password"
      error-message="Password is required"
    />

    <R64Button :disabled="$v.form.$invalid" @click="login">
      Login
    </R64Button>

    <div class="text-center text-sm text-gray-900 mt-4">
      Forgot your password?
      <nuxt-link
        class="ml-1 no-underline border-b border-gray-900 text-gray-900"
        :to="{ name: 'forgot' }"
      >
        Click here to reset
      </nuxt-link>
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
