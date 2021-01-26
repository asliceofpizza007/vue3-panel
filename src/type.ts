import { Ref } from 'vue'
import Panel from '@/panel/Panel'

export type Size = {
  width: number
  height: number
}

export type Position = {
  top: number | string
  left: number | string
}

export declare type Handler = 'n' | 'e' | 'w' | 's' | 'nw' | 'ne' | 'sw' | 'se'

export type Config = {
  id: string
  // component: string
  headerTitle: string
  size: Size
  position: Position
  resizeHandler: Handler[]
  closeOnEscape: boolean
  onBeforeMaximize: ((panel: Panel) => void) | null
  onBeforeMinimize: ((panel: Panel) => void) | null
  onBeforeNormalize: ((panel: Panel) => void) | null
}

export interface UsePanel {
  configs: Ref<Config[]>
  addPanel: (config: Config) => void
  removePanel: (id: string) => void
}