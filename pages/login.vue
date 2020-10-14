<template>
  <div class="w-full max-w-xl mx-auto mt-12 md:mt-24">
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from '@/components/users/LoginForm'

export default {
  name: 'LoginPage',

  components: {
    LoginForm,
  },
}
</script>
