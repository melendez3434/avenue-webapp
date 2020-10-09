<template>
  <div class="min-h-screen bg-avenue-black text-white w-full">
    <Navbar />
    <nuxt />
    <modal name="user-access-modal" adaptive height="auto" @before-open="beforeOpenUserAccess">
      <UserAccessModal :active-tab="modal.active" />
    </modal>
  </div>
</template>
<script>
import Navbar from '@/components/commons/Navbar'
import UserAccessModal from '@/components/users/modals/UserAccessModal'

export default {
  name: 'EventDetail',

  components: {
    Navbar,
    UserAccessModal,
  },

  data() {
    return {
      modal: {
        active: 'login',
      },
    }
  },

  methods: {
    beforeOpenUserAccess({ params }) {
      if (params.active) {
        this.modal.active = params.active
      }
    },
  },
}
</script>
<style>
.vm--container > .vm--modal {
  @apply bg-theavenue-background-light;
  @apply rounded-md;
}
</style>
