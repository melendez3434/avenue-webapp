<template>
  <div class="container mx-auto flex flex-col items-center">
    <div class="w-full max-w-2xl mt-12">
      <h2 class="text-4xl font-medium">Sign up as a talent</h2>
      <form class="mt-3" @submit="createTalent">
        <div class="mb-6"><R64Input v-model="form.twitch_channel" label="Twitch channel" /></div>
        <div class="mb-6"><R64Input v-model="form.hometown" label="Home town" /></div>
        <div class="mb-6"><R64Input v-model="form.merchandise_url" label="Merchandise URL" /></div>
        <!-- // TODO: Photo -->
        <div class="mb-6"><R64Input v-model="form.name" label="Name" /></div>
        <div class="mb-6"><R64Input v-model="form.email" label="Email" /></div>
        <div class="mb-6"><R64Input v-model="form.cellphone" label="Cellphone" /></div>
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

        <R64Button type="submit" class="mt-8">Sign up</R64Button>
      </form>
    </div>
  </div>
</template>
<script>
import MultipleInput from '@/components/commons/ui/MultipleInput'

export default {
  name: 'Talent',

  components: {
    MultipleInput,
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
        sign_user_agreement: true,
        date_of_birth: '',
        social_media_links: [{ social_media_slug: 'facebook', url: '' }],
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
    }
  },

  methods: {
    createTalent(e) {
      e.preventDefault()
      console.log('form', this.form)
    },
  },
}
</script>
