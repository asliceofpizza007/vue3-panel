<template lang="pug">
Panel(
  v-for="panel in configs"
  :key="panel.id"
  :config="panel"
)
  Test
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import usePanel from '@/hooks/usePanel'
import Panel from './Panel.vue'
import Test from '@/views/panelContent/panel.vue'

export default defineComponent({
  name: 'PanelGroup',
  components: {
    Panel,
    Test
  },
  setup () {
    const {
      configs
    } = usePanel()

    return {
      configs
    }
  }
})
</script>
