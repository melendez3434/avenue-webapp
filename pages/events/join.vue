<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto  text-center flex flex-col justify-center items-center  mt-20">
      <h1 class="text-4xl font-library text-center text-avenue-white-light text-light-white">
        Competitions
      </h1>
    </div>
    <div class="container mx-auto mt-20 text-avenue-white-light">
      <h2 class="text-3xl">Rules and conditions</h2>
    </div>
    <section class="mx-auto mt-12 container">
      <div>
        <h3 class="text-xl mb-3">Entering Requirements</h3>
        <p class="text-base">
          In order to perform on The Avenue’s events you must have a performer account in The
          Avenue.
        </p>
      </div>
      <div class="mt-8">
        <h3 class="text-xl mb-3">General Rules</h3>
        <p class="text-base mb-2">
          Each event consists of a five weeks competition where you will try to earn the biggest
          amount of points you can. These points will be earned with tips from the users, as in
          regular performances in The Avenue, at the rate of 1$ = 1 point. Viewers can tip during
          the performance or at any other moment of the same week in which the performance took
          place (from Monday to Friday).
          <button
            class="text-theavenue-turquoise-neon cursor-pointer"
            :style="{ display: showRules ? 'none' : 'inline' }"
            @click="toggleRules"
          >
            Learn more about the rules...
          </button>
        </p>
        <div v-show="showRules">
          <p class="text-base mb-2">
            During the competition, to give you or your business the best chance of winning, you
            should host as many events as you can fit into your schedule involving as many of your
            followers as you can. You will need to get them comfortable with watching you perform on
            The Avenue. A good way to get your following to activate their cards for voting is to do
            several charitable performances that will encourage them to sign up and do good at the
            same time. You can choose up to four charities. For every charity organization you add
            starting from the second one, you get 50 points for the final FACE-OFF.
          </p>
          <p class="text-base mb-2">
            All votes/tips during the week will count
            towards your weekly competition total. After you sign up for an event, every time you
            schedule a new performance in the dashboard you will have a checkbox to let you indicate
            if this performance is part of that event or not.
          </p>
          <p class="text-base mb-2">
            Each week of the competition, the competition will start on Monday at 12 am EST and End 11:59
            pm EST Friday. All the vote totals for each competitor will be displayed on the site for
            all to see on the competition's page.
          </p>
          <div class="mt-8">
            <h3 class="text-xl mb-3">Charity Mondays</h3>
            <p class="text-base mb-2">
              Charity day is always Mondays. The money earned that day will go to the charity
              of you choice for that specific week, but you will still get the points for that
              performance. You will be responsible to deliver funds to the charity after
              they are paid. You will want to have the charity promote your competition to support
              you and gain as many votes as you can.
            </p>
          </div>
          <div class="mt-8">
            <h3 class="text-xl mb-3">How to Win</h3>
            <p class="text-base mb-2">
              The top 4 competitors of each week by Friday, as indicated by the competition board,
              will compete on Saturday from 12 pm EST to 12 am EST at the time of your choice. If
              there is a tie all that have the top 4 amount of votes will participate in the
              FACE-OFF. You can stream other supporting content to accrue as many votes as you
              can. On Sunday we will announce the winner of that round and they will be declared
              that round winner and receive the progressive total for that
              round (5 percent of all the votes). In the event of a tie, the round will be split
              amongst the winners. There will be 4 FACE OFF challenges and a winner of winners if
              there is a tie for each round. The FACE-OFF totals will not be added to the
              competition totals.
            </p>
          </div>
          <div class="mt-8">
            <h3 class="text-xl mb-3">Prizes</h3>
            <p class="text-base mb-2">
              As in every other performance in The Avenue, you will get 85% of your tips.
            </p>
            <p class="text-base mb-2">
              Each week’s round winner will also get 5% of the week total tips (percentage of total
              tips of all performances).
            </p>
            <p class="text-base mb-2">
              The final winner gets 5% of the tips of the entire competition.
            </p>
            <p class="text-base mb-2">
              The organizer gets 5% of the tips of the entire competition.
            </p>
            <p class="text-base mb-2">
              The Avenue gets 15% of the total earnings.
            </p>
          </div>
        </div>
        <button
          class="text-theavenue-turquoise-neon cursor-pointer mt-4"
          :style="{ display: showRules ? 'inline' : 'none' }"
          @click="toggleRules"
        >
          Hide rules
        </button>
      </div>
    </section>
    <section class="container mx-auto mt-10">
      <div class="flex flex-col justify-center xl:grid items-center gap-6" :style="{ gridTemplateColumns: hasMoreThanOneEvent ? '2' : '1'}">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
        />
      </div>
    </section>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'JoinEventPage',

  auth: false,

  data() {
    return {
      showRules: false,
    }
  },

  computed: {
    ...mapState({
      competitions: state => state.global.competitions,
    }),

    hasMoreThanOneEvent() {
      return this.competitions.length > 1
    }
  },

  methods: {
    toggleRules() {
      this.showRules = !this.showRules
    },
  },
}
</script>
