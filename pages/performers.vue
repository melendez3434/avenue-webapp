<template>
  <div>
    <section class="lg:relative">
      <img src="@/assets/images/singing_girl.jpg" alt="man playing guitar smiling" class="w-full" />
      <div class="lg:absolute bottom-0 bg-avenue-blue-dark w-full p-6 sm:p-20 lg:px-64 lg:py-20">
        <div class="mx-auto w-2/3">
          <h1 class="font-bold text-2xl lg:text-4xl">
            Start Your Journey As A Live Performer
          </h1>
          <p class="my-4 leading-loose">
            On The Avenue you can share your passion and monetize your talent! In this arena, you
            can bring your fans and gain new ones. The difference between this and sharing your
            talent for free on Instagram Live is your fans can TIP you as you perform! 🤑
          </p>
          <button class="px-4 py-2 bg-white text-black text-lg transform scale-100 hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
    </section>
    <section class="w-full h-64 bg-white">
      <img
        src="@/assets/images/performers_girl_1.jpg"
        alt="gitl smiling and resting her head on her hand in front of a microphone"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Performers',

  auth: false,
}
</script>
