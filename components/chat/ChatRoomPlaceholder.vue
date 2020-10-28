<template>
  <div class="flex flex-col bg-avenue-blue-light">
    <ChatMessagesPlaceholder class="flex-1" />
    <client-only>
      <div
        class=" bg-theavenue-background-extra-light h-20 flex items-center justify-center px-8 py-2"
      >
        <div class="w-full flex rounded-lg bg-avenue-blue-dark items-center">
          <ChatRoomInput ref="input" class="bg-avenue-blue-dark flex-1 text-xs rounded-l-lg" />
          <div class="pr-2 flex">
            <img ref="heart" src="~assets/emojis/heart.png" />
            <img ref="smile" src="~assets/emojis/smile.png" />
            <img ref="fire" src="~assets/emojis/fire.png" />
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'ChatRoomPlaceholder',
}
</script>
