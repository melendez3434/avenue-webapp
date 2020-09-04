<template>
  <div class="mx-auto flex-1 flex flex-col items-center justify-center text-avenue-white">
    <div class="w-full flex h-full flex-1 h-content">
      <div id="twitch-streaming" class="flex-1" style="height: 85%" />
      <div
        class="w-full bg-avenue-black flex flex-col space-y-4 text-avenue-white-light px-8 py-4 overflow-y-scroll"
      >
        <div v-for="comment in Array(10).keys()" :key="comment" class="flex space-x-5">
          <div>
            <div class="w-10 h-10 bg-avenue-white rounded-full" />
          </div>
          <div class="bg-avenue-black-light rounded py-1 px-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipscing elit. Id vivamus.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted() {
    new Twitch.Embed('twitch-streaming', {
      width: 940,
      height: '100%',
      channel: 'hotbeatstv',
      layout: 'video',
    })
  },
}
</script>
<style>
.h-content {
  height: calc(100vh - 68.89px);
}
</style>
