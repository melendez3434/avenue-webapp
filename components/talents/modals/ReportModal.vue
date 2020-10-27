<template>
  <div class="relative">
    <div class="absolute text-theavenue-white top-0 right-0 mt-4 mr-6">
      <IcClose class="cursor-pointer" @click="close" />
    </div>
    <div class="px-6 pb-5 pt-10 bg-theavenue-background">
      <p class="text-sm leading-5">Report</p>
      <p class="text-2xl leading-tight font-medium">{{ talent.name }}</p>
    </div>
    <form class="mt-3 px-6 pb-10 pt-5" @submit.prevent="report">
      <div v-for="reason in reasons" :key="reason.value" class="mb-6">
        <R64Radio
          :value="form.reason"
          :label="reason.label"
          :radio-value="reason.value"
          name="reason"
          @click="form.reason = $event"
        />
      </div>
      <div class="mb-6">
        <R64Textarea
          v-model="form.message"
          full
          label="Can you describe or provide more detail about this issue?"
        />
      </div>

      <R64Button
        type="submit"
        class="mt-8"
        full
        :loading="busy"
        :disabled="!form.reason || !form.message"
      >
        Confirm
      </R64Button>
    </form>
  </div>
</template>
<script>
import IcClose from '@/assets/svg/close_2.svg?inline'

export default {
  name: 'ReportModal',

  components: { IcClose },

  props: {
    talent: {
      type: Object,
      required: true,
    },
  },

  async fetch() {
    const { data } = await this.$api.talent.reportReasons()
    this.reasons = data
  },

  data() {
    return {
      busy: false,
      reasons: [],
      form: {
        reason: '',
        message: '',
      },
    }
  },

  methods: {
    async report() {
      this.busy = true
      await this.$api.talent.report(this.talent.id, this.form)
      this.busy = false
      this.close()
    },

    close() {
      this.$modal.hide('report-modal')
    },
  },
}
</script>
