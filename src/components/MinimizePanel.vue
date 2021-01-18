<template lang="pug">
.minimize-panel
  slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MinimizePanel'
})
</script>
<style lang="scss" scoped>
.minimize-panel{
  width: 200px;
  ::v-deep(.panel-header){
    border: 1px solid #ddd;
    border-bottom: unset;
  }
}
</style>
