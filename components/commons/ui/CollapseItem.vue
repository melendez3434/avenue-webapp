<template>
  <div>
    <slot name="title" @click="$emit('toggle')" />
    <div>
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CollapseItem',
}
</script>
