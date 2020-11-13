<template>
  <div class="flex flex-col items-center min-h-screen bg-theavenue-background-extra-light">
    <div class="max-w-md w-full mt-5 md:mt-20">
      <R64Input
        v-model="form.password"
        type="password"
        label="New Password"
        placeholder="********"
        :v="$v.form.password"
        error-message="Password is required"
      />

      <R64Input
        v-model="form.password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="********"
        :v="$v.form.password_confirmation"
        error-message="Passwords must match"
        class="mt-5"
      />

      <div v-if="error" class="mb-6 text-theavenue-red-neon text-center">{{ error }}</div>

      <R64Button class="mt-5" :disabled="$v.form.$invalid" full @click="resetPassword">
        Reset
      </R64Button>
    </div>
  </div>
</template>

<script>
import { sameAs, required } from 'vuelidate/lib/validators'

export default {
  auth: false,

  name: 'ResetPassword',

  data() {
    return {
      form: {
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
    }
  },

  created() {
    const { email, token } = this.$route.query
    this.form.email = email
    this.form.token = token
  },

  methods: {
    resetPassword() {
      this.$api.forgotPassword
        .reset(this.form)
        .then(() => {
          this.error = null
          this.$router.push({
            name: 'index',
            query: {
              newPassword: true,
            },
          })
        })
        .catch(e => {
          this.error = e.response.data.error
        })
    },
  },

  async middleware({ store, redirect, route, app }) {
    if (store.state.auth.loggedIn) {
      return redirect('/')
    }

    const { email, token } = route.query

    await app.$api.forgotPassword
      .isValidToken({
        email,
        token,
      })
      .catch(e => {
        return redirect('/')
      })
  },

  validations: {
    form: {
      password: { required },
      password_confirmation: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
}
</script>
