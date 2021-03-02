<template>
  <div class="border border-theavenue-yellow-neon px-10 py-8 rounded-lg text-center event-width">
    <p class="text-3xl text-avenue-white-light font-library uppercase">
      {{ competition.name }}
    </p>
    <div class="w-full flex items-center justify-center my-4">
      <!-- TODO: change for the competition's icon -->
      <IcBread />
      <!-- <img :src="competition.icon" alt="competition icon" /> -->
    </div>
    <p class="text-avenue-white mt-5">{{ competition.description }}</p>
    <p class="text-avenue-grey mt-5 text-xs">From {{ dateFrom }} to {{ dateTo }}</p>
    <p class="mt-5 font-bold">{{ caption }}</p>
    <div class="mt-5 w-full flex items-center justify-center">
      <nuxt-link
        v-if="!isTalent"
        :to="{ name: 'events-id', params: { id: competition.id } }"
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      >
        {{ buttonText }}
      </nuxt-link>
      <button
        v-else
        class="uppercase border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
        @click="$modal.show('join-event-modal', { competition })"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
<script>
import spacetime from 'spacetime'
import IcBread from '@/assets/svg/bread.svg?inline'

export default {
  name: 'CompetitionListItem',

  components: {
    IcBread,
  },

  props: {
    competition: {
      type: Object,
      required: true,
    },
    isTalent: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    caption() {
      return this.isTalent ? 'Join today!' : 'Who will win this competition? It’s on you'
    },

    buttonText() {
      return this.isTalent ? 'Join' : 'See event'
    },

    userTimezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    startTimeZoneDate() {
      return spacetime(this.competition.starts_at, 'UTC').goto(this.userTimezone)
    },

    endTimeZoneDate() {
      return spacetime(this.competition.ends_at, 'UTC').goto(this.userTimezone)
    },

    dateFrom() {
      return this.startTimeZoneDate.format('{month-short} {date-pad}')
    },

    dateTo() {
      return this.endTimeZoneDate.format('{month-short} {date-pad}')
    },
  },
}
</script>

<style scoped>
.event-width {
  width: calc(33.3% - 1.5rem);
}

@media screen and (max-width: 1200px) {
  .event-width {
    width: calc(50% - 0.75rem);
  }
}

@media screen and (max-width: 800px) {
  .event-width {
    width: 100%;
  }
}
</style>
