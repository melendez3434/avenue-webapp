<template>
  <form @submit="register">
    <R64Input
      v-model="form.name"
      label="Name"
      name="name"
      :v="$v.form.name"
      error-message="Your name is required"
      help="This is the name people will know you by when you post comments or make donations."
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

    <R64Input
      v-model="form.confirmPassword"
      type="password"
      label="Confirm password"
      name="confirm-password"
      class="mt-8"
      :v="$v.form.confirmPassword"
      error-message="Passwords should match"
    />

    <R64Input
      v-model="form.email"
      class="mt-8"
      label="Email Address"
      name="email"
      :v="$v.form.email"
      error-message="A valid email address is required"
    />

    <p v-if="error" class="bg-avenue-red text-white rounded py-1 px-3 mt-3 text-center">
      {{ error }}
    </p>

    <p class="text-avenue-grey-dark text-xxs text-center mt-8">
      By clicking Sign Up, you are indicating that you have read and acknowledge the
      <a href="#" class="text-avenue-white-light">Terms and Service</a>
      and
      <a href="#" class="text-avenue-white-light">Privacy Notice</a>
    </p>

    <R64Button type="submit" class="mt-8 uppercase" :disabled="$v.form.$invalid">
      Sign up
    </R64Button>
  </form>
</template>
<script>
import { email, required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',

  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      },
      error: null,
    }
  },

  methods: {
    async register(e) {
      e.preventDefault()
      try {
        await this.$api.signup.register(this.form)
        await this.$auth.loginWith('sanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        this.$modal.hide('user-access-modal')
      } catch (e) {
        this.error = e.response.data.error
      }
    },
  },

  validations: {
    form: {
      name: { required },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      email: { email, required },
    },
  },
}
</script>
