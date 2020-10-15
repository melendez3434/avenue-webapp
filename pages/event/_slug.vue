<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-9">
    <div class="col-span-6 flex flex-col justify-between">
      <div id="streaming" ref="streaming" class="relative" />
      <div class="pb-4 pt-8 bg-theavenue-background-dark px-4 flex justify-between items-center">
        <ArtistAvatar :artist="event.talent" size="sm" />
        <div class="flex space-x-4 items-center">
          <SocialNetworkIcon
            v-for="socialNetwork in event.social_media_users"
            :key="socialNetwork.id"
            :social-network="socialNetwork.social_media_slug"
            class="w-6 h-6 hidden md:inline-block"
          />
          <a
            :href="event.talent.merchandise_url"
            class="font-library text-lg text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
            style="box-shadow: 0px 0px 10px #FFFFFF;"
          >
            <IcAnchorArrow />
            website
          </a>
        </div>
      </div>
    </div>
    <div class="col-span-3 flex flex-col">
      <TipJars class="md:h-96" :jars="event.tip_jars" />
      <ChatRoom class="flex-1" :event="event" :style="chatStyle" />
    </div>
  </div>
</template>
<script>
import ArtistAvatar from '@/components/artists/ArtistAvatar'
import SocialNetworkIcon from '@/components/commons/ui/SocialNetworkIcon.js'
import IcAnchorArrow from '@/assets/svg/anchor_arrow.svg?inline'

export default {
  name: 'EventPage',

  auth: false,

  layout: 'event',

  components: {
    ArtistAvatar,
    SocialNetworkIcon,
    IcAnchorArrow,
  },

  async asyncData({ $api, redirect, params }) {
    if (!params.slug) redirect('/')

    try {
      const { data: event } = await $api.events.get(params.slug)
      return { event }
    } catch (e) {
      redirect('/')
    }
  },

  data() {
    return {
      videoHeight: 0,
      dimensions: {
        width: 1920,
        height: 1080,
      },
    }
  },

  computed: {
    chatStyle() {
      return { height: 'calc(100vh - 384px - 78px)' }
    },
  },

  mounted() {
    this.videoHeight =
      (this.dimensions.height / this.dimensions.width) * this.$refs.streaming.offsetWidth

    dacast(this.event.talent.embed_code, 'streaming', {
      width: '100%',
      height: this.videoHeight,
    })
  },
}
</script>
<style>
.min-h-content {
  min-height: calc(100vh - 69px);
}
.dc-video-player-wrapper {
  position: initial;
}
#streaming .app-container {
  width: 100%;
}
</style>
