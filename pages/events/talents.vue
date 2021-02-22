<template>
  <div
    class="mx-auto flex-1 flex flex-col justify-start text-avenue-white pb-12 bg-theavenue-background-light available-min-height"
  >
    <LogoLights class="w-full" />
    <div class="container mx-auto text-center mt-14">
      <h1 class="text-4xl font-bold">Events</h1>
      <p class="mt-3 text-lg font-bold">
        Join the competition, help charity organizations and win the price!
      </p>

      <section class="mt-12">
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <IcPodium class="mx-auto h-40" />
            <p class="sm:px-12">Know your competitors in a pre-tournament first encounter</p>
          </div>
          <div>
            <IcDish class="mx-auto h-40" />
            <p class="sm:px-8">Prepare a star dish every week and engage your audience</p>
          </div>
          <div>
            <IcLoveHand class="mx-auto h-40" />
            <p class="sm:px-14">Help a charity of your choice every week</p>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-6 md:px-48">
          <div>
            <IcCake class="mx-auto h-40" />
            <p class="sm:px-6">Be among the first four scores each week to face your competitors</p>
          </div>
          <div>
            <IcStars class="mx-auto h-40" />
            <p class="sm:px-6">Win the price and taste the glory!</p>
          </div>
        </div>
      </section>
    </div>
    <div class="container mx-auto text-center mt-40 text-avenue-white-light">
      <h2 class="text-3xl">Rules and conditions</h2>
      <p class="mt-3 text-lg font-bold">
        Before you sign up to an event we encourage you to read the rules and conditions for events
      </p>
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
            starting from the second onez, you get 50 points for the final FACE-OFF.
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
    <div class="container mx-auto text-center mt-40 text-avenue-white-light">
      <h2 class="text-3xl">What are you waiting for?</h2>
      <p class="mt-3 text-lg font-bold">
        Join an event now!
      </p>
    </div>

    <div class="container mx-auto mt-10">
      <section v-if="competitions.length" class="grid grid-cols-3 gap-6">
        <CompetitionListItem
          v-for="competition in competitions"
          :key="competition.id"
          :competition="competition"
          class="border border-theavenue-yellow-neon px-10 py-5 rounded-lg"
          is-talent
        />
      </section>
      <section v-else class="text-center">
        <p class="text-lg">There are no active events at the moment</p>
      </section>
    </div>
  </div>
</template>
<script>
import CompetitionListItem from '@/components/competitions/CompetitionListItem'
import IcPodium from '@/assets/svg/podium.svg?inline'
import IcDish from '@/assets/svg/dish.svg?inline'
import IcLoveHand from '@/assets/svg/love_hand.svg?inline'
import IcCake from '@/assets/svg/cake.svg?inline'
import IcStars from '@/assets/svg/Stars.svg?inline'

export default {
  name: 'EventsTalentPage',

  auth: false,

  components: {
    CompetitionListItem,
    IcPodium,
    IcDish,
    IcLoveHand,
    IcCake,
    IcStars,
  },

  async fetch() {
    try {
      const { data } = await this.$api.competitions.list()
      this.competitions = data
    } catch (error) {
      console.error("Couldn't fetch events")
    }
  },

  data() {
    return {
      competitions: [],
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
