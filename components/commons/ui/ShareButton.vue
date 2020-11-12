<template>
  <el-popover v-model="urlCopied" placement="top" trigger="manual">
    <div>Url copied to your clipboard!</div>
    <button
      slot="reference"
      v-clipboard="url"
      class="font-library text-lg hover:text-light-white flex space-x-4 items-center border border-theavenue-white px-2 rounded-md py-0.5"
      style="box-shadow: 0px 0px 10px #FFFFFF;"
      target="_blank"
      @success="showPopover"
    >
      <IcShare class="w-6 h-6" />
      share
    </button>
  </el-popover>
</template>

<script>
import { clipboard } from 'vue-clipboards'
import IcShare from '@/assets/svg/anchor_arrow.svg?inline'

export default {
  name: 'ShareButton',

  components: { IcShare },

  directives: { clipboard },

  props: {
    url: {
      type: String,
      default: process.client ? window.location.href : '',
    },
  },

  data() {
    return {
      urlCopied: false,
    }
  },

  methods: {
    showPopover() {
      this.urlCopied = true

      setTimeout(() => {
        this.urlCopied = false
      }, 2000)
    },
  },
}
</script>
