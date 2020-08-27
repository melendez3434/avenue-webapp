<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <template v-if="!success">
      <R64Input
        v-model="form.email"
        label="Email Address"
        placeholder="user@example.com"
        name="email"
        :v="$v.form.email"
        error-message="Email address is required"
      />

      <R64Button :disabled="$v.form.$invalid" @click="sendResetEmail">
        Send Reset Email
      </R64Button>

      <div class="text-center text-sm text-gray-900 mt-4">
        Remember your password?
        <nuxt-link
          class="ml-1 no-underline border-b border-gray-900 text-gray-900"
          :to="{ name: 'login' }"
        >
          Click here to login
        </nuxt-link>
      </div>
    </template>

    <template v-else>
      <p class="text-center">Password reset link has been sent to {{ form.email }}.</p>
    </template>
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
      },
      success: false,
    }
  },

  methods: {
    sendResetEmail() {
      this.$axios.post('/api/auth/password/email', this.form).then(() => {
        this.success = true
      })
    },
  },

  validations: {
    form: {
      email: { email, required },
    },
  },
}
</script>
