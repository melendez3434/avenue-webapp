<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="bg-avenue-black-light rounded-lg py-10 px-6 w-96">
      <div class="flex uppercase space-x-6 mb-10 text-white">
        <nuxt-link :to="{ name: 'login' }">Log in</nuxt-link>
        <nuxt-link :to="{ name: 'signup' }">Sign Up</nuxt-link>
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

      <div class="flex flex-col mt-8">
        <label for="month" class="uppercase text-avenue-white">Date of birth</label>
        <div class="flex space-x-2">
          <R64Select
            v-model="form.month"
            class="w-2/4"
            :options="monthsFormatted"
            name="month"
            :v="$v.form.month"
          />
          <R64Input
            v-model="form.day"
            name="day"
            :v="$v.form.day"
            class="w-1/4"
            placeholder="day"
          />
          <R64Input
            v-model="form.year"
            name="year"
            :v="$v.form.year"
            class="w-1/4"
            placeholder="year"
          />
        </div>
      </div>

      <R64Input
        v-model="form.email"
        class="mt-8"
        label="Email Address"
        name="email"
        :v="$v.form.email"
        error-message="A valid email address is required"
      />

      <p class="text-avenue-grey-dark text-xxs text-center mt-8">
        By clicking Sign Up, you are indicating that you have read and acknowledge the
        <a href="#" class="text-avenue-white-light">Terms and Service</a>
        and
        <a href="#" class="text-avenue-white-light">Privacy Notice</a>
      </p>

      <R64Button class="mt-8" :disabled="$v.form.$invalid" @click="login">
        Login
      </R64Button>
    </div>
  </div>
</template>

<script>
import { email, required, sameAs, not } from 'vuelidate/lib/validators'

export default {
  auth: false,

  name: 'PageSignup',

  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        month: '',
        day: '',
        year: '',
      },
      months: [
        'MONTH',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  },

  computed: {
    monthsFormatted() {
      return this.months.map(m => ({
        label: m,
        value: m.toLowerCase() === 'month' ? '' : m.toLowerCase(),
      }))
    },
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
      name: { required },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      email: { email, required },
      month: { required },
      day: { required },
      year: { required },
    },
  },
}
</script>
<style scoped>
.nuxt-link-exact-active {
  @apply border-b-2;
  @apply border-avenue-white;
}
</style>
