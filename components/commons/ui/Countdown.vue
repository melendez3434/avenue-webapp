<template>
  <div
    class=" mx-auto w-4/6 lg:w-1/2 mt-20 text-theavenue-white border p-8 flex justify-around items-center"
    style="box-shadow: 0px 0px 10px #FFFFFF;"
  >
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">03</span>
      <span class="text-xs md:text-xl">Days</span>
    </div>
    <div class="w-5 h-full bg-theavenue-gray" />
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">23</span>
      <span class="text-xs md:text-xl">Hours</span>
    </div>
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">45</span>
      <span class="text-xs md:text-xl">Minutes</span>
    </div>
    <div class="flex flex-col justify-center items-center w-1/4">
      <span class="font-league-gothic text-6xl md:text-xxl">03</span>
      <span class="text-xs md:text-xl">Seconds</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    competition: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
