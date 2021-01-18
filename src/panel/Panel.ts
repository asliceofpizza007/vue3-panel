import ZIndexHelper from './ZIndexHelper'

type Size = {
  width: number
  height: number
}

type Position = {
  top: string
  left: string
}

class Panel {
  private isMouseDown = false
  private status = 'normalized'
  private containerWidth = 0
  private containerHeight = 0
  private diffX = 0
  private diffY = 0
  private tempPos: Position = {
    top: '0',
    left: '0'
  }

  private zIndexHelper: ZIndexHelper

  constructor (
    private el: HTMLElement,
    private size: Size
  ) {
    this.zIndexHelper = ZIndexHelper.useZIndexHelper()
    this.zIndexHelper.update(this.el)
    this.setZindex()
    this.setSize(size)
    this.setListener()
    // this.checkStatus()
  }

  private setZindex () {
    const index = this.zIndexHelper.getIndex(this.el)
    this.el.style.zIndex = index + ''
  }

  private setSize (size: Size): void {
    this.el.style.width = size.width + 'px'
    this.el.style.height = size.height + 'px'
  }

  private setContainer (): void {
    const {
      offsetWidth,
      offsetHeight
    } = document.body
    this.containerWidth = offsetWidth
    this.containerHeight = offsetHeight
  }

  private handleMove = (e: MouseEvent): void => {
    this.isMouseDown = true
    this.el.style.userSelect = 'none'
    this.setContainer()
    const {
      offsetTop,
      offsetLeft
    } = this.el
    const {
      clientX,
      clientY
    } = e
    this.diffX = clientX - offsetLeft
    this.diffY = clientY - offsetTop
  }

  private onPanelSelect = (e: MouseEvent): void => {
    if (this.status !== 'normalized') return
    this.zIndexHelper.refreshZIndex(this.el)
    this.setZindex()
    if (e.ctrlKey) {
      this.el.style.cursor = 'move'
      this.handleMove(e)
    }
  }

  private onMouseDown = (e: MouseEvent): void => {
    if (this.status !== 'normalized') return
    this.handleMove(e)
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isMouseDown) return false
    const {
      clientX,
      clientY
    } = e
    const {
      width,
      height
    } = this.size

    let newLeft = clientX - this.diffX
    let newTop = clientY - this.diffY
    const newBtn = newTop + height
    const newRight = newLeft + width

    if (newTop < 0) {
      newTop = 0
    }
    if (newLeft < 0) {
      newLeft = 0
    }
    if (newBtn > this.containerHeight) {
      newTop = this.containerHeight - height
    }
    if (newRight > this.containerWidth) {
      newLeft = this.containerWidth - width
    }

    this.el.style.top = newTop + 'px'
    this.el.style.left = newLeft + 'px'
    this.tempPos.top = this.el.style.top
    this.tempPos.left = this.el.style.left
  }

  private onMouseUp = (): void => {
    this.isMouseDown = false
    this.el.style.cursor = 'initial'
    this.el.style.userSelect = 'unset'
  }

  private setListener (): void {
    const header = this.el.querySelector('.panel-header') as HTMLElement
    if (header) {
      header.addEventListener('mousedown', this.onMouseDown)
    }
    this.el.addEventListener('mousedown', this.onPanelSelect)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  public normalize (): void {
    const content = this.el.querySelector('.panel-content') as HTMLElement
    content.style.display = 'block'
    this.status = 'normalized'
    this.zIndexHelper.refreshZIndex(this.el)
    this.setZindex()
    const {
      top,
      left
    } = this.tempPos
    this.el.style.top = top
    this.el.style.left = left
    this.setSize(this.size)
  }

  public minimize (): void {
    this.isMouseDown = false
    this.status = 'minimized'
  }

  public maximize (): void {
    this.isMouseDown = false
    this.status = 'maximized'

    const maxSize: Size = {
      width: this.containerWidth,
      height: this.containerHeight
    }
    this.setSize(maxSize)
    this.el.style.top = 0 + ''
    this.el.style.left = 0 + ''
  }

  public close (): void {
    const header = this.el.querySelector('.panel-header') as HTMLElement
    if (header) {
      header.removeEventListener('mousedown', this.onMouseDown)
    }
    this.el.removeEventListener('mousedown', this.onPanelSelect)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.zIndexHelper.deleteFromMap(this.el)
  }
}

export default Panel
