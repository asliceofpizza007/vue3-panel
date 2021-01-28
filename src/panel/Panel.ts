import ZIndexHelper from './ZIndexHelper'
import PanelHelper from './PanelHelper'
import { Size, Position, Config } from '@/type'

class Panel {
  public isDragging = false
  public isResizing = false
  public status = 'normalized'
  private size: Size
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

  private zIndexHelper: ZIndexHelper = ZIndexHelper.useZIndexHelper()
  private PanelHelper: PanelHelper = PanelHelper.usePanelHelper()

  constructor (
    private el: HTMLElement | null,
    private readonly config: Config
  ) {
    const {
      id,
      size,
      position
    } = this.config
    this.zIndexHelper.update(id)
    this.PanelHelper.addPanel(this)
    this.PanelHelper.setTopPanel(this)
    this.size = {
      width: Number(size.width) < this.miniumSize.width ? this.miniumSize.width : Number(size.width),
      height: Number(size.height) < this.miniumSize.height ? this.miniumSize.height : Number(size.height)
    }
    this.tempSize.width = this.size.width
    this.tempSize.height = this.size.height
    this.setZindex()
    this.setSize(this.size)
    this.setPotition(position)
    this.setContainer()
  }

  private setZindex = (): void => {
    if (this.el === null) return
    const index = this.zIndexHelper.getIndex(this.config.id)
    this.el.style.zIndex = index + ''
  }

  private setSize (size: Size): void {
    if (this.el === null) return
    this.el.style.width = size.width + 'px'
    this.el.style.height = size.height + 'px'
  }

  private setPotition (position: Position): void {
    if (this.el === null) return
    const {
      top,
      left
    } = position
    this.el.style.top = `${top > 0 ? top : 0}px`
    this.el.style.left = `${left > 0 ? left : 0}px`
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
    this.el.style.opacity = '0.8'
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
    this.zIndexHelper.refreshZIndex(this.config.id)
    this.PanelHelper.setTopPanel(this)
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
    this.zIndexHelper.refreshZIndex(this.config.id)
    this.PanelHelper.setTopPanel(this)
    this.setZindex()
    if (e.ctrlKey) {
      this.el.style.cursor = 'move'
      this.setMoveState(e)
    }
  }

  public onHeaderDown = (e: MouseEvent): void => {
    this.PanelHelper.setTopPanel(this)
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

    this.setPotition({ top: newTop, left: newLeft })
    this.tempPos.top = newTop
    this.tempPos.left = newLeft
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
    this.tempPos.top = this.el.style.top.replace('px', '')
    this.tempPos.left = this.el.style.left.replace('px', '')
    this.setSize(this.tempSize)
  }

  public onMouseMove = (e: MouseEvent): void => {
    if (this.isDragging) {
      this.handleDragging(e)
    } else if (this.isResizing) {
      this.handleResizing(e)
    }
  }

  public onMouseUp = (): void => {
    if (this.el === null) return
    if (this.isResizing) {
      this.size.width = this.tempSize.width
      this.size.height = this.tempSize.height
    }
    this.isDragging = false
    this.isResizing = false
    this.el.style.cursor = 'initial'
    this.el.style.userSelect = 'unset'
    this.el.style.opacity = '1'
  }

  public normalize = async (): Promise<void> => {
    if (this.el === null) return
    await new Promise(resolve => {
      if (this.config.onBeforeNormalize !== null) {
        resolve(this.config.onBeforeNormalize(this))
      } else {
        resolve(true)
      }
    })
    this.status = 'normalized'
    this.zIndexHelper.refreshZIndex(this.config.id)
    this.setZindex()
    const {
      top,
      left
    } = this.tempPos
    this.el.style.top = top + 'px'
    this.el.style.left = left + 'px'
    this.setSize(this.size)
  }

  public minimize = async (): Promise<void> => {
    await new Promise(resolve => {
      if (this.config.onBeforeMinimize !== null) {
        resolve(this.config.onBeforeMinimize(this))
      } else {
        resolve(true)
      }
    })
    this.isDragging = false
    this.status = 'minimized'
  }

  public maximize = async (): Promise<void> => {
    if (this.el === null) return
    await new Promise(resolve => {
      if (this.config.onBeforeMaximize !== null) {
        resolve(this.config.onBeforeMaximize(this))
      } else {
        resolve(true)
      }
    })
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
    this.zIndexHelper.deleteFromMap(this.config.id)
    setTimeout(() => {
      this.el = null
      this.PanelHelper.closePanel(this)
    }, 0)
  }
}

export default Panel
