import React from 'react'
import Modal from 'react-modal'

export default class CreateLogin extends React.Component {
  state = {
    isCreateLoginModalOpen: false,
    createLoginModalErrorMessage: undefined
  }

  render() {
    return (
      <div>
        <button
          className="CreateLogin Button Button--green"
          title="Add a Login"
          onClick={this.handleOpenModal}
        >
          Add a Login
        </button>
        <Modal
          isOpen={this.state.isCreateLoginModalOpen}
          contentLabel="Modal to Create a New Login"
          handleCloseModal={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          className="CreateLoginModal"
        >
          <form onSubmit={this.handleCreateLogin}>
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="password" placeholder="password" />
            <input type="submit" value="Create" />
            {this.state.createLoginModalErrorMessage && <p>{this.state.createLoginModalErrorMessage}</p>}
          </form>
        </Modal>
      </div>
    )
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
