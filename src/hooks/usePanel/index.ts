import { ref } from 'vue'
import { Config, UsePanel } from '@/type'

const configs = ref<Config[]>([])

const usePanel = (): UsePanel => {
  const checkValidate = (config: Config): boolean => {
    const {
      size,
      position
    } = config
    const {
      width,
      height
    } = size
    const {
      top,
      left
    } = position
    const numerical = [width, height, top, left]
    return numerical.every(el => !isNaN(Number(el)))
  }

  const addPanel = (config: Config): void => {
    if (checkValidate(config)) {
      const duplicated = configs.value.find(con => con.id === config.id)
      if (!duplicated) {
        configs.value.push(config)
      }
    } else {
      throw new Error('attribute width, height, top, left must be numerical string or number')
    }
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
