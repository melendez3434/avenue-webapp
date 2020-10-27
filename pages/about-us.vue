<template>
  <div>
    <div
      class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white bg-theavenue-background-light"
    >
      <LogoLights class="w-full" />
    </div>
    <div class="container mx-auto flex space-x-6 mt-6 lg:mt-12 pb-6 lg:pb-12">
      <div class="w-1/4 flex justify-center">
        <h2 class="text-2xl">About</h2>
      </div>
      <div class="w-3/4">
        <article class="prose lg:prose-lg text-theavenue-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque urna hendrerit
          sollicitudin fringilla. Sed rhoncus senectus vitae cursus molestie. Fermentum enim tempor,
          ut sapien fermentum nam. Tellus velit morbi nunc enim. Ut vitae vestibulum dolor quis
          dictumst pellentesque morbi. In vel nisl quis erat fringilla purus vestibulum ornare.
          Convallis aenean orci lorem neque tincidunt nam congue viverra platea. Molestie at tellus
          diam aliquam risus faucibus adipiscing sed porttitor. Orci, eget at in enim tempor nisl
          nam erat sagittis. Facilisi cras nulla at mi tincidunt. Scelerisque feugiat iaculis
          adipiscing ut nibh volutpat ut nisi. Ultrices a dolor mauris, mattis eget purus feugiat.
          Sed duis semper aliquam arcu id vulputate vestibulum. Dis tempor vitae sollicitudin sed
          maecenas facilisis convallis amet mauris. Blandit ornare dolor magna fames morbi in cursus
          euismod. Facilisis diam aliquam congue magna parturient. Maecenas enim mattis enim eget.
          Sed mauris fermentum mauris auctor ultrices in tempor. Non est, ipsum fermentum, dui. A
          sodales euismod in tempus sit dolor. Nisi, faucibus nisi adipiscing nulla blandit
          bibendum. Pellentesque ac egestas eget sodales morbi. Facilisi pellentesque amet cursus
          ornare scelerisque neque, egestas tempor eros. Imperdiet donec non sociis egestas. Tellus
          hac urna tempus gravida enim tellus. Egestas sagittis convallis nunc quis metus arcu,
          commodo tellus. Viverra sed aliquam quis praesent feugiat enim odio. Egestas est, velit
          turpis ipsum accumsan platea iaculis eget. Neque viverra nulla id praesent arcu sed ornare
          in senectus. Porttitor ut aliquam venenatis, sit. Mi, vestibulum, felis pellentesque mi in
          et scelerisque adipiscing. Mauris, diam aliquam consectetur morbi ac laoreet pellentesque.
          Leo, porttitor quam venenatis adipiscing semper aliquam. Mattis quis duis risus id
          integer. Non id massa massa nibh lacus purus nisi. Turpis convallis fringilla massa
          pharetra augue.
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
