<template>
  <div class="bg-avenue-blue-dark">
    <section class="lg:relative lg:h-130 2xl:overflow-hidden">
      <img
        src="@/assets/images/singing_girl.jpg"
        alt="man playing guitar smiling"
        class="w-full h-5/6 lg:h-4/6 xl:h-130 object-cover"
      />
      <div
        class="lg:absolute bottom-0 bg-avenue-blue-dark w-full p-6 sm:p-20 lg:px-44 lg:py-12 xl:py-24 2xl:py-32"
      >
        <div class="mx-auto w-full md:w-2/3">
          <h1 class="font-semibold text-2xl lg:text-4xl 3xl:text-6xl">
            Stream Live. Bring Your Following. Get Paid.
          </h1>
          <div class="my-4 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            <p>
              On The Avenue, you start earning day one, there are no prerequisites for you to make
              money. Customize your virtual dueling tip jars, magnifying viewer engagement and drive
              up tips. Easy sign-up and event creation enable you to be performing immediately.
            </p>
            <p>
              Live stream when you want, as often as you want, from anywhere. Generate
              high-production value events using the leading live streaming technology in the
              industry. Be sure to join our competitions, where you can earn cash prizes.
            </p>
          </div>
          <button
            class="px-4 py-2 bg-white text-black text-lg 2xl:text-xl 3xl:text-2xl transform scale-100 hover:scale-105"
            @click="openSignup"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-white text-black flex flex-col md:flex-row gap-6 lg:gap-12"
    >
      <img
        src="@/assets/images/performers_girl_1.jpg"
        alt="gitl smiling in front of a microphone and resting her head on her hand"
        class="w-full sm:w-2/3 lg:w-1/2 object-cover"
      />
      <div class="flex flex-col sm:justify-center space-y-5">
        <blockquote class="font-semibold text-xl lg:text-3xl 3xl:text-5xl md:mb-6">
          Cooking on The Avenue has enabled me to tap into my creativity and entertain others.
        </blockquote>
        <div class="flex flex-col space-y-1 lg:space-y-2">
          <span class="3xl:text-xl">Chef “JR” Robinson Kitchencray™️</span>
          <span class="3xl:text-xl">Personal Chef</span>
          <div class="flex space-x-6">
            <div class="flex space-x-1 items-center">
              <IcInsta class="h-4" />
              <span class="text-xs 3xl:text-lg">242k followers</span>
            </div>
            <div class="flex space-x-1 items-center">
              <IcTwitter class="h-4" />
              <span class="text-xs 3xl:text-lg">135k followers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-avenue-blue-dark"
    >
      <h2 class="font-semibold text-2xl lg:text-3xl 3xl:text-5xl mb-6 md:mb-10">
        Why Join The Avenue?
      </h2>
      <div class="md:grid grid-cols-2 space-y-6 md:space-x-12 md:space-y-0">
        <div>
          <h3 class="font-semibold text-xl lg:text-2xl 3xl:text-3xl">
            No barriers to stream. No barriers to watch.
          </h3>
          <div class="mt-2 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            <p>
              No barriers to stream. No barriers to watch. Get paid within 2 days of your
              performance. Use our Live Streaming ticketed performance functionality. Compete in
              virtual competitions where you can earn big money and win prizes. Link your
              merchandise website or menu directly to your performances. Connect your social
              networks with our media links. No disruptive advertisements. Earn extra by referring
              performers to The Avenue as a Talent Scout.
            </p>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-xl lg:text-2xl 3xl:text-3xl">
            Host a festival, competition, or charitable event on The Avenue.
          </h3>
          <p class="mt-2 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            Raise money for your favorite charity or cause by labeling your tip jars with the name
            of the benefactor. Team up with a charity and set a goal, asking your's and the
            charity's following to tune in and support. Collect tips using our secure transaction
            engine which is powered by StripeTM and be paid out within 2 days.
          </p>
        </div>
      </div>
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-white text-black flex flex-col-reverse lg:flex-row lg:space-x-12"
    >
      <div class="w-full flex flex-col md:justify-center md:align-center mt-10 lg:mt-0">
        <h2 class="font-semibold text-2xl lg:text-3xl 3xl:text-5xl mb-2 lg:mb-6">
          Streaming Made Simple
        </h2>
        <div class="leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
          <p>
            Our family owned, small business is here to help you. Email us to set up a sound check
            at info@theavenmue.live
          </p>
          <p />
          <p>
            Our performer's dashboard allows you to easily schedule performances and maintain your
            bio and profile pictures.
          </p>
          <p>
            Our "pay-it-forward" scouting dashboard enables you to root on the artists you referred
            to The Avenue.
          </p>
          <p>
            Stream from our mobile app (The Avenue Streamer), from a Broadcasting software (OBS) or
            from your laptop...you choose the production level that works best for you.
          </p>
          <p>
            Have your audience follow you anywhere by downloading The Avenue Viewer, available at
            the AppStore or Google Play.
          </p>
          <p>
            Push notifications alert your following that you are about to step onto The Avenue's
            stage.
          </p>
        </div>
      </div>
      <img
        src="@/assets/images/stage-man.jpg"
        alt="man performing in a concert"
        class="w-full object-cover"
      />
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-avenue-blue-dark"
    >
      <ExternalVideo
        url="https://theavenue-production.s3.amazonaws.com/docs/CatAndMylo.mov"
        class="w-full"
      />
      <div class="md:grid grid-cols-2 space-y-6 md:space-x-12 md:space-y-0 mt-10">
        <div>
          <h3 class="font-semibold text-xl lg:text-2xl 3xl:text-3xl">
            Interact with your audience.
          </h3>
          <div class="mt-2 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            <p>
              Use our live chat functionality to respond to your following.
            </p>
            <p>
              Label the tip jars in a manner that enables your audience to vote for the next song
              you play or dish you cook.
            </p>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-xl lg:text-2xl 3xl:text-3xl">
            Raise money through our dueling tip jars
          </h3>
          <div class="mt-2 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            <p>
              Label the tip jars to spur on competition amongst your following.
            </p>
            <p>
              Offer a prize to your top tipper, whose name is prominently displayed under the tip
              jars.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <img
        src="@/assets/images/performers_girl_2.jpg"
        alt="woman performing in her house in front of a microphonw"
        class="w-full p-6 md:p-0 object-cover"
      />
      <div
        class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-avenue-blue-dark space-y-5"
      >
        <h2 class="font-semibold text-2xl lg:text-3xl 3xl:text-5xl">
          Start Your Live Streaming Career
        </h2>
        <p class="leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">Let’s get set up together.</p>
        <button
          class="px-4 py-2 bg-white text-black text-lg 2xl:text-xl 3xl:text-2xl transform scale-100 hover:scale-105"
          @click="openSignup()"
        >
          Sign Up
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import IcInsta from '@/assets/svg/instagram_color.svg?inline'
import IcTwitter from '@/assets/svg/twitter_blue.svg?inline'

export default {
  name: 'Performers',

  auth: false,

  components: { IcInsta, IcTwitter },

  methods: {
    openSignup() {
      if (!this.$auth.user) {
        this.$modal.show('user-access-modal', { active: 'signup' })
      } else if (this.$auth.loggedIn && !this.$auth.user.talent_id) {
        this.$modal.show('talent-sign-up-modal')
      } else {
        this.$modal.show('already-talent-modal')
      }
    },
  },
}
</script>
