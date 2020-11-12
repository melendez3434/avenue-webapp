<template>
  <el-collapse-item :name="event.id">
    <template slot="title">
      <div
        class="w-full bg-theavenue-white text-theavenue-black flex items-center justify-center font-league-gothic text-2xl md:text-6xl py-2 px-4 uppercase"
      >
        <p class="whitespace-no-wrap truncate max-w-xs lg:max-w-lg xl:max-w-none">
          {{ event.talent.name }}
        </p>
        <p class="ml-2 lg:ml-6 whitespace-no-wrap">{{ dateTitle }}</p>
        <p class="ml-2 lg:ml-6 whitespace-no-wrap">{{ hourTitle }}</p>
        <p v-if="isLive" class="text-theavenue-red-neon ml-2 lg:ml-6">live</p>
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
        <TalentCard
          :talent="event.talent"
          class="ta-hidden md:flex"
          :category="event.category.name"
          link
        />
        <div class="flex items-center mb-0 md:mb-2 mx-auto md:mx-0">
          <div class="font-sans flex flex-col items-end">
            <ShareButton class="mb-2" :url="`${baseUrl}event/${event.id}`" />
            <p class="text-md md:text-lg font-bold leading-6">
              {{ event.name }} ({{ event.rating.name }} Rating)
            </p>
            <p class="text-xs md:text-base leading-6 whitespace-no-wrap">{{ dateFormatted }}</p>
          </div>
          <div v-if="isLive" class="ml-6">
            <nuxt-link
              :to="{ name: 'event-slug', params: { slug: event.id } }"
              class="font-library border-2 py-2 px-3 uppercase text-theavenue-red-neon text-light-red text-md md:text-2xl rounded-md border-theavenue-red-neon"
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
import spacetime from 'spacetime'
import ShareButton from '@/components/commons/ui/ShareButton'

export default {
  name: 'LiveEventListItem',

  components: { ShareButton },

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userTimezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    startTimeZoneDate() {
      return spacetime(this.event.starts_at, 'UTC').goto(this.userTimezone)
    },

    endTimeZoneDate() {
      return spacetime(this.event.ends_at, 'UTC').goto(this.userTimezone)
    },

    dateFormatted() {
      return this.startTimeZoneDate.format('{day}, {month} {date-pad} / {hour}:{minute-pad} {ampm}')
    },

    dateTitle() {
      return this.startTimeZoneDate.format('{month-short} {date-pad}')
    },

    hourTitle() {
      return this.startTimeZoneDate.format('{hour}:{minute-pad} {ampm}')
    },

    isLive() {
      return spacetime().isBetween(this.startTimeZoneDate, this.endTimeZoneDate)
    },

    baseUrl() {
      return process.client ? window.location.href : ''
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
