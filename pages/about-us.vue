<template>
  <div>
    <div
      class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white bg-theavenue-background-light"
    >
      <LogoLights class="w-full" />
    </div>
    <div class="container mx-auto flex space-x-6 mt-6 lg:mt-12 pb-6 lg:pb-12">
      <div class="w-1/4 flex justify-center">
        <h1 class="text-2xl">About</h1>
      </div>
      <div class="w-3/4">
        <article class="prose lg:prose-lg text-theavenue-white">
          <div>
            <p>
              The Avenue welcomes all performers to our virtual live streaming platform. Our goal
              from inception has been to democratize live streaming to celebrate artists and fans.
              We do this by removing all obstacles, enabling our artists to perform without limits
              and fans to view these performances without restriction or cost.
            </p>
            <p>
              To our fans, we ask that you show your appreciation to our performers by leaving a tip
              to support their art and effort. Share great performances with those you care about
              and most of all, celebrate life with us on The Avenue.
            </p>
            <p>
              To our performers, our Avenue is a place that welcomes you. Enjoy the space we have
              built for you...for you are the person in the arena who we come to celebrate.
            </p>
            <p>As a family business, we extend a warm welcome to you all.</p>
          </div>
          <div>
            <p class="text-avenue-grey font-bold">Julia Folkart, CEO:</p>
            <p>
              Julia Folkart is a designer and artisan based in Fairfax, VA. She received a BFA in
              Scenic Design from Virginia Commonwealth University and has been working as a Display
              Coordinator with Anthropologie and as a freelance artist in the DC area.
            </p>
          </div>
          <div>
            <p class="text-avenue-grey font-bold">Erik Folkart, VP of Marketing and Sales</p>
            <p>
              Baltimore Born, a graduate of University of MD College Park, 25 year veteran
              consulting in the food and beverage industry, 10 time national award winner, Co-
              Creator of Mason Dixon Master Chef , the largest live single elimination “Iron chef
              Style” chef competition in the Mid- Atlantic, philanthropist, currently resides in
              Howard County MD.
            </p>
          </div>
          <div>
            <p class="text-avenue-grey font-bold">Dan Lavner, VP of Operations</p>
            <p>
              Originally from Bergen County NJ and a graduate of University of MD College Park, has
              taught high school math, worked construction and has been in software development for
              the past 20 years. Dan is an avid music lover.
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import LogoLights from '@/components/commons/LogoLights'

export default {
  name: 'AboutUsPage',

  auth: false,

  components: {
    LogoLights,
  },
}
</script>
