<template>
  <div class="flex space-x-4 items-center">
    <SocialNetworkIcon
      v-for="socialNetwork in talent.social_media_users"
      :key="socialNetwork.id"
      :social-network="socialNetwork.social_media_slug"
      class="w-6 h-6 ta-hidden md:inline-block"
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
    <el-popover v-model="urlCopied" placement="top" trigger="manual">
      <div>Url copied to your clipboard!</div>
      <button
        slot="reference"
        v-clipboard="url"
        class="font-library text-lg hover:text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
        style="box-shadow: 0px 0px 10px #FFFFFF;"
        target="_blank"
        @success="showPopover"
      >
        <IcShare class="w-6 h-6" />
        share
      </button>
    </el-popover>
  </div>
</template>

<script>
import { clipboard } from 'vue-clipboards'
import SocialNetworkIcon from '@/components/commons/ui/SocialNetworkIcon.js'
import IcExternalLink from '@/assets/svg/external_link.svg?inline'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'

export default {
  name: 'TalentSocialMedia',

  components: {
    SocialNetworkIcon,
    IcExternalLink,
    IcShare,
  },

  directives: { clipboard },

  props: {
    talent: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      url: process.client ? window.location.href : '',
      urlCopied: false,
    }
  },

  methods: {
    showPopover() {
      this.urlCopied = true

      setTimeout(() => {
        this.urlCopied = false
      }, 2000)
    },
  },
}
</script>
