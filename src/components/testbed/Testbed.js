import React from 'react'
import LoginManager from '../LoginManager'
import DropTarget from './DropTarget'

const Testbed = (props) => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue']
  return (
    <div className="Testbed">
      <LoginManager />
      <div>
        <form className="Testbed-form Testbed-form--One">
          <p>A sweet, sweet app. Holla!</p>
          <input type="password" name="Testbed-formOnePassword" />
          <button onClick={handleFakeLogin}>Log me in, dude</button>
        </form>
      </div>
      <div>
        <form className="Testbed-form Testbed-form--Two">
          <p>Serious app for serious businessman.</p>
          <input type="text" name="Testbed-formOneUsername" />
          <input type="password" name="Testbed-formOnePassword" />
          <button onClick={handleFakeLogin}>I am a professional; log me in with all proper deference.</button>
        </form>
      </div>
      <div>
        <DropTarget />
      </div>
      <div className="Testbed-swatches">
        {colors.forEach(function (color) {
          for (let index = 1; index < 10; index += 2) {
            <div className="{`color-${color}-${index}`}"></div>
          }
        })}
      </div>
    </div>
  )
}

const handleFakeLogin = (e) => {
  console.warn('Fake login button was clicked')

  e.preventDefault()
}

export default Testbed
