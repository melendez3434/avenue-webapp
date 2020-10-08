<script>
import IcFacebook from '@/assets/svg/facebook.svg?inline'
import IcInstagram from '@/assets/svg/instagram.svg?inline'
import IcSpotify from '@/assets/svg/spotify.svg?inline'
import IcTwitter from '@/assets/svg/twitter.svg?inline'

export default {
  name: 'SocialNetworkIcon',

  components: {
    IcFacebook,
    IcInstagram,
    IcSpotify,
    IcTwitter,
  },

  props: {
    socialNetwork: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconMap() {
      return {
        facebook: IcFacebook,
        instagram: IcInstagram,
        spotify: IcSpotify,
        twitter: IcTwitter,
      }
    },

    icon() {
      return this.iconMap[this.socialNetwork]
    },
  },

  render(h) {
    return h(this.icon)
  },
}
</script>
