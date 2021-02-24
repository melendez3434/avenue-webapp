<template>
  <div class="px-8 py-8 bg-avenue-blue-light text-center flex flex-col items-center">
    <p class="text-3xl font-bold">Haven't your heard?</p>
    <p class="mt-8 text-lg font-bold">The Avenue hosts cooking competitions now!</p>
    <p class="my-5 text-lg px-6">
      <slot />
    </p>
    <IcDish />

    <slot name="link" class="mt-10" />
  </div>
</template>
<script>
import IcDish from '@/assets/svg/dish.svg?inline'

export default {
  name: 'CompetitionModalAnnouncemnt',
  components: {
    IcDish,
  },
}
</script>
