import React from 'react'
import LoginManager from '../LoginManager'
import DropTarget from './DropTarget'
import config from '../configuration'

class Testbed extends React.Component {
  colors = ['red', 'orange', 'yellow', 'green', 'blue']

  generateColorDivs = function* () {
    for (let i = 0; i < this.colors.length; i++) {
      for (let j = 1; j < 10; j += 2) {
        {
          let cn = `color-${this.colors[i]}-${j}00`
          yield (<div key={cn} className={cn}></div>) // parentheses only to help VS Code
        }
      }
    }
  }

  render() {
    return <div className="Testbed">
      <div>
        <LoginManager />
      </div>
      <div>
        <form className="Testbed-form Testbed-form--One">
          <p className="Testbed-p">A sweet, sweet app. Holla!</p>
          <input className="Testbed-input" type="text" name="Testbed-formOneUsername" />
          <input className="Testbed-input" type="password" name="Testbed-formOnePassword" />
          <button className="Testbed-button" onClick={this.handleFakeLogin}>Log me in, dude</button>
        </form>
      </div>
      <div>
        <form className="Testbed-form Testbed-form--Two">
          <p className="Testbed-p">Serious app for serious businessman.</p>
          <input className="Testbed-input" type="text" name="Testbed-formTwoUsername" />
          <input className="Testbed-input" type="password" name="Testbed-formTwoPassword" />
          <button className="Testbed-button" onClick={this.handleFakeLogin}>I am a professional; log me in with all proper deference.</button>
        </form>
      </div>
      <div className="Testbed-swatches">
        {[...this.generateColorDivs()]}
      </div>
      <button onClick={this.handleNeverUsed}>Reset never-used</button>
    </div>
  }

  handleFakeLogin = (e) => {
    console.warn('Fake login button was clicked')

    e.preventDefault()
  }

  handleNeverUsed = (e) => {
    e.preventDefault()
    window.localStorage.removeItem(config.storageKeys.neverUsed)
    window.location = window.location
  }
}

export default Testbed
