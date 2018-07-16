import React from 'react'

import './SmartScroll.css'

/* eslint no-console: 0 */

export default class SmartScroll extends React.Component {
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
    return (
      <div className="react-scrollbar-container" style={style} ref={this.containerRef}>
        <div className="react-scrollbar-viewport" ref={this.viewPortRef}>
          <div className="react-scrollbar-content" ref={this.contentRef}>
            {children}
          </div>
        </div>
        <div className="react-scrollbar-scroll">
          <div className="react-scrollbar-current-visible" ref={this.currentRef} />
        </div>
      </div>  
    )
  }

  componentDidMount = () => {
    const viewPort = this.viewPortRef.current
    const content = this.contentRef.current

    this.ratio = viewPort.clientHeight / content.scrollHeight

    const wheelEvent = viewPort.onwheel ? 'wheel' // Modern browsers support "wheel"
      : document.onmousewheel !== undefined ? 'mousewheel' // Webkit and IE support at least "mousewheel"
        : 'DOMMouseScroll' // let's assume that remaining browsers are older Firefox

    viewPort.addEventListener(wheelEvent, this.onWheel, false)
  }

  onWheel = event => {
    const { wheelSpeed = 40 } = this.props
    const { current: content } = this.contentRef
    const { current } = this.currentRef

    const wheelSpeedDelta = -(event.deltaY || event.detail || (-1 / 3 * event.wheelDelta)) / 40
    
    // console.log('onWheel', event, 'wheelSpeedDelta', wheelSpeedDelta)
    this.contentPosition -= wheelSpeedDelta * wheelSpeed

    // TODO: Math.min/max make sure we don't go out of bound
    content.style.top = `${-Math.round(this.contentPosition)}px`

    current.style.top = `${Math.round(this.contentPosition * this.ratio)}px`

    event.preventDefault()
    event.stopPropagation()
  }

}