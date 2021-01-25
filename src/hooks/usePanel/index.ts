import { ref } from 'vue'
import { Config, UsePanel } from '@/type'

const configs = ref<Config[]>([])

const usePanel = (): UsePanel => {
  const addPanel = (config: Config): void => {
    configs.value.push(config)
  }
  const removePanel = (id: string): void => {
    const index = configs.value.findIndex(config => config.id === id)
    if (index !== -1) {
      configs.value.splice(index, 1)
    }
  }
  return {
    configs,
    addPanel,
    removePanel
  }
}

export default usePanel
