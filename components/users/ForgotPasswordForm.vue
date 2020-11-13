<template>
  <div>
    <template v-if="!success">
      <form @submit.prevent="sendResetEmail">
        <R64Input
          v-model="form.email"
          label="Email Address"
          name="email"
          :v="$v.form.email"
          error-message="A valid email address is required"
        />

        <R64Button type="submit" class="mt-5" :disabled="$v.form.$invalid" full>
          Send Reset Email
        </R64Button>
      </form>
    </template>

    <template v-else>
      <p class="text-center">Password reset link has been sent to {{ form.email }}.</p>
    </template>
  </div>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Forgot',

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
