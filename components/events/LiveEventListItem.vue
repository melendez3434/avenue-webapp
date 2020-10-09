<template>
  <el-collapse-item :name="event.id">
    <template slot="title">
      <div
        class="w-full bg-theavenue-white text-theavenue-black flex items-center justify-center font-league-gothic text-6xl py-2 uppercase"
      >
        <p>{{ event.talent.name }}</p>
        <p class="ml-6">{{ dateTitle }}</p>
        <p class="ml-6">{{ hourTitle }}</p>
        <p v-if="isLive" class="text-theavenue-red-neon ml-6">live</p>
      </div>
    </template>
    <div
      class="w-full bg-no-repeat h-86 bg-gray-800 bg-cover flex items-center justify-center relative"
      :style="{ backgroundImage: `url(${event.talent.cover_photo})` }"
    >
      <div class="dimmer-gradient w-full absolute top-0 left-0 h-full" />
      <div
        class="container mx-auto flex items-end justify-between h-full text-theavenue-white z-10 mb-12"
      >
        <div class="flex items-center">
          <img
            :src="event.talent.photo"
            :alt="`${event.talent.name} photo`"
            class="rounded-full w-16 h-16"
          />
          <div class="ml-5">
            <p class="font-sans text-2xl font-bold leading-6">{{ event.talent.name }}</p>
            <p class="font-sans text-lg">{{ genres }}</p>
          </div>
        </div>
        <div class="flex">
          <div class="font-sans flex flex-col text-right">
            <p class="text-lg font-bold leading-6">{{ event.name }}</p>
            <p class="text-base leading-6">{{ dateFormatted }}</p>
          </div>
          <div v-if="isLive" class="ml-6">
            <nuxt-link
              :to="{ name: 'event-slug', params: { slug: event.id } }"
              class="font-library border-2 py-2 px-3 uppercase text-theavenue-red-neon text-light-red text-3xl rounded-md border-theavenue-red-neon"
              style="box-shadow: 1px 1px 7px #FF2F2F;"
            >
              WATCH NOW
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </el-collapse-item>
</template>
<script>
import { format, isWithinInterval } from 'date-fns'

export default {
  name: 'LiveEventListItem',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    dateFormatted() {
      return format(new Date(this.event.starts_at), 'EEEE, LLLL d / h:mm aa')
    },

    dateTitle() {
      return format(new Date(this.event.starts_at), 'MMM dd')
    },

    hourTitle() {
      return format(new Date(this.event.starts_at), 'h:mm aa')
    },

    genres() {
      const genresString = this.event.venues.reduce(
        (string, genre) => `${string} ${genre.name},`,
        ''
      )

      return genresString.slice(0, -1)
    },

    isLive() {
      return isWithinInterval(new Date(), {
        start: new Date(this.event.starts_at),
        end: new Date(this.event.ends_at),
      })
    },
  },
}
</script>
<style>
.el-collapse-item__header {
  @apply w-full;
  @apply p-0;
  @apply h-full;
  @apply text-6xl;
  line-height: normal;
}

.el-collapse-item__content {
  @apply p-0;
}

.el-collapse-item__wrap {
  @apply border-none;
}
.dimmer-gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
