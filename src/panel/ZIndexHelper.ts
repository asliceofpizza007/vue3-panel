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
    this.map.set(el, this.zIndex++)
  }

  public getIndex (el: HTMLElement): number {
    const index = this.map.get(el)
    if (index) {
      return index
    }
    return this.zIndex
  }

  public deleteFromMap (el: HTMLElement): void {
    this.map.delete(el)
  }

  public refreshZIndex (el: HTMLElement): void {
    const currentIndex = this.map.get(el)
    if (currentIndex && currentIndex !== this.zIndex - 1) {
      this.map.delete(el)
      this.update(el)
    }
  }
}

export default ZIndexHelper
