import React from 'react'
import Login from './Login'
import EditLoginModal from './EditLoginModal'

// Represents a collection of Login components

export default class Logins extends React.Component {
  state = {
    editingLogin: undefined
  }

  render() {
    return (
      <div className="Logins">
        {
          this.props.logins && this.props.logins.map((login) => (
            <Login
              key={login.username + login.password}
              login={login}
              handleEdit={this.handleBeginEdit}
              handleDelete={this.props.handleDelete}
            />
          ))
        }
        <EditLoginModal
          editingLogin={this.state.editingLogin}
          handleSubmitEdit={this.handleSubmitEdit}
          handleCloseModal={this.handleClearEditingLogin}
        />
      </div>
    )
  }

  handleClearEditingLogin = () => {
    // close the modal
    this.setState(() => ({
      editingLogin: undefined
    }))
    return false
  }

  handleBeginEdit = (login) => {
    /// A Login has requested an edit
    // save the old data so that the login can be found again

    this.setState(() => ({
      editingLogin: Object.assign({}, login, {
        oldUsername: login.username,
        oldPassword: login.password
      })
    }))

    return false
  }

  handleSubmitEdit = (e) => {
    /// call the parent's function to actually save the edit
    e.preventDefault()

    const username = e.target.elements.username.value.trim()
    const password = e.target.elements.password.value.trim()

    const newLogin = Object.assign(
      {},
      this.state.editingLogin,
      { username, password }
    )

    this.props.handleEditLogin(newLogin)
    this.setState(() => ({
      editingLogin: undefined
    }))

    return false
  }
}
