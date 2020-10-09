<template>
  <form @submit="login">
    <R64Input
      v-model="form.email"
      label="Email"
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
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',

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
        this.$modal.hide('user-access-modal')
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
