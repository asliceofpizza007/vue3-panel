<template lang="pug">
Teleport(to="body")
  .panel(ref="panelRef" id="panel")
    .panel-header
      .title header title
      .toolbar
        .controller.minimize(@click="onMinimize")
          .i.mdi-window-minimize
        .controller.normalize(@click="onNormalize")
          .i.mdi-window-restore
        .controller.maximize(@click="onMaximize")
          .i.mdi-window-maximize
        .controller.close(@click="onClose")
          .i.mdi-window-close
    .panel-content
      slot
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import Panel from '@/panel/Panel'

export default defineComponent({
  name: 'Panel',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    config: {
      type: Object
    }
  },
  emits: ['close'],
  setup (prop, { emit }) {
    const panelRef = ref<HTMLElement>()
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
    }

    const onNormalize = (): void => {
      panel.normalize()
    }

    const onMinimize = (): void => {
      panel.minimize()
    }
    return {
      panelRef,
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
