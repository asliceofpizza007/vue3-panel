import Panel from './Panel'
import ZIndexHelper from './ZIndexHelper'
import usePanel from '@/hooks/usePanel'

class PanelHelper {
  public panels: Panel[] | null = []
  private panelOnTop: Panel | null = null
  private zIndexHelper: ZIndexHelper = ZIndexHelper.useZIndexHelper()

  private constructor () {
    // pass
  }

  private static instance: PanelHelper = new PanelHelper()

  static usePanelHelper (): PanelHelper {
    return this.instance
  }

  public setTopPanel = (panel: Panel): void => {
    this.panelOnTop = panel
  }

  private getTopPanel = (): (Panel | null) => this.panelOnTop

  private handleMove = (e: MouseEvent): void => {
    if (this.panels === null) return
    let match = this.getTopPanel()
    if (match) {
      match.onMouseMove(e)
      match = null
    }
  }

  private handleUp = (): void => {
    if (this.panels === null) return
    let match = this.getTopPanel()
    if (match) {
      match.onMouseUp()
      match = null
    }
  }

  private handleEscape = (e: KeyboardEvent): void => {
    if (e.keyCode !== 27) return
    const {
      configs,
      removePanel
    } = usePanel()
    const id = this.zIndexHelper.getTopestId()
    const currConfig = configs.value.find(config => config.id === id)
    if (currConfig?.closeOnEscape && id !== undefined) {
      removePanel(id)
    }
  }

  public addPanel (panel: Panel): void {
    if (this.panels === null) return
    if (this.panels.length === 0) {
      document.addEventListener('mousemove', this.handleMove)
      document.addEventListener('mouseup', this.handleUp)
      document.addEventListener('keydown', this.handleEscape)
    }
    this.panels.push(panel)
  }

  public closePanel (panel: Panel): void {
    if (this.panels === null) return
    const index = this.panels.findIndex(item => item === panel)
    if (index !== -1) {
      this.panels.splice(index, 1)
    }
    if (this.panels.length === 0) {
      document.removeEventListener('mousemove', this.handleMove)
      document.removeEventListener('mouseup', this.handleUp)
      document.removeEventListener('keydown', this.handleEscape)
      this.panels = []
    }
  }
}

export default PanelHelper
