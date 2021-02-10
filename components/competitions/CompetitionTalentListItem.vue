<template>
  <Collapse>
    <template slot="header">
      <div class="w-full flex">
        <div class="flex-1">Artist name</div>
        <div class="w-48 text-right">100</div>
        <div class="w-48 text-right pr-12">300</div>
      </div>
    </template>
    <div class="px-12 pb-12">
      <div class="w-full flex items-center justify-between">
        <div class="flex space-x-3 items-center">
          <div class="w-10 h-10 bg-theavenue-gray rounded-full" />
          <span>Artist name</span>
        </div>
        <span>Restaurant name with link</span>
        <span>City and State</span>
      </div>

      <div class="mt-10">
        <p class="text-xl">Past performances</p>
        <div class="mt-5 grid grid-cols-4 gap-5">
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3">Performance Name</span>
          </div>
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3">Performance Name</span>
          </div>
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3">Performance Name</span>
          </div>
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3">Performance Name</span>
          </div>
          <div class="text-center">
            <EventThumbnail width="w-full" height="h-32" />
            <span class="block mt-3">Performance Name</span>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <p>
          Charities this performer is contributing to: Charity 1, charity 2, charity 3, charity 4
          with their links
        </p>
      </div>

      <div class="mt-10 flex items-center justify-center w-full">
        <ShareButton />
      </div>
    </div>
  </Collapse>
</template>
<script>
import Collapse from '@/components/commons/ui/Collapse'
import EventThumbnail from '@/components/events/EventThumbnail'
import ShareButton from '@/components/commons/ui/ShareButton'

export default {
  name: 'CompetitionTalentListItem',

  components: {
    Collapse,
    EventThumbnail,
    ShareButton,
  },
}
</script>
