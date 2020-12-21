<template>
  <div class="min-h-screen">
    Please wait...
  </div>
</template>

<script>
export default {
  auth: false,

  name: 'ScoutInvitation',

  async mounted() {
    if (this.$auth.loggedIn) {
      return this.$router.push('/')
    }

    try {
      const { token } = this.$route.params
      const { data } = await this.$api.talent.getScoutByToken(token)
      this.$router.push({
        name: 'index',
        query: {
          action: 'signup',
        },
        params: {
          name: data.name,
          token,
        },
      })
    } catch (e) {
      this.$router.push({
        name: 'index',
        query: {
          action: 'signup',
        },
      })
    }
  },
}
</script>
