<template lang="pug">
Test
Panel
  Test
Panel
  Test
Panel
  Test
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Panel from './components/Panel.vue'
import Test from '@/views/panelContent/panel.vue'

export default defineComponent({
  name: 'App',
  components: {
    Panel,
    Test
  }
})
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: linear-gradient(to right, #456781, #971451);
}
</style>
