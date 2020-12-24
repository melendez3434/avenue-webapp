<template>
  <article class="container mx-auto hidden md:flex md:flex-col py-12 space-y-14 max-w-screen-lg">
    <div class="py-8">
      <div class="mb-8">
        <h2 class="text-3xl">Upcoming Shows</h2>
      </div>
      <div
        v-for="event in upcomingEvents"
        :key="event.id"
        class="text-theavenue-white w-max rounded-lg p-8 mb-12"
        style="box-shadow: 0px 0px 10px #FFFFFF;"
      >
        <TalentEventListItem :event="event" :talent="talent" is-future />
      </div>
      <div v-if="!upcomingEvents.length">
        <p>This artist doesn't have any event planned for the future.</p>
      </div>
    </div>
    <div>
      <div class="space-y-6">
        <h2 class="text-3xl">Past Shows</h2>
        <div v-if="pastEvents.length">
          <p class="mb-8">Revive {{ talent.name }} past shows with just one click</p>
          <div
            v-for="event in visiblePastEvents"
            :key="event.id"
            :playback-id="event.talent.playback_id"
            class="border-b border-gray-800"
          >
            <TalentEventListItem :event="event" :talent="talent" />
          </div>
          <div v-if="renderPaginationButtons" class="flex justify-center mt-6">
            <button
              v-if="showPreviousLink"
              aria-label="previous page in past shows"
              @click="updatePage(currentPage - 1)"
            >
              ◀︎
            </button>
            <span>&nbsp;Page {{ currentPage + 1 }} of {{ totalPages }}&nbsp;</span>
            <button
              v-if="showNextLink"
              aria-label="next page in past shows"
              @click="updatePage(currentPage + 1)"
            >
              ►
            </button>
          </div>
        </div>
        <div v-else>
          <p>This artist doesn't have past shows.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TalentEvents',

  props: {
    upcomingEvents: {
      type: Array,
      default: null,
    },

    futureEvents: {
      type: Array,
      default: null,
    },

    talent: {
      type: Object,
      default: null,
    },

    meta: {
      type: Object,
      default: null,
    },
  },

  computed: {
    renderPaginationButtons() {
      return this.meta.lastPage > 1
    },

    showPreviousLink() {
      return this.meta.currentPage === 0 ? false : true
    },

    showNextLink() {
      return this.meta.currentPage === this.totalPages - 1 ? false : true
    },

    totalPages() {
      return this.meta.lastPage
    },
  },
}
</script>
