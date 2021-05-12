<template>
  <div>
    <section class="lg:relative 2xl:h-screen 2xl:overflow-hidden">
      <img src="@/assets/images/singing_girl.jpg" alt="man playing guitar smiling" class="w-full" />
      <div class="lg:absolute bottom-0 bg-avenue-blue-dark w-full p-6 sm:p-20 lg:px-64 lg:py-24 ">
        <div class="mx-auto w-full md:w-2/3">
          <h1 class="font-semibold text-2xl lg:text-4xl 3xl:text-6xl">
            Start Your Journey As A Live Performer
          </h1>
          <p class="my-4 leading-loose lg:text-lg 2xl:text-xl 3xl:text-2xl">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones. The difference between this and sharing your
            talent for free on Instagram Live is your fans can TIP you as you perform! 🤑
          </p>
          <button
            class="px-4 py-2 bg-white text-black text-lg 2xl:text-xl 3xl:text-2xl transform scale-100 hover:scale-105"
            @click="openSignup()"
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
        class="w-full sm:w-1/2 "
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
      <div class="md:flex space-y-6 md:space-x-12 md:space-y-0">
        <div>
          <h3 class="font-semibold text-lg lg:text-xl 3xl:text-2xl">Increase your following</h3>
          <p class="mt-2 leading-loose 2xl:text-lg 3xl:text-xl">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones.
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-lg lg:text-xl 3xl:text-2xl">Earn money for your work</h3>
          <p class="mt-2 leading-loose 2xl:text-lg 3xl:text-xl">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones.
          </p>
        </div>
      </div>
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-white text-black flex flex-col-reverse md:flex-row md:space-x-12"
    >
      <div class="w-full sm:w-1/2 flex flex-col md:justify-center md:align-center">
        <h2 class="font-semibold text-2xl lg:text-3xl 3xl:text-5xl mb-6 md:mb-10">
          Streaming Made Simple
        </h2>
        <p class="leading-loose 2xl:text-lg 3xl:text-xl">
          On The Avenue you can share your passion and monetize your talent! In this arena, you can
          bring your fans and gain new ones. The difference between this and sharing your talent for
          free on Instagram Live is your fans can TIP you as you perform! 🤑
        </p>
        <p class="mt-4 leading-loose 2xl:text-lg 3xl:text-xl">
          On The Avenue you can share your passion and monetize your talent! In this arena, you can
          bring your fans and gain new ones. The difference between this and sharing your talent for
          free on Instagram Live is your fans can TIP you as you perform! 🤑
        </p>
      </div>
      <img
        src="@/assets/images/stage-man.jpg"
        alt="man performing in a concert"
        class="w-full sm:w-1/2"
      />
    </section>
    <section
      class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-avenue-blue-dark"
    >
      <img
        src="@/assets/images/presentation.jpg"
        alt="screenshot showing how the avenue streams work"
        class="w-full"
      />
      <div class="md:flex space-y-6 md:space-x-12 md:space-y-0 mt-10">
        <div>
          <h3 class="font-semibold text-lg lg:text-xl 3xl:text-2xl">Increase your following</h3>
          <p class="mt-2 leading-loose 2xl:text-lg 3xl:text-xl">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones.
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-lg lg:text-xl 3xl:text-2xl">
            Raise money through tip jars
          </h3>
          <p class="mt-2 leading-loose 2xl:text-lg 3xl:text-xl">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones.
          </p>
        </div>
      </div>
    </section>
    <section>
      <img
        src="@/assets/images/performers_girl_2.jpg"
        alt="woman performing in her house in front of a microphonw"
        class="w-full p-6 md:p-0"
      />
      <div
        class="w-full h-auto p-6 sm:p-12  xl:py-16 xl:px-24 2xl:px-36 3xl:px-60 3xl:py-24 bg-avenue-blue-dark space-y-5"
      >
        <h2 class="font-semibold text-2xl lg:text-3xl 3xl:text-5xl">
          Start Your Live Streaming Career
        </h2>
        <p class="leading-loose 2xl:text-lg 3xl:text-xl">Let’s get set up together.</p>
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
