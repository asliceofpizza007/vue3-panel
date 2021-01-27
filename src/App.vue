<template lang="pug">
.interface
  //- .row.flex.flex-a-center.flex-j-start
  //-   label(for="id") ID：
  //-   input(
  //-     v-model="id"
  //-     type="text"
  //-     name="id"
  //-     id="id"
  //-   )
  //- .row.flex.flex-a-center.flex-j-start
  //-   label(for="component") 組件名稱：
  //-   input(
  //-     v-model="component"
  //-     type="text"
  //-     name="component"
  //-     id="component"
  //-   )
  .row.flex.flex-a-center.flex-j-start
    label(for="header_title") Header Title：
    input(
      v-model="headerTitle"
      type="text"
      name="header_title"
      id="header_title"
      placeholder="title for panel header"
    )
  .row.flex.flex-a-start.flex-j-start.flex-column
    label Header Theme：
    .rank
      .row.flex.flex-a-center.flex-j-start
        label(for="header_padding") Padding：
        input(
          v-model="headerTheme.padding"
          type="text"
          name="header_padding"
          id="header_padding"
          placeholder="padding for panel header"
        )
      .row.flex.flex-a-center.flex-j-start
        label(for="header_fz") Font Size：
        input(
          v-model="headerTheme.fontSize"
          type="text"
          name="header_fz"
          id="header_fz"
          placeholder="font-size for panel header"
        )
      .row.flex.flex-a-center.flex-j-start
        label(for="header_lh") Line Height：
        input(
          v-model="headerTheme.lineHeight"
          type="text"
          name="header_lh"
          id="header_lh"
          placeholder="line-height for panel header"
        )
      .row.flex.flex-a-center.flex-j-start
        label(for="header_bg") Background：
        input(
          v-model="headerTheme.background"
          type="text"
          name="header_bg"
          id="header_bg"
          placeholder="background for panel header"
        )
      .row.flex.flex-a-center.flex-j-start
        label(for="header_color") Color：
        input(
          v-model="headerTheme.color"
          type="text"
          name="header_color"
          id="header_color"
          placeholder="color for panel header"
        )
  .row.flex.flex-a-center.flex-j-start
    label(for="size_width") Width：
    input(
      v-model="width"
      type="text"
      name="size_width"
      id="size_width"
      placeholder="panel width must be numerical string or number"
    )
  .row.flex.flex-a-center.flex-j-start
    label(for="size_height") Height：
    input(
      v-model="height"
      type="text"
      name="size_height"
      id="size_height"
      placeholder="panel height must be numerical string or number"
    )
  .row.flex.flex-a-center.flex-j-start
    label(for="poritions_top") Top：
    input(
      v-model="top"
      type="text"
      name="poritions_top"
      id="poritions_top"
      placeholder="position top must be numerical string or number"
    )
  .row.flex.flex-a-center.flex-j-start
    label(for="position_left") Left：
    input(
      v-model="left"
      type="text"
      name="position_left"
      id="position_left"
      placeholder="position left must be numerical string or number"
    )
  .row.flex.flex-a-center.flex-j-start
    label Handler：
    .check-list
      template(v-for="handler in handlerList" :key="handler")
        input(
          v-model="handlers"
          type="checkbox"
          :name="handler"
          :value="handler"
          :id="handler"
        )
        label(:for="handler") {{ handler }}
  .row.flex.flex-a-center.flex-j-start
    label closeOnEscape：
    label.switch
      input(
        v-model="esc"
        type="checkbox"
      )
      span.slider
  .row.flex.flex-a-center.flex-j-start
    label(for="maximize_text") onBeforeMaximize：
    input(
      v-model="beforeMax"
      type="text"
      name="maximize_text"
      id="maximize_text"
      placeholder="alert text trigger before maximize"
    )
  .row.flex.flex-a-center.flex-j-start
    label(for="minimize_text") onBeforeMinimize：
    input(
      v-model="beforeMin"
      type="text"
      name="minimize_text"
      id="minimize_text"
      placeholder="alert text trigger before minimize"
    )
  .row.flex.flex-a-center.flex-j-start
    label(for="normalize_text") onBeforeNormalize：
    input(
      v-model="beforeNor"
      type="text"
      name="normalize_text"
      id="normalize_text"
      placeholder="alert text trigger before normalize"
    )
  .row.flex.flex-a-center.flex-j-end
    button(@click="AddPanel") Create Panel

PanelGroup
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import usePanel from '@/hooks/usePanel'
import PanelGroup from './components/PanelGroup.vue'
import { Handler, Config, HeaderTheme } from '@/type'

export default defineComponent({
  name: 'App',
  components: {
    PanelGroup
  },
  setup () {
    const handlerList = ['n', 'e', 'w', 's', 'nw', 'ne', 'sw', 'se']
    const id = ref<string>('')
    const component = ref<string>('')
    const headerTitle = ref<string>('This is my panel')
    const headerTheme = reactive<HeaderTheme>({
      padding: '0.2rem 0.5rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      background: '#999999',
      color: '#fff'
    })
    const width = ref<number>(600)
    const height = ref<number>(400)
    const top = ref<number | string>(0)
    const left = ref<number | string>(0)
    const handlers = ref<Handler[]>([])
    const esc = ref<boolean>(true)
    const beforeMax = ref<string>('')
    const beforeMin = ref<string>('')
    const beforeNor = ref<string>('')
    const {
      configs,
      addPanel
    } = usePanel()
    let l = configs.value.length
    const AddPanel = (): void => {
      const config: Config = {
        id: String(++l),
        // component: component.value,
        headerTitle: headerTitle.value,
        headerTheme,
        size: {
          width: width.value,
          height: height.value
        },
        position: {
          top: top.value,
          left: left.value
        },
        resizeHandler: handlers.value,
        closeOnEscape: esc.value,
        onBeforeMaximize: beforeMax.value
          ? (panel) => {
              alert(beforeMax.value)
            }
          : null,
        onBeforeMinimize: beforeMin.value
          ? (panel) => {
              alert(beforeMin.value)
            }
          : null,
        onBeforeNormalize: beforeNor.value
          ? (panel) => {
              alert(beforeNor.value)
            }
          : null
      }
      addPanel(config)
    }
    return {
      handlerList,
      id,
      component,
      headerTitle,
      headerTheme,
      width,
      height,
      top,
      left,
      handlers,
      esc,
      beforeMax,
      beforeMin,
      beforeNor,
      AddPanel
    }
  }
})
</script>

<style lang="scss" scoped>
#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.interface {
  position: absolute;
  right: 10px;
  top: 10px;
  line-height: 2;
  padding: 1rem;
  background-color: #9FECF5;
  .row {
    label {
      font-weight: bold;
    }
    input[type="text"] {
      flex: 1;
    }
    button {
      margin-top: 0.5rem;
      cursor: pointer;
    }
    .check-list {
      label {
        padding: 0 5px;
      }
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
      input {
        width: 0;
        height: 0;
        opacity: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        background-color: #ccc;
        transition: all 0.4s ease;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 5px;
        bottom: 2px;
        border-radius: 50%;
        background-color: white;
        transition: all 0.4s ease;
      }

      input:checked + .slider {
        background-color: #2196F3;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }

      input:checked + .slider:before {
        transform: translateX(20px);
      }
    }
    * {
      outline: 0;
    }
    .rank {
      width: 100%;
      padding-left: 2rem;
    }
  }
}
</style>
