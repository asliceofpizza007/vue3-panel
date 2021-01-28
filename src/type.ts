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

export type HeaderTheme = {
  padding?: string
  fontSize?: string
  lineHeight?: string
  background?: string
  color?: string
}

export declare type Handler = 'n' | 'e' | 'w' | 's' | 'nw' | 'ne' | 'sw' | 'se'

/** due to shims-vue.d.ts of module *.vue declaration */
export type DynamicComponent = string | (() => Promise<typeof import('*.vue')>)

export type Config = {
  id: string
  component: DynamicComponent
  headerTitle: string
  headerTheme?: HeaderTheme
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
