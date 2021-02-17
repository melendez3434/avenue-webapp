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
        <R64Input
          v-model="form.name"
          label="Artist or Group Name"
          :v="$v.form.name"
          error-message="Artist or group name is required"
        />
        <div class="mt-5">
          <R64Input v-model="form.business_name" label="Restaurant or cater name" />
        </div>
        <div class="mt-5">
          <R64Input v-model="form.website" label="Restaurant or cater website" />
        </div>
        <div class="mt-5">
          <R64Input
            v-model="form.city"
            label="City"
            :v="$v.form.city"
            error-message="City is required"
          />
        </div>
        <div class="mt-5">
          <R64Input
            v-model="form.state"
            label="State"
            :v="$v.form.state"
            error-message="State is required"
          />
        </div>

        <div class="mt-5">
          <div v-for="(v, index) in $v.form.weeks.$each.$iter" :key="index" class="mt-8">
            <p class="mt-1 underline">Week {{ parseInt(index) + 1 }}</p>
            <div v-if="form.weeks[index].charity !== false" class="mt-5">
              <R64Input
                v-model="form.weeks[index].charity"
                label="Charity"
                :v="v.charity"
                error-message="Artist or group name is required"
                @input="v.charity.$touch"
              />
            </div>
            <div v-if="form.weeks[index].website !== false" class="mt-5">
              <R64Input
                v-model="form.weeks[index].website"
                label="Charity website"
                :v="v.website"
                error-message="Charity website is required"
                @input="v.website.$touch"
              />
            </div>
            <div class="mt-5">
              <R64Input
                v-model="form.weeks[index].dish"
                label="Dish of the week"
                :v="v.dish"
                error-message="Dish of the week is required"
                @input="touchDishOfWeek(v, index)"
              />
            </div>
          </div>
        </div>

        <div class="mt-5">
          <p class="text-center mb-5">
            By clicking Sign Up, you are indicating that you have read and acknowledge the Terms and
            Conditions of the event
          </p>
          <R64Button full :disabled="$v.form.$invalid">Confirm</R64Button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

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
          { charity: false, website: false, dish: '' },
        ],
      },
    }
  },

  methods: {
    touchDishOfWeek(v, index) {
      const isLastIndex = this.form.weeks.length - 1 === parseInt(index)
      if (isLastIndex) {
        v.charity.$touch
        v.website.$touch
        v.dish.$touch
      }
    },
  },

  validations() {
    const validations = {
      form: {
        name: { required },
        city: { required },
        state: { required },
        weeks: {
          $each: {
            charity: { required },
            website: { required },
            dish: { required },
          },
        },
      },
    }

    return validations
  },
}
</script>
