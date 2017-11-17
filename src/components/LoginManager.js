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

  _saveState(key, data) {
    window.localStorage.setItem(key, data)
  }

  componentWillMount() {
    let json
    const data = window.localStorage.getItem(config.storageKeys.data)

    if (!data) return

    try {
      json = JSON.parse(data)
    } catch (error) {
      console.error('Login Manager could not load data from window.localStorage.')
    }

    if (!json.logins) return

    this.setState(() => ({
      logins: json.logins
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const data = JSON.stringify(this.state)

    if (JSON.stringify(prevState) === data) return

    this._saveState(config.storageKeys.data, data)
  }

  render() {
    return (
      <div className="LoginManager">
        <Logins
          logins={this.state.logins}
          handleEditLogin={this.handleEditLogin} />
        <Actions
          createLogin={this.createLogin}
        />
      </div>
    )
  }

  createLogin = (username, password) => {
    this.setState((prevState) => ({
      logins: prevState.logins.concat({ username, password })
    }))
  }

  handleEditLogin = (editedLogin) => {
    const matchedLogins = this.state.logins.filter((existingLogin) => (
      existingLogin.username === editedLogin.oldUsername
      && existingLogin.password === editedLogin.oldPassword
    ))

    if (matchedLogins.length !== 1) {
      console.warn('There was an error identifying the Login that needs to be edited.')
      return false
    }
    
    delete editedLogin.oldUsername
    delete editedLogin.oldPassword

    this.setState((prevState) => ({
      logins: prevState.logins.map((login) =>
        login === matchedLogins[0] ? editedLogin : login
      )
    }))

    return true
  }
}
