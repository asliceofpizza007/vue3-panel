<template lang="pug">
Panel(v-for="panel in panels"
  :key="panel.id"
  :config="panel"
  @close="handleClose(panel.id)"
)
  Test
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Panel from './Panel.vue'
import Test from '@/views/panelContent/panel.vue'

type Config = {
  id: number
}

export default defineComponent({
  name: 'PanelGroup',
  components: {
    Panel,
    Test
  },
  props: {
    panels: {
      type: Array as PropType<Config[]>,
      default: []
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const handleClose = (id: number): void => {
      emit('close', id)
    }
    return {
      handleClose
    }
  }
})
</script>
