import config from './configuration'
import React from 'react'
import Logins from './Logins'
import Actions from './Actions'

// Represents the entire LoginManager application

export default class LoginManager extends React.Component {
  state = {
    logins: undefined /* [
      {
        username: 'chloe',
        password: 'hellagood'
      }, {
        username: 'max',
        password: 'areyoucereal'
      }
    ] */
  }

  componentWillMount() {
    let json
    const data = window.localStorage.getItem(config.storageKeys.data)

    try {
      json = data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Login Manager could not load data from window.localStorage.')
    }

    this.setState(() => ({
      logins: json
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const data = JSON.stringify(this.state.logins)

    if (JSON.stringify(prevState.logins) === data) return

    this._saveState(config.storageKeys.data, data)
  }

  render() {
    return (
      <div className="LoginManager">
        <Logins
          logins={this.state.logins}
          handleEditLogin={this.handleEditLogin}
          handleDelete={this.handleDeleteLogin}
        />
        <Actions
          createLogin={this.createLogin}
        />
      </div>
    )
  }

  createLogin = (username, password) => {
    const matchedLogin = this._findLogin({ username, password })

    if (matchedLogin) {
      return false
    }

    this.setState((prevState) => ({
      logins: prevState.logins.concat({ username, password })
    }))
    return true
  }

  handleDeleteLogin = (loginToDelete) => {
    this.setState((prevState) => ({
      logins: prevState.logins.filter((login) =>
        !(loginToDelete.username === login.username &&
          loginToDelete.password === login.password)
      )
    }))
  }

  handleEditLogin = (editedLogin) => {
    /// before calling this function, ensure that the editedLogin really is edited.
    // at this point the editedLogin shouldn't match any existing persisted Logins

    // although we're "editing," this object will completely replace the old one.
    const replacementLogin = {
      username: editedLogin.newUsername,
      password: editedLogin.newPassword
    }
    const matchedLogin = this._findLogin(replacementLogin)

    if (matchedLogin) {
      return false
    }

    this.setState((prevState) => ({
      logins: prevState.logins.map((login) => {
        if ((login.username === editedLogin.username)
          && login.password === editedLogin.password) {
            return replacementLogin
        } else {
          return login
        }
      })
    }))

    return true
  }

  _saveState(key, data) {
    window.localStorage.setItem(key, data)
  }

  _findLogin = (loginToFind) => {
    /// Find a persisted Login that matches the data in the given object
    /// Returns the object if one is found, or undefined otherwise.
    /// (Should never occur that there is more than one match, but return undefined and logs a warning if the impossible occurs.)

    const matchedLogins = this.state.logins.filter((existingLogin) => (
      existingLogin.username === loginToFind.username &&
      existingLogin.password === loginToFind.password
    ))

    if (matchedLogins.length > 1) {
      console.warn('There was an error identifying the Login that needs to be edited.')
    }

    return matchedLogins.length === 1 ? matchedLogins[0] : undefined
  }
}
