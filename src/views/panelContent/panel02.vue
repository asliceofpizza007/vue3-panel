<template lang="pug">
p Hello, Panel02!
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Panel01'
})
</script>
<style lang="scss" scoped>
p {
  display: inline;
  font-size: 48px;
  font-weight: bolder;
  background: linear-gradient(to right, #971451, #456781);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
