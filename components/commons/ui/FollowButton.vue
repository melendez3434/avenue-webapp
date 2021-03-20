<template>
  <div>
    <button
      class="font-library text-lg hover:text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
      style="box-shadow: 0px 0px 10px #FFFFFF;"
      :class="{ 'pointer-events-none opacity-50': busy }"
      :disabled="busy"
      @click="follow"
    >
      <IcHeart class="w-6" />
      {{ isFollowed ? 'Unfollow' : 'Follow' }}
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IcHeart from '@/assets/svg/heart-big.svg?inline'

export default {
  name: 'FollowButton',

  components: { IcHeart },

  props: {
    talent: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      busy: false,
    }
  },

  computed: {
    ...mapState({
      followedTalents: state => state.global.followedTalents,
    }),

    isFollowed() {
      return !!this.followedTalents.find(talent => talent.id === this.talent.id)
    },
  },

  methods: {
    ...mapActions({
      fetchFollowedTalents: 'global/fetchFollowedTalents',
    }),

    async follow() {
      this.busy = true
      if (this.isFollowed) {
        await this.$api.talent.unfollow(this.talent.id)
      } else {
        await this.$api.talent.follow(this.talent.id)
      }
      await this.fetchFollowedTalents()
      this.busy = false
    },
  },
}
</script>
