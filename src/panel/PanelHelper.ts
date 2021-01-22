import Panel from './Panel'

class PanelHelper {
  public panels: Panel[] | null = []

  private constructor () {
    // pass
  }

  private static instance: PanelHelper = new PanelHelper()

  static usePanelHelper (): PanelHelper {
    return this.instance
  }

  private handleMove = (e: MouseEvent): void => {
    if (this.panels === null) return
    let match = this.panels.find(item => item.isDragging || item.isResizing) as Panel | null
    if (match) {
      match.onMouseMove(e)
      match = null
    }
  }

  private handleUp = (): void => {
    if (this.panels === null) return
    let match = this.panels.find(item => item.isDragging || item.isResizing) as Panel | null
    if (match) {
      match.onMouseUp()
      match = null
    }
  }

  public addPanel (panel: Panel): void {
    if (this.panels === null) return
    if (this.panels.length === 0) {
      document.addEventListener('mousemove', this.handleMove)
      document.addEventListener('mouseup', this.handleUp)
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
      this.panels = null
    }
  }
}

export default PanelHelper
