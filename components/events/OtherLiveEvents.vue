<template>
  <teleport to="body">
    <transition name="show">
      <section class="bg-avenue-blue-light p-6 h-72 fixed bottom-0 z-10">
        <IcClose
          aria-role="button"
          aria-label="close"
          class="absolute top-4 right-4 cursor-pointer"
          @click="close"
        />
        <header>
          <h2 class="text-2xl mb-3">Stay Tuned!</h2>
          <p>This streaming is about to end but these events are live now</p>
        </header>
        <ul v-for="event in events" :key="event.id">
          <li class="h-3/6 w-40 flex flex-col justify-center items-center">
            <nuxt-link :to="{ name: 'event-slug', params: { slug: event.id } }">
              <EventThumbnail :event="event" />
              <span>{{ event.talent.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </section>
    </transition>
  </teleport>
</template>

<script>
import IcClose from '@/assets/svg/close.svg?inline'

export default {
  components: { IcClose },

  props: {
    events: {
      type: Array,
      default: null,
    },
  },

  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
}
</style>
