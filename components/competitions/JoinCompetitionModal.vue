<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <section class="max-w-lg w-full mx-auto text-center mt-10">
      <h1 class="text-3xl">Welcome to {{ competition.name }}!</h1>
    </section>

    <section class="max-w-lg w-full mx-auto mt-12">
      <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="join">
        <R64Input
          v-model="form.name"
          label="Your Name *"
          :v="$v.form.name"
          error-message="Artist or group name is required"
        />
        <div class="mt-5">
          <R64Input v-model="form.business_name" label="Restaurant or Business Name" />
        </div>
        <div class="mt-5">
          <R64Input v-model="form.website" label="Restaurant or Business Website" />
        </div>
        <div class="mt-5">
          <R64Input
            v-model="form.city"
            label="City *"
            :v="$v.form.city"
            error-message="City is required"
          />
        </div>
        <div class="mt-5">
          <R64Input
            v-model="form.state"
            label="State *"
            :v="$v.form.state"
            error-message="State is required"
          />
        </div>

        <div class="mt-5">
          <R64Textarea
            v-model="form.motivation"
            label="Tell your viewers what motivates you to win *"
            :v="$v.form.motivation"
            error-message="Motivation text is required"
          />
        </div>

        <p class="mt-12 font-bold">
          Charity organizations you want to collaborate with:
        </p>

        <div class="mt-5">
          <div
            v-for="(v, index) in $v.form.rounds_info.$each.$iter"
            :key="index"
            :class="{ 'mt-12': index > 0, 'mt-5': index === 0 }"
          >
            <p class="mt-1 text-sm font-bold">Charity organization</p>
            <div v-if="form.rounds_info[index].charity !== false" class="mt-5">
              <R64Input
                v-model="form.rounds_info[index].charity"
                label="Name"
                :v="v.charity"
                @input="v.charity.$touch"
              />
            </div>
            <div v-if="form.rounds_info[index].charity_website !== false" class="mt-5">
              <R64Input
                v-model="form.rounds_info[index].charity_website"
                label="Website"
                :v="v.charity_website"
                @input="v.charity_website.$touch"
              />
            </div>
          </div>
        </div>

        <div class="mt-5">
          <button class="text-sm flex items-center space-x-3" @click="addNewCharity">
            <IcPlus />
            <span>Add new charity organization</span>
          </button>
        </div>

        <div class="mt-12">
          <div v-if="error" class="my-2 text-red-400">{{ error }}</div>
          <p class="text-center text-xs mb-5">
            By clicking Confirm, you are indicating that you have read and acknowledge the Rules and
            Conditions of the event
          </p>
          <R64Button type="submit" full :disabled="$v.form.$invalid">
            Confirm
          </R64Button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import IcPlus from '@/assets/svg/plus.svg?inline'

export default {
  name: 'JoinEventModal',

  auth: false,

  components: {
    IcPlus,
  },

  props: {
    competition: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      error: null,
      form: {
        name: '',
        business_name: '',
        website: '',
        city: '',
        state: '',
        motivation: '',
        rounds_info: [{ charity: '', charity_website: '' }],
      },
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },

  created() {
    const isLoggedIn = this.$store.state.auth.loggedIn
    const isTalent = this.$store.state.auth.user && this.$store.state.auth.user.has_confirmed_talent
    if (!isLoggedIn || !isTalent) {
      this.$router.replace({ name: 'events-id', params: { id: this.competition.id } })
    }
  },

  methods: {
    async join() {
      try {
        const alreadyRegistered = await this.competition.talent.find(
          t => t.talent.id === this.user.talent_id
        )

        if (alreadyRegistered) {
          this.$router.replace({ name: 'events-id', params: { id: this.competition.id } })
          this.$modal.hide('join-event-modal')
          this.$modal.show('already-signedup-modal')
          return
        }

        if (this.form.rounds_info.length < 2 && this.form.rounds_info[0].charity === '') {
          this.form.rounds_info = []
        }

        await this.$api.competitions.talentSignUp(this.competition.id, this.form)

        this.$modal.hide('join-event-modal')
        this.$router.push({ name: 'events-id', params: { id: this.competition.id } })
        this.$modal.show('welcome-modal')
      } catch (e) {
        if (!e.error || !e.error.response || !e.error.response.data) {
          console.log(e)
          return
        }
        this.error = e.response.data.error
      }
    },

    addNewCharity() {
      this.form.rounds_info.push({ charity: '', charity_website: '' })
    },
  },

  validations() {
    const validations = {
      form: {
        name: { required },
        city: { required },
        state: { required },
        motivation: { required },
        rounds_info: {
          $each: {
            charity: {},
            charity_website: {},
          },
        },
      },
    }

    return validations
  },
}
</script>
