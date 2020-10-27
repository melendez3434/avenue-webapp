<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-9 pl-4 bg-theavenue-background-extra-light ">
    <div class="col-span-6 flex flex-col justify-between">
      <div :style="videoStyle">
        <slot />
      </div>
      <div class="pb-4 pt-8 bg-theavenue-background-dark px-4 flex justify-between items-center">
        <TalentCard :talent="event.talent" link />
        <div v-if="event" class="flex items-center">
          <TalentSocialMedia :talent="event.talent" />
          <el-popover
            v-model="popover"
            placement="top-end"
            trigger="click"
            width="200"
            popper-class="bg-theavenue-gray"
            @show="popover = true"
            @hide="popover = false"
          >
            <button class="bg-theavenue-gray text-theavenue-white" @click="reportStreamer">
              Report {{ event.talent.name }}
            </button>
            <button slot="reference" class="ml-5 mt-2">
              <IcThreeDots class="w-8 h-8" />
            </button>
          </el-popover>
        </div>
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
import IcThreeDots from '@/assets/svg/three_dots.svg?inline'

export default {
  name: 'VideoLayout',

  components: {
    ReportModal,
    IcThreeDots,
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

  data() {
    return {
      popover: false,
    }
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

    reportStreamer() {
      this.popover = false
      this.$modal.show('report-modal')
    },
  },
}
</script>
<style>
.el-popper.el-popover.bg-theavenue-gray {
  @apply bg-theavenue-gray;
  @apply border-none;
}
</style>
