import React from 'react'
import Modal from 'react-modal'

export default class CreateLogin extends React.Component {
  state = {
    isCreateLoginModalOpen: false,
    createLoginModalErrorMessage: undefined
  }

  render() {
    return (
      <button
        className="CreateLogin Button Button--green"
        title="Add a Login"
        onClick={this.handleOpenModal}
      >
        Add a Login
          <Modal
          isOpen={this.state.isCreateLoginModalOpen}
          contentLabel="Modal to Create a New Login"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          className="CreateLoginModal"
        >
          <form onSubmit={this.handleCreateLogin}>
            <input className="Modal-input Modal-input--large" type="text" name="username" />
            <input className="Modal-input Modal-input--large" type="text" name="password" />
            <input className="Modal-button Button Button--green Button--large" type="submit" value="Create" />
            {this.state.createLoginModalErrorMessage && <p className="Feedback Feedback--info">{this.state.createLoginModalErrorMessage}</p>}
          </form>
        </Modal>
      </button>
    )
  }

  handleCreateLogin = (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value.trim()
    const password = e.target.elements.password.value.trim()

    if (!username || !password) {
      this.setState(() => ({
        createLoginModalErrorMessage: 'Fields cannot be empty!'
      }))
      return false
    }


    const success = this.props.handleCreateLogin(username, password)

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

  handleOpenModal = () => {
    this.setState(() => ({
      isCreateLoginModalOpen: true
    }))
  }

  handleCloseModal = () => {
    this.setState(() => ({
      isCreateLoginModalOpen: false
    }))
  }
}
