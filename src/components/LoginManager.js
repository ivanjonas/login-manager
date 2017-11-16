import config from './configuration'
import React from 'react'
import Logins from './Logins'
import Actions from './Actions'
import EditModal from './EditModal'

// Represents the entire LoginManager application

export default class LoginManager extends React.Component {
  state = {
    editingLogin: undefined,
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
    console.info('saving data...')
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
          handleEdit={this.handleEdit} />
        <Actions
          createLogin={this.createLogin}
        />
        <EditModal
          editingLogin={this.state.editingLogin}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    )
  }

  createLogin = (username, password) => {
    console.log("we're saving a new Login!")
    this.setState((prevState) => ({
      logins: prevState.logins.concat({username, password})
    }))
  }

  handleEdit = (login) => {
    // edit the logins in state
    this.setState(() => ({
      editingLogin: login
    }))
    return false
  }

  handleCloseModal = () => {
    // close the modal
    this.setState(() => ({
      editingLogin: undefined
    }))
    return false
  }
}
