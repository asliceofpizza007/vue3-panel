import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import MinimizeContainer from '@/components/PanelMinimizeContainer.vue'
import Panel from '@/components/Panel.vue'
import '@/assets/scss/icon/iconfont.css'
import '@/assets/scss/reset.scss'
import '@/assets/scss/main.scss'

const app = createApp(App)

const panel = {
  async install () {
    app.component('Panel', Panel)
    let el = document.createElement('div') as HTMLElement | null
    if (el !== null) {
      document.body.appendChild(el)
      await createApp(MinimizeContainer).mount(el).$nextTick()
      document.body.removeChild(el)
      el = null
    }
  }
}

app.use(store).use(panel).mount('#app')
