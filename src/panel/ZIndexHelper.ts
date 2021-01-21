class ZIndexHelper {
  public map: Map<HTMLElement, number>
  public zIndex: number
  private constructor () {
    this.map = new Map()
    this.zIndex = 100
  }

  private static instance: ZIndexHelper = new ZIndexHelper()

  static useZIndexHelper (): ZIndexHelper {
    return this.instance
  }

  public update (el: HTMLElement): void {
    let panel = el as HTMLElement | null
    if (panel === null) return
    this.map.set(panel, this.zIndex++)
    panel = null
  }

  public getIndex (el: HTMLElement): number {
    let panel = el as HTMLElement | null
    let index
    if (panel !== null) {
      index = this.map.get(panel)
      panel = null
    }
    if (index) {
      return index
    }
    return this.zIndex
  }

  public deleteFromMap (el: HTMLElement): void {
    let panel = el as HTMLElement | null
    if (panel === null) return
    this.map.delete(el)
    panel = null
  }

  public refreshZIndex (el: HTMLElement): void {
    let panel = el as HTMLElement | null
    if (panel !== null) {
      const currentIndex = this.map.get(el)
      if (currentIndex && currentIndex !== this.zIndex - 1) {
        this.map.delete(el)
        this.update(el)
      }
      panel = null
    }
  }
}

export default ZIndexHelper
