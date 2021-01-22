import { ref, Ref } from 'vue'

type Config = {
  id: number
}

interface UsePanel {
  configs: Ref<Config[]>
  addPanel: (config: Config) => void
  removePanel: (id: number) => void
}

const configs = ref<Config[]>([])

const usePanel = (): UsePanel => {
  const addPanel = (config: Config): void => {
    configs.value.push(config)
  }
  const removePanel = (id: number): void => {
    const index = configs.value.findIndex(config => config.id === id)
    if (index) {
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
