<template>
  <form @submit.prevent="login">
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

    <button
      type="button"
      class="text-avenue-white text-xs"
      @click="$emit('active', 'forgot-password')"
    >
      Trouble logging in?
    </button>

    <p v-if="error" class="bg-avenue-red text-white rounded py-1 px-3 mt-3 text-center">
      {{ error }}
    </p>

    <R64Button type="submit" class="mt-8" :disabled="$v.form.$invalid" full :loading="busy">
      Login
    </R64Button>
  </form>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'LoginForm',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
      busy: false,
    }
  },

  computed: {
    ...mapState({
      backToCompetitionSignup: state => state.global.backToCompetitionSignup,
      currentCompetition: state => state.global.currentCompetition,
    }),
  },

  methods: {
    async login() {
      try {
        this.busy = true
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        await this.$auth.fetchUser()
        this.error = null
        this.busy = false
        this.$modal.hide('user-access-modal')
        if (this.backToCompetitionSignup) {
          return this.$modal.show('join-event-modal', { competition: this.currentCompetition })
        }
      } catch (e) {
        this.error = e.response ? e.response.data.error : null
        this.busy = false
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
