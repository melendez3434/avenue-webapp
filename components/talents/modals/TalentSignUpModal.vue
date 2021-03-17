<template>
  <div class="relative">
    <div class="absolute text-theavenue-white top-0 right-0 mt-4 mr-6">
      <IcClose
        class="cursor-pointer"
        aria-role="button"
        aria-label="close"
        @click="$modal.hide('talent-signup-modal')"
      />
    </div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background">
      <p class="text-sm leading-5">Welcome</p>
      <p class="text-2xl leading-tight font-medium">{{ $auth.user.name }}</p>
    </div>
    <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="createTalent">
      <div class="mb-6">
        <R64Input
          v-model="form.name"
          :v="$v.form.name"
          label="Artist or Group Name"
          error-message="Name is required"
        />
      </div>

      <div class="mb-6">
        <R64Input
          v-model="form.artist_type"
          label="Artist Type"
          placeholder="i.e. Rock Band, Personal Chef, Comedian"
        />
      </div>

      <div class="mb-6">
        <R64Select v-model="form.category_id" :options="categoriesFormatted" label="Category" />
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
        <R64Input v-model="form.biography" label="Bio" />
      </div>

      <div class="mb-6">
        <MultipleInput v-model="form.social_media_links" :social-network-list="socialNetworkList" />
      </div>

      <div class="mb-6">
        <p>Photo</p>
        <client-only>
          <ImageUpload :cropped.sync="form.photo" :class="{ 'opacity-25': busy }" class="w-full" />
        </client-only>
      </div>
      <div class="mb-6">
        <p>Cover photo</p>
        <client-only>
          <ImageUpload
            :cropped.sync="form.cover_photo"
            :class="{ 'opacity-25': busy }"
            :viewport="{ width: 380, height: 119, type: 'square' }"
            :result-size="{ width: 1440, height: 450 }"
            class="w-full"
          />
        </client-only>
      </div>

      <div class="mb-6 flex">
        <R64Checkbox
          :value="form.sign_user_agreement"
          label=""
          wrapper-class="mr-3 mt-0.5"
          label-class="hidden"
          :v="$v.form.sign_user_agreement"
          @change="form.sign_user_agreement = $event"
        />
        <nuxt-link :to="{ name: 'tos' }" class="mb-1 hover:underline" target="_blank">
          Terms and Conditions
        </nuxt-link>
      </div>

      <div class="mb-6 flex">
        <R64Checkbox
          :value="form.talent_agreement"
          label=""
          wrapper-class="mr-3 mt-0.5"
          label-class="hidden"
          :v="$v.form.talent_agreement"
          @change="form.talent_agreement = $event"
        />
        <nuxt-link :to="{ name: 'talent-agreement' }" class="mb-1 hover:underline" target="_blank">
          Talent Agreement
        </nuxt-link>
      </div>

      <div v-if="error" class="mb-6 text-theavenue-red-neon text-center">{{ error }}</div>

      <R64Button
        type="submit"
        class="mt-8"
        :disabled="$v.form.$invalid && !error"
        full
        :loading="busy"
      >
        Confirm
      </R64Button>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, url } from 'vuelidate/lib/validators'
import MultipleInput from '@/components/commons/ui/MultipleInput'
import IcClose from '@/assets/svg/close_2.svg?inline'
import ImageUpload from '@/components/commons/ui/ImageUpload'

export default {
  name: 'TalentSignUpModal',

  components: {
    MultipleInput,
    IcClose,
    ImageUpload,
  },

  data() {
    return {
      form: {
        name: '',
        category_id: 1,
        website: '',
        social_media_links: [{ social_media_slug: 'facebook', url: '' }],
        artist_type: '',
        biography: '',
        photo: '',
        cover_photo: '',
        sign_user_agreement: false,
        talent_agreement: false,
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
    async createTalent() {
      try {
        this.busy = true
        const photos = await this.uploadPhotos()
        const social_media_links = this.form.social_media_links.filter(link => !!link.url)
        const payload = { ...this.form, social_media_links, ...photos }
        const { data: talent } = await this.$api.talent.register(payload)
        const { data: url } = await this.$api.talent.stripeAuthorize(talent.id)
        this.busy = false
        window.location.href = url
      } catch (e) {
        this.error = e.response.data.error || e.response.data.message
        this.busy = false
      }
    },

    async uploadPhotos() {
      const photo = this.form.photo ? await this.$api.global.uploadImage(this.form.photo) : null
      const cover_photo = this.form.cover_photo
        ? await this.$api.global.uploadImage(this.form.cover_photo)
        : null
      return { photo, cover_photo }
    },
  },

  validations() {
    const validations = {
      form: {
        name: { required },
        category_id: { required },
        website: { url },
        sign_user_agreement: {
          mustBeTrue(value) {
            return !!value
          },
        },
        talent_agreement: {
          mustBeTrue(value) {
            return !!value
          },
        },
      },
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
