<template lang="pug">
Teleport(to="body")
  .panel(
    v-show="!isMinimized"
    ref="panelRef"
    @mousedown="onPanelSelect"
  )
    .panel-header(
      :class="`${!isNormalized ? 'no-handler': ''}`"
      @mousedown="onHeaderDown"
    )
      .title {{ config.headerTitle }}
      .toolbar
        .controller.minimize(
          v-show="!isMinimized"
          @click="onMinimize"
        )
          .i.mdi-window-minimize
        .controller.normalize(
          v-show="!isNormalized"
          @click="onNormalize"
        )
          .i.mdi-window-restore
        .controller.maximize(
          v-show="!isMaximized"
          @click="onMaximize"
        )
          .i.mdi-window-maximize
        .controller.close(@click="onClose")
          .i.mdi-window-close
    .panel-content
      slot
    .handler(
      v-for="handler in config.resizeHandler"
      :key="handler"
      :class="`handler-${handler} ${!isNormalized ? 'no-handler' : ''}`"
      @mousedown="onHandlerDown($event, handler)"
    )
Teleport(to="#panel-minimize-container")
  MinimizePanel(v-show="isMinimized")
    .panel-header(:class="`${!isNormalized ? 'no-handler': ''}`")
      .title {{ config.headerTitle }}
      .toolbar
        .controller.normalize(
          v-show="!isNormalized"
          @click="onNormalize"
        )
          .i.mdi-window-restore
        .controller.maximize(
          v-show="!isMaximized"
          @click="onMaximize"
        )
          .i.mdi-window-maximize
        .controller.close(@click="onClose")
          .i.mdi-window-close
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, PropType, toRefs } from 'vue'
import Panel from '@/panel/Panel'
import MinimizePanel from './MinimizePanel.vue'
import usePanel from '@/hooks/usePanel'
import { Config } from '@/type'

const defaultConfig: Config = {
  id: 'default',
  // component: '',
  headerTitle: 'headerTitle',
  size: {
    width: 600,
    height: 400
  },
  position: {
    top: '',
    left: ''
  },
  resizeHandler: ['n', 'e', 'w', 's', 'nw', 'ne', 'sw', 'se'],
  closeOnEscape: false,
  onBeforeMaximize: null,
  onBeforeMinimize: null,
  onBeforeNormalize: null
}

export default defineComponent({
  name: 'Panel',
  components: {
    MinimizePanel
  },
  props: {
    config: {
      type: Object as PropType<Config>,
      default: {}
    }
  },
  setup (props) {
    const panelRef = ref<HTMLElement | null>()
    const isMinimized = ref<boolean>(false)
    const isMaximized = ref<boolean>(false)
    const isNormalized = ref<boolean>(true)
    let panel: Panel

    const { config } = toRefs(props)

    const {
      removePanel
    } = usePanel()

    onMounted(() => {
      const size = {
        width: 600,
        height: 400
      }
      const conf = {
        ...defaultConfig,
        ...config.value
      }
      if (panelRef.value) {
        panel = new Panel(panelRef.value, conf)
      }
    })
    onBeforeUnmount(() => {
      panelRef.value = null
      console.log('unmount')
    })

    const onPanelSelect = (e: MouseEvent): void => {
      if (!isNormalized.value) return
      panel.onPanelSelect(e)
    }

    const onHeaderDown = (e: MouseEvent): void => {
      if (!isNormalized.value) return
      panel.onHeaderDown(e)
    }

    const onHandlerDown = (e: MouseEvent, handler: string): void => {
      if (!isNormalized.value) return
      panel.onHandlerDown(e, handler)
    }

    const onClose = (): void => {
      panel.close()
      removePanel(config.value.id)
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
      onPanelSelect,
      onHandlerDown,
      onHeaderDown,
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

  .handler {
    position: absolute;
    &-n,
    &-s {
      width: 90%;
      height: 10px;
    }
    &-n {
      top: -5px;
      cursor: n-resize;
    }

    &-s {
      bottom: -5px;
      cursor: s-resize;
    }

    &-e,
    &-w {
      width: 10px;
      height: 90%;
      top: 50%;
      transform: translateY(-50%);
    }

    &-e {
      right: -5px;
      cursor: e-resize;
    }
    &-w {
      left: -5px;
      cursor: w-resize;
    }

    &-nw,
    &-ne,
    &-sw,
    &-se {
      width: 10px;
      height: 10px;
    }

    &-nw {
      top: -5px;
      left: -5px;
      cursor: nw-resize;
    }
    &-ne {
      top: -5px;
      right: -5px;
      cursor: ne-resize;
    }
    &-sw {
      bottom: -5px;
      left: -5px;
      cursor: sw-resize;
    }
    &-se {
      bottom: -5px;
      right: -5px;
      cursor: se-resize;
    }
  }
  .no-handler {
    cursor: default;
  }
}
</style>
