<template lang="pug">
Teleport(to="body")
  .panel(ref="panelRef" v-show="!isMinimized")
    .panel-header
      .title header title
      .toolbar
        .controller.minimize(v-show="!isMinimized"
          @click="onMinimize"
        )
          .i.mdi-window-minimize
        .controller.normalize(v-show="!isNormalized"
          @click="onNormalize"
        )
          .i.mdi-window-restore
        .controller.maximize(v-show="!isMaximized"
          @click="onMaximize"
        )
          .i.mdi-window-maximize
        .controller.close(@click="onClose")
          .i.mdi-window-close
    .panel-content
      slot
Teleport(to="#panel-minimize-container")
  MinimizePanel(v-if="isMinimized")
    .panel-header
      .title header title
      .toolbar
        .controller.normalize(v-show="!isNormalized"
          @click="onNormalize"
        )
          .i.mdi-window-restore
        .controller.maximize(v-show="!isMaximized"
          @click="onMaximize"
        )
          .i.mdi-window-maximize
        .controller.close(@click="onClose")
          .i.mdi-window-close
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Panel from '@/panel/Panel'
import MinimizePanel from './MinimizePanel.vue'

export default defineComponent({
  name: 'Panel',
  components: {
    MinimizePanel
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    config: {
      type: Object
    }
  },
  emits: ['close'],
  setup (prop, { emit }) {
    const panelRef = ref<HTMLElement>()
    const isMinimized = ref<boolean>(false)
    const isMaximized = ref<boolean>(false)
    const isNormalized = ref<boolean>(true)
    let panel: Panel

    onMounted(() => {
      const size = {
        width: 600,
        height: 400
      }
      if (panelRef.value) {
        panel = new Panel(panelRef.value, size)
      }
    })
    onBeforeUnmount(() => {
      onClose()
      console.log('unmount')
    })

    const onClose = (): void => {
      emit('close')
    }

    const onMaximize = (): void => {
      panel.maximize()
      isMaximized.value = true
      isMinimized.value = false
      isNormalized.value = false
    }

    const onNormalize = (): void => {
      panel.normalize()
      isMaximized.value = false
      isMinimized.value = false
      isNormalized.value = true
    }

    const onMinimize = (): void => {
      panel.minimize()
      isMaximized.value = false
      isMinimized.value = true
      isNormalized.value = false
    }
    return {
      panelRef,
      isMaximized,
      isMinimized,
      isNormalized,
      onClose,
      onMaximize,
      onMinimize,
      onNormalize
    }
  }
})
</script>
<style lang="scss" scoped>
.panel {
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 1.5;
    padding: 0.2rem 0.5rem;
    color: #fff;
    background-color: #999999;
    cursor: move;

    .title {
      font-weight: bold;
    }

    .toolbar{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .controller {
        cursor: pointer;

        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }
  }
  &-content {
    width: 100%;
    padding: 0.5rem;
    flex: 1;
    overflow: auto;
    background: #fff;
  }
}
</style>
