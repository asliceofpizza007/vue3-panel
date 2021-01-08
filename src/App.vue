<template>
  <Panel>
    <div>Panel</div>
    <p>123</p>
  </Panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Panel from './components/Panel.vue'

export default defineComponent({
  name: 'App',
  components: {
    Panel
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
