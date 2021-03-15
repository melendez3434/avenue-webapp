<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <div class="container mx-auto  text-center flex flex-col justify-center items-center  mt-20">
      <div class="flex space-x-6 items-center justify-center">
        <h1 class="text-4xl font-bold font-library">{{ competition.name }}</h1>
        <IcBread />
      </div>
      <p class="mt-5 text-lg font-bold">
        {{ competition.description }}
      </p>
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
            Each event consists of a five weeks competition where you will try to earn the biggest
            amount of points you can. These points will be earned with tips from the users, as in
            regular performances in The Avenue, at the rate of 1$ = 1 point. Viewers can tip during
            the performance or at any other moment of the same week in which the performance took
            place (from Monday to Friday).
          </p>
          <p class="text-base mb-2">
            During the competition, to give you and your business the best chance of winning, you
            should host as many events as you can fit into your schedule involving as many of your
            followers as you can. You will need to get them comfortable with watching you perform on
            The Avenue. A good way to get your following to activate their cards for voting is to do
            several charitable performances that will encourage them to sign up and do good at the
            same time. You can choose up to four charities. For every charity organization you add
            starting from the second one, you get 50 points for the final FACE-OFF.
          </p>
          <p class="text-base mb-2">
            Before competing, the performer must list the focus dish that will be streamed for each
            week of the competition (a different dish for each week). You can stream other content
            during each week to help build support and votes. All votes during the week will count
            towards your weekly competition total. After you sign up for an event, every time you
            schedule a new performance in the dashboard you will have a checkbox to let you indicate
            if this performance is part of that event or not and if you are going to cook your dish
            of the week or not. If you are going to cook the dish of the week you should also
            indicate it in the title of your performance.
          </p>
          <p class="text-base mb-2">
            Each week of the competition, the event will start on Monday at 12 am EST and End 11:59
            pm EST Friday. All the vote totals for each competitor will be displayed on the site for
            all to see on the event’s page.
          </p>
          <div class="mt-8">
            <h3 class="text-xl mb-3">Pre-Tournament</h3>
            <p class="text-base mb-2">
              Each competitor must attend the pre-tournament sponsor showcase. This event will take
              place at any time the week before the event’s starting week. Attendees will receive
              200 Avenue Votes (not tip jar votes) to spend on your performance. These points will
              be added at the end of the competition to the total number of votes to help determine
              the Champion. Notice that these points count for the final but they don’t represent
              money.
            </p>
          </div>
          <div class="mt-8">
            <h3 class="text-xl mb-3">Charity Mondays</h3>
            <p class="text-base mb-2">
              Charity day is always Mondays. The earned money from that day will go to the charity
              you chose for that specific week, but you will still get the points for that
              performance. The performer will be responsible to deliver funds to the charity after
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
              FACE-OFF. You can stream that week’s competition dish as many times as you wish and
              indicate that on the performance title, but you must cook it on the FACE-OFF too if
              you qualify. You can stream other supporting content to accrue as many votes as you
              can. On Sunday we will announce the winner of that round and they will be declared
              that round winner for their stated dish and receive the progressive total for that
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
    <h2 class="container mx-auto text-center mt-20 mb-4 text-avenue-white-light text-xl">
      What are you waiting for?
    </h2>
    <button
      class="mx-auto border text-light-yellow border-theavenue-yellow-neon rounded px-3 py-0.5 text-theavenue-yellow-neon font-library text-2xl hover:text-light-white mt-1 focus:outline-none cursor-pointer"
      @click="$modal.show('join-event-modal', { competition })"
    >
      Sign up for {{ competition.name }}
    </button>
  </div>
</template>

<script>
import IcBread from '@/assets/svg/bread.svg?inline'

export default {
  name: 'JoinEventPage',

  auth: false,

  components: { IcBread },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.get(this.$route.params.id)
      this.competition = data
    } catch (error) {
      this.$router.replace({ name: 'events' })
      console.error('There was an error trying to fetch the requested event')
    }
  },

  data() {
    return {
      competition: {},
      showRules: false,
    }
  },

  methods: {
    toggleRules() {
      this.showRules = !this.showRules
    },
  },
}
</script>
