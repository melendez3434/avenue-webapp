<template>
  <transition name="show">
    <section class="bg-avenue-blue-light p-6 sm:h-72 fixed bottom-0 z-10">
      <IcClose
        aria-role="button"
        aria-label="close"
        class="absolute top-4 right-4 cursor-pointer"
        @click="close"
      />
      <header class="mb-8">
        <h2 class="text-2xl mb-3">Stay Tuned!</h2>
        <p>This streaming is about to end but these events are live now</p>
      </header>
      <ul class="sm:flex sm:flex-row m-auto gap-4 ">
        <li v-for="event in events" :key="event.id" class="h-3/6 w-52 overflow-hidden mb-6 sm:mb-0">
          <nuxt-link
            :to="{ name: 'event-slug', params: { slug: event.id } }"
            class="flex flex-col justify-center items-center"
          >
            <EventThumbnail :event="event" class="w-full" />
            <span>
              {{ event.talent.name }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </section>
  </transition>
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
  transition: all 0.5s ease-in-out;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}

.show-enter-to,
.show-leave {
  opacity: 1;
}
</style>
