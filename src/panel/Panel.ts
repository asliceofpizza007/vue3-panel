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
  private isDragging = false
  private isResizing = false
  private status = 'normalized'
  private containerWidth = 0
  private containerHeight = 0
  private diffX = 0
  private diffY = 0
  private tempPos: Position = {
    top: '0',
    left: '0'
  }

  private originX = 0
  private originY = 0
  private originMouseX = 0
  private originMouseY = 0
  private resizeDirection = ''
  private tempSize: Size = {
    width: 0,
    height: 0
  }

  private readonly miniumSize: Size = {
    width: 240,
    height: 360
  }

  private zIndexHelper: ZIndexHelper

  constructor (
    private el: HTMLElement | null,
    private size: Size
  ) {
    this.zIndexHelper = ZIndexHelper.useZIndexHelper()
    if (this.el !== null) {
      this.zIndexHelper.update(this.el)
    }
    this.setZindex()
    this.setSize(size)
    this.setContainer()
    this.setListener()
  }

  private setZindex = (): void => {
    if (this.el === null) return
    const index = this.zIndexHelper.getIndex(this.el)
    this.el.style.zIndex = index + ''
  }

  private setSize (size: Size): void {
    if (this.el === null) return
    this.el.style.width = size.width + 'px'
    this.el.style.height = size.height + 'px'
  }

  private setContainer = (): void => {
    const {
      offsetWidth,
      offsetHeight
    } = document.body
    this.containerWidth = offsetWidth
    this.containerHeight = offsetHeight
  }

  private setMoveState = (e: MouseEvent): void => {
    if (this.el === null) return
    this.isDragging = true
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

  public onHandlerDown = (e: MouseEvent, handler: string): void => {
    if (this.el === null) return
    e.stopPropagation()
    this.zIndexHelper.refreshZIndex(this.el)
    this.setZindex()

    this.isResizing = true
    this.el.style.userSelect = 'none'
    this.originX = this.el.getBoundingClientRect().left
    this.originY = this.el.getBoundingClientRect().top
    this.originMouseX = e.pageX
    this.originMouseY = e.pageY
    this.resizeDirection = handler
  }

  public onPanelSelect = (e: MouseEvent): void => {
    if (this.el === null) return
    this.zIndexHelper.refreshZIndex(this.el)
    this.setZindex()
    if (e.ctrlKey) {
      this.el.style.cursor = 'move'
      this.setMoveState(e)
    }
  }

  public onHeaderDown = (e: MouseEvent): void => {
    this.setMoveState(e)
  }

  private handleDragging = (e: MouseEvent): void => {
    if (this.el === null) return
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

  private positionOutOfWindow (x: number, y: number): boolean {
    const isHorizontalOverflow = x < 0 || x > this.containerWidth
    const isVerticalOverflow = y < 0 || y > this.containerHeight
    return isHorizontalOverflow || isVerticalOverflow
  }

  private handleResizing = (e: MouseEvent): void => {
    if (this.positionOutOfWindow(e.pageX, e.pageY)) return
    if (this.el === null) return
    const resizeDiffX = e.pageX - this.originMouseX
    const resizeDiffY = e.pageY - this.originMouseY
    let fixedTop = false
    let fixedLeft = false
    let width = this.size.width
    let height = this.size.height
    const directions: string[] = [...this.resizeDirection]
    directions.forEach(direction => {
      switch (direction) {
        case 'n':
          height -= resizeDiffY
          fixedTop = true
          break
        case 'e':
          width += resizeDiffX
          break
        case 'w':
          width -= resizeDiffX
          fixedLeft = true
          break
        case 's':
          height += resizeDiffY
          break
        default:
      }
    })
    if (width > this.miniumSize.width) {
      this.tempSize.width = width
      if (fixedLeft) {
        this.el.style.left = this.originX + resizeDiffX + 'px'
      }
    }

    if (height > this.miniumSize.height) {
      this.tempSize.height = height
      if (fixedTop) {
        this.el.style.top = this.originY + resizeDiffY + 'px'
      }
    }
    this.tempPos.top = this.el.style.top
    this.tempPos.left = this.el.style.left
    this.setSize(this.tempSize)
  }

  private onMouseMove = (e: MouseEvent): void => {
    if (this.isDragging) {
      this.handleDragging(e)
    } else if (this.isResizing) {
      this.handleResizing(e)
    }
  }

  private onMouseUp = (): void => {
    if (this.el === null) return
    if (this.isResizing) {
      this.size.width = this.tempSize.width
      this.size.height = this.tempSize.height
    }
    this.isDragging = false
    this.isResizing = false
    this.el.style.cursor = 'initial'
    this.el.style.userSelect = 'unset'
  }

  private setListener = (): void => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  public normalize = (): void => {
    if (this.el === null) return
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

  public minimize = (): void => {
    this.isDragging = false
    this.status = 'minimized'
  }

  public maximize = (): void => {
    if (this.el === null) return
    this.isDragging = false
    this.status = 'maximized'

    const maxSize: Size = {
      width: this.containerWidth,
      height: this.containerHeight
    }
    this.setSize(maxSize)
    this.el.style.top = 0 + ''
    this.el.style.left = 0 + ''
  }

  public close = (): void => {
    if (this.el === null) return
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.zIndexHelper.deleteFromMap(this.el)
    setTimeout(() => {
      this.el = null
    }, 0)
  }
}

export default Panel
