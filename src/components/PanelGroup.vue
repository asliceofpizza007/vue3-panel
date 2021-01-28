<template lang="pug">
Panel(
  v-for="panel in configs"
  :key="panel.id"
  :config="panel"
)
  component(:is="getDynamicComponent(panel.component)")
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import usePanel from '@/hooks/usePanel'
import Panel from './Panel.vue'
import { DynamicComponent } from '@/type'

export default defineComponent({
  name: 'PanelGroup',
  components: {
    Panel
  },
  setup () {
    const {
      configs
    } = usePanel()

    const getDynamicComponent = (component: DynamicComponent) => {
      if (typeof component === 'string') {
        return component
      }
      return defineAsyncComponent(component)
    }

    return {
      configs,
      getDynamicComponent
    }
  }
})
</script>
