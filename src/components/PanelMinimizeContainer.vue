<template lang="pug">
Teleport(to="body")
  #panel-minimize-container
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PanelMinimizeContainer'
})
</script>
<style lang="scss" scoped>
#panel-minimize-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow:  row wrap-reverse;
  z-index: 9999;
}
</style>
