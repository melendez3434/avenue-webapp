<template>
  <div class="px-6 py-10">
    <form class="mt-3" @submit="createTalent">
      <div class="mb-6">
        <R64Input v-model="form.name" label="Artist or Group Name" />
      </div>

      <div class="mb-6">
        <R64Select v-model="form.category" :options="categoriesFormatted" label="Category" />
      </div>

      <div class="mb-6">
        <R64Input
          v-model="form.artist_type"
          label="Artist Type"
          placeholder="i.e. Rock Band, Personal Chef, Comedian"
        />
      </div>

      <div class="mb-6">
        <R64Input
          v-model="form.website"
          label="Website"
          :v="$v.form.website"
          placeholder="Paste URL"
          error-message="Must be a well formed url"
        />
      </div>

      <div class="mb-6">
        <MultipleInput v-model="form.social_media_links" :social-network-list="socialNetworkList" />
      </div>

      <R64Button type="submit" class="mt-8" :disabled="$v.form.$invalid && !error">
        Confirm
      </R64Button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, url, email } from 'vuelidate/lib/validators'
import MultipleInput from '@/components/commons/ui/MultipleInput'

export default {
  name: 'TalentSignUpModal',

  components: {
    MultipleInput,
    // ImageUpload,
  },

  data() {
    return {
      form: {
        name: '',
        category: 1,
        website: '',
        social_media_links: [{ social_media_slug: 'facebook', url: '' }],
        artist_type: '',
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

  computed: {
    ...mapState({
      categories: state => state.global.categories,
    }),

    categoriesFormatted() {
      return this.categories.map(c => ({ label: c.name, value: c.id }))
    },
  },

  methods: {
    async createTalent(e) {
      e.preventDefault()

      const { data: talent } = await this.$api.talent.register(this.form).catch(e => {
        this.error = e.response.data.error
      })

      const { data: url } = await this.$api.talent.stripeAuthorize(talent.id)
      window.location.href = url
    },
  },

  validations() {
    const validations = {
      form: {
        website: { url },
        email: { email, required },
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
<style>
input.vc-bg-white {
  @apply bg-theavenue-background-dark;
}
input.vc-text-gray-800 {
  @apply text-avenue-white;
}
input.vc-border-gray-400 {
  @apply border-none;
}
.vc-popover-content-wrapper.is-interactive {
  @apply z-50;
}
</style>
