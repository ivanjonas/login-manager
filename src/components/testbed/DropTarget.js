import React from 'react'
import config from '../configuration'

class DropTarget extends React.Component {
  state = {
    targetingState: config.TARGETING_STATE.off,
    targetElement: undefined,
    dropZone: undefined
  }

  componentDidMount() {
    document.addEventListener('mouseover', this.handleMouseover)

    // because the following event handler is set to trigger during the capture phase and is attached to the document root, there is basically no way that any other event could occur before it.
    document.addEventListener('click', this.handleClickTarget, true)
    // TODO: add key handler to confirm/stop targeting
  }

  render() {
    // this needs some serious UI work

    let buttonLabel
    switch (this.state.targetingState) {
      case (config.TARGETING_STATE.off):
        buttonLabel = 'Insert before a chosen element'
        break
      case (config.TARGETING_STATE.before):
        buttonLabel = 'Insert after a chosen element'
        break
      default:
        buttonLabel = 'Cancel'
    }

    return (
      <div className="DropTarget">
        <button
          className={config.classes.toggleButton}
          onClick={this.handleToggleTargeting}>{buttonLabel}</button>
      </div>
    )
  }

  _generateNextTargetingState = (currentState) => {
    switch (currentState) {
      case config.TARGETING_STATE.off:
        return config.TARGETING_STATE.before
      case config.TARGETING_STATE.before:
        return config.TARGETING_STATE.after
      default:
        return config.TARGETING_STATE.off
    }
  }

  handleToggleTargeting = () => {
    var newTargetingState = this._generateNextTargetingState(this.state.targetingState)

    this.setState(() => ({
      targetingState: newTargetingState,
    }))

    if (newTargetingState === config.TARGETING_STATE.off) {
      this._unsetContainerElement()
    }
  }

  handleMouseover = (e) => {
    if (this.state.targetingState === config.TARGETING_STATE.off) {
      return
    }

    if (e.target.classList.contains(config.classes.dropZone)
      || e.target === this.state.targetElement) {
      // This doesn't count as a change for our purposes.
      return
    }

    // e.fromElement doesn't always point to the last-highlighted element
    if (this._isElementEligibleForDropTarget(e)) {
      this._setContainerElement(e.target)
    }
  }

  handleClickTarget = (e) => {
    /// In the targeting state, buttons should not register clicks, except to cancel/complete the targeting.

    e.preventDefault()

    if (this.state.targetingState === config.TARGETING_STATE.off) {
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
        targetingState: config.TARGETING_STATE.off,
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

    return !event.target.closest('.LoginManager')
  }

  _setContainerElement = (el) => {
    // remove the class from the previous element and add to the next element
    this.state.targetElement && this.state.targetElement.classList.remove(config.classes.isTargetContainer)
    el.classList.add(config.classes.isTargetContainer)

    const beforeElement = this.state.targetingState === config.TARGETING_STATE.before ? el : el.nextElementSibling
    const dropZone = this.state.dropZone || (() => {
      const bob = document.createElement("div")
      bob.classList.add(config.classes.dropZone)
      bob.textContent = "Drop Zone"
      return bob
    })()
    el.parentElement.insertBefore(dropZone, beforeElement)

    this.setState(() => ({
      targetElement: el,
      dropZone: dropZone
    }))
  }

  _unsetContainerElement = () => {
    const dropZone = this.state.dropZone
    this.state.targetElement && this.state.targetElement.classList.remove(config.classes.isTargetContainer)
    dropZone && dropZone.parentElement && dropZone.parentElement.removeChild(dropZone)
    this.setState(() => ({
      targetElement: undefined,
      dropZone: undefined
    }))
  }
}

export default DropTarget
