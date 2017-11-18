import React from 'react'
import CreateLoginModal from './CreateLoginModal'

export default class Actions extends React.Component {
  state = {
    isCreateLoginModalOpen: false,
    createLoginModalErrorMessage: undefined
  }

  handleCreateLogin = (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value.trim()
    const password = e.target.elements.password.value.trim()
    const success = this.props.createLogin(username, password)

    if (success) {
      this.setState(() => ({
        isCreateLoginModalOpen: false,
        createLoginModalErrorMessage: undefined
      }))
    } else {
      // show an error message to the user
      this.setState(() => ({
        createLoginModalErrorMessage: 'The Login you are trying to create already exists.'
      }))
    }

    return false
  }

  render() {
    return (
      <div className="Actions">
        <button
          className="Actions-add Button Button--green"
          title="Add a Login"
          onClick={(e) => {
            this.setState(() => ({ isCreateLoginModalOpen: true }))
          }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i> Add a Login
        </button>
        <CreateLoginModal 
          handleCreateLogin={this.handleCreateLogin}
          isOpen={this.state.isCreateLoginModalOpen}
          createLoginModalErrorMessage={this.state.createLoginModalErrorMessage}
        />
      </div>
    )
  }
}