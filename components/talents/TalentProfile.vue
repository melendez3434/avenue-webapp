<template>
  <div>
    <div
      class="w-full bg-no-repeat hidden h-112 bg-gray-800 bg-cover md:flex relative"
      :class="{
        'items-end': page,
        'items-start': !page,
      }"
      :style="{ backgroundImage: talent.cover_photo ? `url(${talent.cover_photo})` : null }"
    >
      <div class="dimmer-gradient-reverse w-full absolute top-0 left-0 h-full" />
      <div class="z-10 flex justify-between items-center w-full py-4 px-8">
        <TalentCard
          :talent="talent"
          class="ta-hidden md:flex landscape:hidden"
          :class="{ 'cursor-pointer': !page }"
          @click="scrollToAbout"
        />
        <div class="flex space-x-4">
          <TalentSocialMedia :talent="talent" :event="event" />
          <el-popover
            v-model="popover"
            placement="top-end"
            trigger="click"
            width="200"
            popper-class="bg-theavenue-gray"
            @show="popover = true"
            @hide="popover = false"
          >
            <button @click="reportStreamer">Report {{ talent.name }}</button>
            <button slot="reference" class="ml-5 mt-2">
              <IcThreeDots class="w-8 h-8" />
            </button>
          </el-popover>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto hidden md:flex space-x-6 pt-6 lg:pt-12 pb-8"
      :style="profileStyle"
    >
      <div class="w-1/4 flex justify-center">
        <h2 ref="about" class="text-2xl">About</h2>
      </div>
      <div class="w-3/4">
        <article class="prose lg:prose-lg text-theavenue-white">
          {{ talent.biography }}
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import IcThreeDots from '@/assets/svg/three_dots.svg?inline'

export default {
  name: 'TalentProfile',

  components: { IcThreeDots },

  props: {
    talent: {
      type: Object,
      required: true,
    },

    page: {
      type: Boolean,
      default: false,
    },

    event: {
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
    profileStyle() {
      if (!this.page) return {}

      return {
        'min-height': 'calc(100vh - 80px - 28rem - 76px)',
      }
    },
  },

  methods: {
    reportStreamer() {
      this.popover = false
      if (!this.$auth.loggedIn) {
        return this.$modal.show('user-access-modal', {
          active: 'login',
          title: this.talent.name,
          subtitle: 'Log in or sign up to report',
        })
      }
      this.$modal.show('report-modal')
    },

    scrollToAbout() {
      if (this.page) return

      this.$refs.about.scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>
