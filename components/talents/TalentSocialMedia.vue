<template>
  <div class="flex space-x-4 items-center">
    <SocialNetworkIcon
      v-for="socialNetwork in talent.social_media_links"
      :key="socialNetwork.id"
      :social-network="socialNetwork.social_media_slug"
      class="w-6 h-6 hidden md:inline-block cursor-pointer"
      @click.native="openLink(socialNetwork.url)"
    />
    <a
      v-if="talent.website"
      :href="talent.website"
      class="font-library text-lg hover:text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
      style="box-shadow: 0px 0px 10px #FFFFFF;"
      target="_blank"
    >
      <IcExternalLink class="w-6 h-6" />
      website
    </a>
    <ShareButton :key="talent.name" :event="event" :url="baseUrl" />
  </div>
</template>

<script>
import SocialNetworkIcon from '@/components/commons/ui/SocialNetworkIcon.js'
import ShareButton from '@/components/commons/ui/ShareButton'
import IcExternalLink from '@/assets/svg/external_link.svg?inline'

export default {
  name: 'TalentSocialMedia',

  components: {
    SocialNetworkIcon,
    IcExternalLink,
    ShareButton,
  },

  props: {
    talent: {
      type: Object,
      required: true,
    },

    event: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      url: process.client ? window.location.href : '',
      urlCopied: false,
    }
  },

  computed: {
    baseUrl() {
      return process.client ? window.location.href : ''
    },
  },

  methods: {
    openLink(url) {
      window.open(url)
    },
  },
}
</script>
