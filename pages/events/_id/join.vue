<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="max-w-lg w-full mx-auto text-center mt-10">
      <h1 class="text-4xl">Welcome to the competition!</h1>
      <h2 class="mt-3 text-lg">Signup to {{ competition.name }}</h2>
    </section>

    <section class="max-w-lg w-full mx-auto mt-12">
      <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="join">
        <R64Input v-model="form.name" label="Artist or Group Name" />
        <div class="mt-5">
          <R64Input v-model="form.business_name" label="Restaurant or cater name" />
        </div>
        <div class="mt-5">
          <R64Input v-model="form.website" label="Restaurant or cater website" />
        </div>
        <div class="mt-5">
          <R64Input v-model="form.city" label="City" />
        </div>
        <div class="mt-5">
          <R64Input v-model="form.state" label="State" />
        </div>

        <div class="mt-5">
          <div v-for="(week, index) in form.weeks" :key="index" class="mt-8">
            <p class="mt-1 underline">Week {{ index + 1 }}</p>
            <div class="mt-5"><R64Input v-model="week.charity" label="Charity" /></div>
            <div class="mt-5"><R64Input v-model="week.website" label="Charity website" /></div>
            <div class="mt-5"><R64Input v-model="week.dish" label="Dish of the week" /></div>
          </div>
        </div>

        <div class="mt-5">
          <p class="text-center mb-5">
            By clicking Sign Up, you are indicating that you have read and acknowledge the Terms and
            Conditions of the event
          </p>
          <R64Button full>Confirm</R64Button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  name: 'CompetitionJoinPage',

  auth: false,

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      this.competition = data
    } catch (error) {
      console.error("Couldn't fetch the event")
    }
  },

  data() {
    return {
      competition: {},
      form: {
        name: '',
        business_name: '',
        website: '',
        city: '',
        state: '',
        weeks: [
          { charity: '', website: '', dish: '' },
          { charity: '', website: '', dish: '' },
          { charity: '', website: '', dish: '' },
          { charity: '', website: '', dish: '' },
          { charity: '', website: '', dish: '' },
        ],
      },
    }
  },
}
</script>
