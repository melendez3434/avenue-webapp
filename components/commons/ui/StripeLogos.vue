<template>
  <div class="flex flex-col p-4 space-y-4">
    <div class="text-xs">We never store any card details. Safe and secure SSL encrypted.</div>
    <div class="flex items-center space-x-4">
      <IcStripe class="w-40 fill-current text-white" />
      <IcSecured class="w-16 fill-current text-theavenue-green-neon" />
    </div>
  </div>
</template>

<script>
import IcStripe from '@/assets/svg/stripe.svg?inline'
import IcSecured from '@/assets/svg/secured.svg?inline'

export default {
  name: 'StripeLogos',

  components: { IcStripe, IcSecured },
}
</script>
