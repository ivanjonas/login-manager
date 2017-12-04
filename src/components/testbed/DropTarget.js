import React from 'react'

class DropTarget extends React.Component {
  classes = {
    isTarget: 'is-target',
    dropZone: 'DropTarget-dropZone',
    toggleButton: 'DropTarget-toggleButton'
  }

  state = {
    isTargetingEnabled: false,
    target: undefined
  }

  componentDidMount() {
    document.addEventListener('mouseover', this.handleMouseover)

    // because the following event handler is set to trigger during the capture phase and is attached to the document root, there is basically no way that any other event could occur before it.
    document.getElementById("app").addEventListener('click', this.handleSelectTarget, true)
  }

  render() {
    return (
      <div className="DropTarget">
        <button
          className={this.classes.toggleButton}
          onClick={this.handleToggleTargeting}>{this.state.isTargetingEnabled ? "Disable" : "Enable"} drop target</button>
      </div>
    )
  }

  handleToggleTargeting = () => {
    var newState = !this.state.isTargetingEnabled

    this.setState((prevState) => ({
      isTargetingEnabled: newState
    }))

    this._removeTargetElement()
  }

  handleMouseover = (e) => {
    if (!this.state.isTargetingEnabled) {
      return
    }

    if (e.target.classList.contains(this.classes.dropZone)) {
      // This doesn't count as a change for our purposes.
      return
    }

    this._removeTargetElement()
    // e.fromElement doesn't always point to the last-highlighted element
    if (this._isElementEligibleForDropTarget(e)) {
      this._setTargetElement(e.toElement)
    }
  }

  handleSelectTarget = (e) => {
    e.preventDefault()

    if (!this.state.isTargetingEnabled) {
      return
    }

    if (e.target.classList.contains(this.classes.toggleButton)) {
      // immediately stop propagation, unless we are trying to toggle the targeting functionality
      return
    }

    e.stopImmediatePropagation()
  }

  _isElementEligibleForDropTarget = (event) => {
    /// event: a mouseover event over the element in question

    if (event.target.classList.contains(this.classes.toggleButton)) {
      return false
    }

    return !event.path.some(function(el) {
      return el.classList && el.classList.contains('LoginManager')
    })
  }

  _setTargetElement(el) {
    el.classList.add(this.classes.isTarget)
    this.setState(() => ({
      target: el
    }))
    // el.insertAdjacentHTML('afterBegin', `<div class="${this.classes.dropZone}">Drop Zone</div>`)
  }

  _removeTargetElement() {
    this.state.target && this.state.target.classList.remove(this.classes.isTarget)
  }
}

export default DropTarget
