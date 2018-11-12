import React from 'react'

import './SmartScroll.css'

/* eslint no-console: 0 */

export default class SmartScroll extends React.Component {
  state = {
    dragging: false,
    elements: []
  }

  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.viewPortRef = React.createRef()
    this.contentRef = React.createRef()
    this.currentRef = React.createRef()
    this.ticking = false

    //
    this.contentPosition = 0
  }

  render() {
    const { children, style } = this.props 
    const { dragging, elements } = this.state
    return (
      <div className="react-scrollbar-container" style={style} ref={this.containerRef}>
        <div className="react-scrollbar-viewport" ref={this.viewPortRef}>
          <div className="react-scrollbar-content" ref={this.contentRef}>
            {children}
          </div>
        </div>
        <div className="react-scrollbar-scroll">
          {elements.map(e => (
            <div
              role="button"
              tabIndex={0}
              className="react-scrollbar-element-tick"
              style={{ top: e.offset * this.ratio }}
              onClick={() => this.onElementClick(e)}
            />
          ))}
          <div
            role="button"
            tabIndex={-1}
            className={`react-scrollbar-current-visible ${dragging ? '.dragging' : ''}`}
            ref={this.currentRef}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          />
        </div>
      </div>  
    )
  }

  onElementClick = element => {
    this.setPosition(() => element.offset)
  }

  getWheelEvent = viewPort => (
    viewPort.onwheel ? 'wheel' // Modern browsers support "wheel"
      : document.onmousewheel !== undefined ? 'mousewheel' // Webkit and IE support at least "mousewheel"
        : 'DOMMouseScroll' // let's assume that remaining browsers are older Firefox
  )

  componentDidMount = () => {
    const viewPort = this.viewPortRef.current
    const content = this.contentRef.current
    
    this.ratio = viewPort.clientHeight / content.scrollHeight
    console.log('ratio', this.ratio)

    viewPort.addEventListener(this.getWheelEvent(viewPort), this.onWheel, false)

    // finds interesting DOM elements
    const { children } = this.props
    const elements = this.collectElements(children)
    console.log('children are', elements)
    this.setState({
      elements: Array.from(content.querySelectorAll('.react-scrollbar-element')).map(e => ({
        offset: e.offsetTop,
        height: e.clientHeight
      }))
    })
  }

  // todo: avoid concat (memory issues ?)
  collectElements = children => children.reduce((acc, c) => {
    if (Array.isArray(c)) {
      return acc.concat(this.collectElements(c))
    }
    if (c.type && c.type.name === 'SmartScrollElement') {
      return acc.concat(c)
    }
    // TODO: go deep on components
    return acc
  }, [])

  componentWillUnmount = () => {
    const viewPort = this.viewPortRef.current
    viewPort.removeEventListener(this.getWheelEvent(viewPort), this.onWheel)
  }

  onWheel = event => {
    const { wheelSpeed = 40 } = this.props

    const wheelSpeedDelta = -(event.deltaY || event.detail || (-1 / 3 * event.wheelDelta)) / 40
    this.setPosition(p => p - wheelSpeedDelta * wheelSpeed)

    event.preventDefault()
    event.stopPropagation()
  }

  setPosition = mutator => {
    const { current: content } = this.contentRef
    const { current: viewPort } = this.viewPortRef

    const maxPosition = content.clientHeight - viewPort.clientHeight
    const newValue = mutator(this.contentPosition)
    this.contentPosition = Math.min(Math.max(0, newValue), maxPosition)

    this.updatePositions()
  }

  updatePositions = () => {
    const { current: content } = this.contentRef
    const { current } = this.currentRef
    const { current: viewPort } = this.viewPortRef

    content.style.top = `${-Math.round(this.contentPosition)}px`
    current.style.top = `${Math.round(Math.min(this.contentPosition * this.ratio), viewPort.clientHeight - current.clientHeight)}px`
  }

  onMouseDown = event => {
    console.log('onMouseDown', event)
    this.setState({ dragging: true, position: event.clientY })
    window.addEventListener('mousemove', this.onMouseDragging)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseDragging = event => {
    const { position } = this.state

    // console.log('mm', event.clientY)
    const delta = position - event.clientY
    console.log('delta', delta, '%', delta / this.ratio)
    this.setPosition(current => current - delta / this.ratio)
    this.setState({ position: event.clientY })
  }

  onMouseUp = () => {
    const { dragging } = this.state
    if (dragging) {
      this.setState({ dragging: false })
      window.removeEventListener('mousemove', this.onMouseDragging)
      window.removeEventListener('mouseup', this.onMouseUp)
    }
  }

}