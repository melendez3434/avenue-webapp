<template>
  <article class="container mx-auto hidden md:flex md:flex-col py-12 space-y-14 max-w-screen-lg">
    <div v-if="isFuture" class="py-8">
      <div class="mb-8">
        <h2 class="text-3xl">Upcoming Shows</h2>
      </div>
      <div
        v-for="event in events"
        :key="event.id"
        class="text-theavenue-white w-max rounded-lg p-8 mb-12"
        style="box-shadow: 0px 0px 10px #FFFFFF;"
      >
        <TalentEventListItem :event="event" :talent="talent" is-future />
      </div>
      <div v-if="!events.length">
        <p>This artist doesn't have any event planned for the future.</p>
      </div>
    </div>

    <div v-else>
      <div class="mb-8">
        <h2 class="text-3xl">Past Shows</h2>
      </div>
      <p class="mb-8">Revive {{ talent.name }} past shows with just one click</p>
      <div v-for="event in events" :key="event.id">
        <TalentEventListItem :event="event" :talent="talent" />
      </div>
    </div>

    <div v-if="renderPaginationButtons" class="flex justify-center mt-6 text-xl">
      <button
        v-if="showPreviousLink"
        aria-label="previous page in past shows"
        @click="$emit('page:previous')"
      >
        ◀︎
      </button>
      <span>&nbsp;Page {{ currentPage }} of {{ totalPages }}&nbsp;</span>
      <button v-if="showNextLink" aria-label="next page in past shows" @click="$emit('page:next')">
        ►
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TalentEvents',

  props: {
    events: {
      type: Array,
      default: () => [],
    },

    talent: {
      type: Object,
      default: null,
    },

    meta: {
      type: Object,
      default: () => ({}),
    },

    isFuture: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    renderPaginationButtons() {
      return this.meta.last_page > 1
    },

    showPreviousLink() {
      return this.meta.current_page > 1
    },

    showNextLink() {
      return this.meta.current_page < this.totalPages
    },

    totalPages() {
      return this.meta.last_page
    },

    currentPage() {
      return this.meta.current_page
    },
  },
}
</script>
