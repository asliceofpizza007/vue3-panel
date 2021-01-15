<template lang="pug">
Teleport(to="body")
  .panel-minimize-container
    .test
    .test
    .test
    .test
    .test
    .test
    .test
    .test
    .test
    .test
    .test
    .test
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PanelMinimizeContainer'
})
</script>
<style lang="scss" scoped>
.panel-minimize-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow:  row wrap-reverse;
  .test {
    width: 200px;
    height: 30px;
    background-color: #eaa1a1;
    border: 1px solid #ddd;
  }
}
</style>
