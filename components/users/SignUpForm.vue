<template>
  <form class="pb-16 md:pb-0" @submit="register">
    <div v-if="form.scout_token" class="mb-8">
      <span class="font-bold">Scout:</span>
      <span>{{ $route.params.name }}</span>
    </div>
    <R64Input
      v-model="form.name"
      label="Name"
      name="name"
      :v="$v.form.name"
      error-message="Your name is required"
      help="This is the name people will know you by when you post comments or make donations."
    />

    <R64Input
      v-model="form.email"
      class="mt-8"
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

    <p v-if="error" class="bg-avenue-red text-white rounded py-1 px-3 mt-3 text-center">
      {{ error }}
    </p>

    <div class="w-full flex items-center justify-center mt-8">
      <p class="text-theavenue-off-white text-xs text-center w-2/3">
        By clicking Sign Up, you are indicating that you have read and acknowledge the
        <nuxt-link :to="{ name: 'tos' }" class="text-theavenue-white font-medium" target="_blank">
          Terms and Service
        </nuxt-link>
        and
        <nuxt-link
          :to="{ name: 'privacy' }"
          class="text-theavenue-white font-medium"
          target="_blank"
        >
          Privacy Notice
        </nuxt-link>
      </p>
    </div>

    <R64Button
      type="submit"
      class="mt-8 uppercase"
      :disabled="$v.form.$invalid"
      full
      :loading="busy"
    >
      Sign up
    </R64Button>
  </form>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',

  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        scout_token: this.$route.params.token || null,
      },
      error: null,
      busy: false,
    }
  },

  methods: {
    async register(e) {
      e.preventDefault()
      try {
        this.busy = true
        await this.$api.signup.register(this.form)
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        await this.$auth.fetchUser()

        this.busy = false
        this.$modal.hide('user-access-modal')
        this.$modal.show('streaming-profile-modal')
      } catch (e) {
        console.log(e)
        this.error = e.response.data.error
        this.busy = false
      }
    },
  },

  validations: {
    form: {
      name: { required },
      password: { required },
      email: { email, required },
    },
  },
}
</script>
