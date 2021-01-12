class ZIndexHelper {
  public map: Map<number, HTMLElement>
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
    this.map.set(this.zIndex++, el)
  }

  public getIndex (el: HTMLElement): number {
    let index = this.zIndex
    const keys = [...this.map.keys()]
    for (const key of keys) {
      if (this.map.get(Number(key)) === el) {
        index = Number(key)
        break
      }
    }

    return index
  }

  refreshZIndex (el: HTMLElement): void {
    const keys = [...this.map.keys()]
    let currentIndex
    for (const key of keys) {
      if (this.map.get(Number(key)) === el) {
        currentIndex = key
        break
      }
    }
    if (currentIndex && currentIndex !== this.zIndex - 1) {
      this.map.delete(currentIndex)
      this.update(el)
    }
  }
}

export default ZIndexHelper
