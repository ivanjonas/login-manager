import React from 'react'
import Login from './Login'
import EditLoginModal from './EditLoginModal'

// Represents a collection of Login components

export default class Logins extends React.Component {
  state = {
    editingLogin: undefined,
    editLoginModalErrorMessage: undefined
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
          editLoginModalErrorMessage={this.state.editLoginModalErrorMessage}
        />
      </div>
    )
  }

  handleClearEditingLogin = () => {
    // close the modal
    this.setState(() => ({
      editingLogin: undefined,
      editLoginModalErrorMessage: undefined
    }))
    return false
  }

  handleBeginEdit = (login) => {
    /// A Login has requested an edit
    // save the old data so that the login can be found again

    this.setState(() => ({
      editingLogin: login
    }))

    return false
  }

  handleSubmitEdit = (e) => {
    /// call the parent's function to actually save the edit
    e.preventDefault()

    const newUsername = e.target.elements.newUsername.value.trim()
    const newPassword = e.target.elements.newPassword.value.trim()

    if (!newUsername || !newPassword) {
      this.setState(() => ({
        editLoginModalErrorMessage: 'Fields cannot be empty!'
      }))
      return false;
    }

    if ((newUsername === this.state.editingLogin.username)
      && newPassword === this.state.editingLogin.password) {
      // didn't change at all.
      this.setState(() => ({
        editLoginModalErrorMessage: 'The Login did not change at all!'
      }))
      return false
    }

    const newLogin = Object.assign(
      { newUsername, newPassword },
      this.state.editingLogin
    )

    const success = this.props.handleEditLogin(newLogin)

    if (success) {
      this.setState(() => ({
        editingLogin: undefined,
        editLoginModalErrorMessage: undefined
      }))
    } else {
      // show an error message to the user
      this.setState(() => ({
        editLoginModalErrorMessage: 'The Login above already exists.'
      }))
    }

    return false
  }
}
