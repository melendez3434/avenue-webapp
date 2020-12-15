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
      v-model="form.cellphone"
      label="Cell Phone"
      name="phone"
      :v="$v.form.cellphone"
      error-message="Your phone is required"
      help="This is the phone the avenue will send you SMS reminders."
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

    <R64Input
      v-model="form.confirmPassword"
      type="password"
      label="Confirm password"
      name="confirm-password"
      class="mt-8"
      :v="$v.form.confirmPassword"
      error-message="Passwords should match"
    />

    <div class="mt-8">
      <label class="block leading-tight text-white">Date of birth</label>
      <v-date-picker v-model="form.date_of_birth" color="red" type="date" />
    </div>

    <p v-if="error" class="bg-avenue-red text-white rounded py-1 px-3 mt-3 text-center">
      {{ error }}
    </p>

    <div class="my-6 flex">
      <R64Checkbox
        :value="form.scout_agreement"
        label="I'm a talent scout"
        wrapper-class="mr-3 mt-0.5"
        label-class="hidden"
        :v="$v.form.scout_agreement"
        @change="form.scout_agreement = $event"
      />
      <label for="">I'm a Talent Scout</label>
    </div>

    <div class="w-full flex items-center justify-center mt-8">
      <p class="text-theavenue-off-white text-xxs text-center w-1/2">
        By clicking Sign Up, you are indicating that you have read and acknowledge the
        <nuxt-link
          v-if="form.scout_agreement.checked"
          :to="{ name: 'scout-agreement' }"
          class="text-theavenue-white font-medium"
          target="_blank"
        >
          Scout Agreement
        </nuxt-link>
        <nuxt-link :to="{ name: 'tos' }" class="text-theavenue-white font-medium">
          Terms and Service
        </nuxt-link>
        and
        <nuxt-link :to="{ name: 'privacy' }" class="text-theavenue-white font-medium">
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
import { email, required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',

  data() {
    return {
      form: {
        email: '',
        cellphone: '',
        password: '',
        confirmPassword: '',
        name: '',
        date_of_birth: '',
        talent_scout: false,
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
        await this.$auth.loginWith('sanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        this.busy = false
        this.$modal.hide('user-access-modal')
        this.$modal.show('streaming-profile-modal')
      } catch (e) {
        this.error = e.response.data.error
        this.busy = false
      }
    },
  },

  validations: {
    form: {
      name: { required },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      email: { email, required },
      cellphone: { required },
    },
  },
}
</script>
