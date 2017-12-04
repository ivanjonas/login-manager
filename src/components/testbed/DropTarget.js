import React from 'react'
import config from '../configuration'

class DropTarget extends React.Component {
  state = {
    isTargetingEnabled: false,
    targetContainer: undefined,
    dropZone: undefined
  }

  componentDidMount() {
    document.addEventListener('mouseover', this.handleMouseover)

    // because the following event handler is set to trigger during the capture phase and is attached to the document root, there is basically no way that any other event could occur before it.
    document.addEventListener('click', this.handleClickTarget, true)
    // TODO: add escape key to stop targeting
  }

  render() {
    return (
      <div className="DropTarget">
        <button
          className={config.classes.toggleButton}
          onClick={this.handleToggleTargeting}>{this.state.isTargetingEnabled ? "Disable" : "Enable"} drop target</button>
      </div>
    )
  }

  handleToggleTargeting = () => {
    var newIsTargetingEnabled = !this.state.isTargetingEnabled

    this.setState(() => ({
      isTargetingEnabled: newIsTargetingEnabled,
    }))

    if (!newIsTargetingEnabled) {
      this._unsetContainerElement()
    }
  }

  handleMouseover = (e) => {
    if (!this.state.isTargetingEnabled) {
      return
    }

    if (e.target.classList.contains(config.classes.dropZone)
      || e.target === this.state.targetContainer) {
      // This doesn't count as a change for our purposes.
      return
    }

    // e.fromElement doesn't always point to the last-highlighted element
    if (this._isElementEligibleForDropTarget(e)) {
      this._setContainerElement(e.toElement)
    }
  }

  handleClickTarget = (e) => {
    /// In the targeting state, buttons should not register clicks, except to cancel/complete the targeting.

    e.preventDefault()

    if (!this.state.isTargetingEnabled) {
      return
    }

    if (e.target.classList.contains(config.classes.toggleButton)) {
      return
    }

    if (e.target.classList.contains(config.classes.dropZone)
      || e.target.classList.contains(config.classes.isTargetContainer)) {
      // Mission accomplished. Inject the Login Manager and clean up.
      this._insertLoginManager()
      this.setState(() => ({
        isTargetingEnabled: false,
      }))
      this._unsetContainerElement()
    }

    e.stopImmediatePropagation()
  }

  _insertLoginManager = () => {
    /// Do a swap of the LoginManager into the current drop zone.
    const loginManager = document.getElementsByClassName('LoginManager')[0]
    const dropZone = this.state.dropZone

    if (!dropZone) {
      console.error('Tried injecting Login Manager, but could not find the Drop Zone.')
      return
    }
    if (!loginManager) {
      console.error('The Login Manager is missing!')
      return
    }

    dropZone.parentElement.insertBefore(loginManager, dropZone)
    dropZone.parentElement.removeChild(dropZone)
  }

  _isElementEligibleForDropTarget = (event) => {
    /// event: a mouseover event over the element in question

    if (['grid', 'inline-grid'].includes(window.getComputedStyle(event.target.parentElement).display)
      || event.target.classList.contains(config.classes.toggleButton)) {
      // avoid injecting elements inside grids. This can cause infinite feedback loops and maybe cause a seizure. Can't have that.
      return false
    }

    return !event.path.some(function (el) {
      return el.classList && el.classList.contains('LoginManager')
    })
  }

  _setContainerElement = (el) => {
    // remove the class from the previous element and add to the next element
    this.state.targetContainer && this.state.targetContainer.classList.remove(config.classes.isTargetContainer)
    el.classList.add(config.classes.isTargetContainer)

    const dropZone = this.state.dropZone || (() => {
      const bob = document.createElement("div")
      bob.classList.add(config.classes.dropZone)
      bob.textContent = "Drop Zone"
      return bob
    })()
    el.parentElement.insertBefore(dropZone, el)

    this.setState(() => ({
      targetContainer: el,
      dropZone: dropZone
    }))
  }

  _unsetContainerElement = () => {
    this.state.targetContainer && this.state.targetContainer.classList.remove(config.classes.isTargetContainer)
    this.state.dropZone && this.state.dropZone.parentElement.removeChild(this.state.dropZone)
    this.setState(() => ({
      targetContainer: undefined,
      dropZone: undefined
    }))
  }
}

export default DropTarget
