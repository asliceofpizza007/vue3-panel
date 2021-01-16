import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import MinimizeContainer from '@/components/PanelMinimizeContainer.vue'
import Panel from '@/components/Panel.vue'
import '@/assets/scss/icon/iconfont.css'

const app = createApp(App)
const panel = {
  install () {
    app.component('Panel', Panel)
    const el = document.createElement('div')
    document.body.appendChild(el)
    createApp(MinimizeContainer).mount(el).$nextTick(() => {
      document.body.removeChild(el)
    })
  }
}

app.use(store).use(panel).mount('#app')
