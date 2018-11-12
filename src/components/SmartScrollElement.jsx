import React from 'react'

// just a wrapper, renders directly the children.
// useful to mark which objects you want to have a preview on the scroll
// and to set some domain context later used to render the preview, or whatever
class SmartScrollElement extends React.Component {
  ref = React.createRef()

  render() {
    const { children } = this.props
    return (
      <div className="react-scrollbar-element" ref={this.ref}>
        {children}
      </div>
    )
  }
}

export default SmartScrollElement