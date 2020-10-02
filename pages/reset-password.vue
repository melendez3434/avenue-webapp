<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
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
    />

    <R64Button :disabled="$v.form.$invalid" @click="resetPassword">
      Reset
    </R64Button>
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
          this.$router.push({
            name: 'login',
            params: {
              newPassword: true,
            },
          })
        })
        .catch(e => {
          console.log(e)
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
