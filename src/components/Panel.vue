<template lang="pug">
Teleport(to="body")
  .panel-mask
    .panel(ref="panelRef" id="panel"
      :style="{\
        width: width + 'px',\
        height: height + 'px',\
      }"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseout="onMouseUp"
    )
      .panel-header header title
      .panel-content
        slot
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Panel',
  setup () {
    const panelRef = ref<HTMLElement>()
    const width = ref(600)
    const height = ref(400)
    const top = ref(window.innerHeight / 4 as string | number)
    const left = ref(window.innerWidth / 4 as string | number)

    let isMouseDown = false
    let diffX: number,
      diffY: number,
      elmHeight: number,
      elmWidth: number,
      containerHeight: number,
      containerWidth: number

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true
      const {
        clientX,
        clientY
      } = e
      if (panelRef.value instanceof HTMLElement) {
        const {
          offsetTop,
          offsetLeft,
          offsetWidth,
          offsetHeight
        } = panelRef.value

        elmWidth = offsetWidth
        elmHeight = offsetHeight

        const container = panelRef.value.offsetParent as HTMLElement
        containerWidth = container.offsetWidth
        containerHeight = container.offsetHeight
        diffX = clientX - offsetLeft
        diffY = clientY - offsetTop
      }
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return false
      const {
        clientX,
        clientY
      } = e

      let newLeft = clientX - diffX
      let newTop = clientY - diffY
      const newBtn = newTop + elmHeight
      const newRight = newLeft + elmWidth

      if (newTop < 0) {
        newTop = 0
      }
      if (newLeft < 0) {
        newLeft = 0
      }
      if (newBtn > containerHeight) {
        newTop = containerHeight - elmHeight
      }
      if (newRight > containerWidth) {
        newLeft = containerWidth - elmWidth
      }

      if (panelRef.value instanceof HTMLElement) {
        panelRef.value.style.top = newTop + 'px'
        panelRef.value.style.left = newLeft + 'px'
      }
    }
    const onMouseUp = () => {
      isMouseDown = false
    }

    return {
      panelRef,
      width,
      height,
      top,
      left,
      onMouseDown,
      onMouseMove,
      onMouseUp
    }
  }
})
</script>
<style lang="scss" scoped>
.panel-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .panel {
    position: absolute;
    border: 1px solid #ddd;
    &-header {
      width: 100%;
      line-height: 1.5;
      padding: 0.2rem 0.5rem;
      color: #fff;
      background-color: #999999;
    }
    &-content {

    }
  }
}
</style>
