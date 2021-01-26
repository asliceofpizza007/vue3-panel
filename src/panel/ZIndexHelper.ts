class ZIndexHelper {
  public map: Map<string, number>
  public zIndex: number
  private constructor () {
    this.map = new Map()
    this.zIndex = 100
  }

  private static instance: ZIndexHelper = new ZIndexHelper()

  static useZIndexHelper (): ZIndexHelper {
    return this.instance
  }

  public update (id: string): void {
    this.map.set(id, this.zIndex++)
  }

  public getIndex (id: string): number {
    const index = this.map.get(id)
    if (index) {
      return index
    }
    return this.zIndex
  }

  public getTopestId (): string | undefined {
    const values = [...this.map.values()]
    const max = Math.max(...values)
    const maxIndex = values.findIndex(val => max === val)
    const keys = [...this.map.keys()]
    return keys[maxIndex]
  }

  public deleteFromMap (id: string): void {
    this.map.delete(id)
  }

  public refreshZIndex (id: string): void {
    const currentIndex = this.map.get(id)
    if (currentIndex && currentIndex !== this.zIndex - 1) {
      this.map.delete(id)
      this.update(id)
    }
  }
}

export default ZIndexHelper
