<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-9 pl-4 bg-theavenue-background-extra-light ">
    <div class="col-span-6 flex flex-col justify-between">
      <div :style="videoStyle">
        <slot />
      </div>
      <div class="pb-4 pt-8 bg-theavenue-background-dark px-4 flex justify-between items-center">
        <ArtistAvatar :artist="artist" size="sm" />
        <template v-if="event">
          <div class="flex space-x-4 items-center">
            <SocialNetworkIcon
              v-for="socialNetwork in event.social_media_users"
              :key="socialNetwork.id"
              :social-network="socialNetwork.social_media_slug"
              class="w-6 h-6 ta-hidden md:inline-block"
            />
            <a
              v-if="event.talent.website"
              :href="event.talent.website"
              class="font-library text-lg text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
              style="box-shadow: 0px 0px 10px #FFFFFF;"
              target="_blank"
            >
              <IcExternalLink class="w-8 h-8" />
              website
            </a>
            <button
              class="font-library text-lg text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
              style="box-shadow: 0px 0px 10px #FFFFFF;"
              @click="$modal.show('report-modal')"
            >
              Report
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="col-span-3 flex flex-col">
      <slot name="streaming" />
      <template v-if="event">
        <TipJars class="md:h-96" :event="event" @click:jar="openDonationModal" />
        <ChatRoom class="flex-1" :event="event" :style="chatStyle" @click:jar="openDonationModal" />
      </template>
      <div v-else class="p-4 text-center">
        The event isn't live. When its time will appear the tip jars and the jars. Refresh
      </div>
    </div>
    <modal
      width="100%"
      classes="max-w-md inset-x-0 m-auto"
      name="report-modal"
      scrollable
      height="auto"
    >
      <ReportModal v-if="!talent" :talent="event.talent" />
    </modal>
  </div>
</template>

<script>
import ReportModal from '@/components/talents/modals/ReportModal'
import ArtistAvatar from '@/components/artists/ArtistAvatar'
import SocialNetworkIcon from '@/components/commons/ui/SocialNetworkIcon.js'
import IcExternalLink from '@/assets/svg/external_link.svg?inline'

export default {
  name: 'VideoLayout',

  components: {
    ReportModal,
    ArtistAvatar,
    SocialNetworkIcon,
    IcExternalLink,
  },

  props: {
    event: {
      type: Object,
      default: null,
    },

    talent: {
      type: Object,
      default: null,
    },
  },

  computed: {
    videoStyle() {
      return { height: 'calc(100vh - 78px - 96px)' }
    },

    chatStyle() {
      const streamButtonHeight = this.talent ? 104 : 0
      return { height: `calc(100vh - 384px - 78px - ${streamButtonHeight}px)` }
    },

    artist() {
      return this.talent || this.event.talent
    },
  },

  methods: {
    openDonationModal(jar) {
      if (!this.$auth.loggedIn) {
        return this.$modal.show('user-access-modal', { active: 'login' })
      }

      this.$modal.show('streaming-donate-modal', { event: this.event.name, jar })
    },
  },
}
</script>
