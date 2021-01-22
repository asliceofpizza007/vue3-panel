<template lang="pug">
button(@click="AddPanel") add panel
Test
PanelGroup(
  :panels="panels"
  @close="handleClose"
)
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PanelGroup from './components/PanelGroup.vue'
import Test from '@/views/panelContent/panel.vue'

type Config = {
  id: number
}

export default defineComponent({
  name: 'App',
  components: {
    PanelGroup,
    Test
  },
  setup () {
    const panels = ref([] as Config[])
    // const width = ref<number>(0)
    // const height = ref<number>(0)
    // const top = ref<number>(0)
    // const left = ref<number>(0)
    // const beforeMax = ref<string>('')
    // const beforeMin = ref<string>('')
    // const beforeNor = ref<string>('')
    let counter = 1
    const AddPanel = (): void => {
      const config: Config = {
        id: counter++
      }
      panels.value.push(config)
    }

    const handleClose = (id: number): void => {
      const index = panels.value.findIndex(panel => panel.id === id)
      if (index !== -1) {
        panels.value.splice(index, 1)
      }
    }
    return {
      panels,
      AddPanel,
      handleClose
    }
  }
})
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: linear-gradient(to right, #456781, #971451);
}
button {
  position: absolute;
  right: 10px;
  top: 10px;
  &:not(:first-child) {
    top: 40px;
    right: 10px;
  }
}
</style>
