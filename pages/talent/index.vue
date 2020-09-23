<template>
  <div class="container mx-auto flex flex-col items-center">
    <div class="w-full max-w-2xl mt-12">
      <h2 class="text-4xl font-medium">Sign up as a talent</h2>
      <form class="mt-3" @submit="createTalent">
        <div class="mb-6">
          <R64Input
            v-model="form.twitch_channel"
            label="Twitch channel *"
            :v="$v.form.hometown"
            error-message="Twitch channel is required"
          />
        </div>
        <div class="mb-6">
          <R64Input
            v-model="form.hometown"
            label="Home town *"
            :v="$v.form.hometown"
            error-message="Hometown is required"
          />
        </div>
        <div class="mb-6">
          <R64Input
            v-model="form.merchandise_url"
            label="Merchandise URL *"
            :v="$v.form.merchandise_url"
            error-message="Must be a well formed url"
          />
        </div>
        <!-- // TODO: Photo -->
        <div class="mb-6">
          <R64Input v-model="form.name" label="Name" />
        </div>
        <div class="mb-6">
          <R64Input v-model="form.email" label="Email " />
        </div>
        <div class="mb-6">
          <R64Input v-model="form.cellphone" label="Cellphone" />
        </div>
        <div class="mb-6">
          <R64Input v-model="form.biography" label="biography" />
        </div>
        <div class="mb-6">
          <R64Input v-model="form.date_of_birth" label="Date of birth" />
        </div>
        <div class="mb-6">
          <R64Checkbox v-model="form.is_group" label="Group" secondary />
        </div>

        <div class="mb-6">
          <MultipleInput
            v-model="form.social_media_links"
            :social-network-list="socialNetworkList"
          />
        </div>

        <div class="mb-6">
          <client-only>
            <ImageUpload
              :cropped.sync="form.photo"
              :class="{ 'opacity-25': busy }"
              class="w-full"
            />
          </client-only>
        </div>

        <div class="mb-6">
          <R64Checkbox
            v-model="form.sign_user_agreement"
            label="User agreement"
            secondary
            :v="$v.form.sign_user_agreement"
            error-message="Must accept the user agreement"
            @change="form.sign_user_agreement = $event"
          />
        </div>

        <R64Button type="submit" class="mt-8" :disabled="$v.form.$invalid && !error">
          Sign up
        </R64Button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, url, email } from 'vuelidate/lib/validators'
import MultipleInput from '@/components/commons/ui/MultipleInput'
import ImageUpload from '@/components/commons/ui/ImageUpload'

export default {
  name: 'Talent',

  components: {
    MultipleInput,
    ImageUpload,
  },

  data() {
    return {
      form: {
        twitch_channel: '',
        hometown: '',
        merchandise_url: '',
        photo: '',
        name: '',
        email: '',
        cellphone: '',
        biography: '',
        is_group: false,
        date_of_birth: '',
        social_media_links: [{ social_media_slug: 'facebook', url: '' }],
        sign_user_agreement: true,
      },
      socialNetworkList: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Patreon', value: 'patreon' },
        { label: 'Go fund me', value: 'go-fund-me' },
        { label: 'Bandcamp', value: 'bandcamp' },
        { label: 'Spotify', value: 'spotify' },
        { label: 'Soundcloud', value: 'sound-cloud' },
      ],
      busy: false,
      error: null,
    }
  },

  methods: {
    async createTalent(e) {
      e.preventDefault()
      console.log('form', this.form)
      // Mock photo as backend is not ready
      this.form.photo = 'https://www.8ball-band.co.uk/assets/bxslider/001_1538653226.jpg'
      const { data: talent } = await this.$api.talent.register(this.form).catch(e => {
        this.error = e.response.data.error
      })

      const data = await this.$api.talent.stripeAuthorize(talent.id)
      console.log('data', data)
    },
  },

  validations() {
    const mustBeTrue = value => {
      return value === true
    }

    const validations = {
      form: {
        twitch_channel: { required },
        hometown: { required },
        merchandise_url: { required, url },
        sign_user_agreement: { required, mustBeTrue },
        email: { email },
        photo: { required },
      },
    }

    if (this.form.social_media_links.length) {
      validations.form.social_media_links = {
        $each: {
          social_media_slug: { required },
          url: { required, url },
        },
      }
    }

    return validations
  },
}
</script>
