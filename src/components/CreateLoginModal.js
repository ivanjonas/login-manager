import React from 'react'
import Modal from 'react-modal'

export default class CreateLoginModal extends React.Component {
  render() {
    return (
      <Modal 
        isOpen={this.props.isOpen}
        contentLabel="Modal to Create a New Login"
        className="CreateLoginModal"
      >
        <form onSubmit={this.props.handleCreateLogin}>
          <input type="text" name="username" placeholder="username"/>
          <input type="text" name="password" placeholder="password"/>
          <input type="submit" value="Create"/>
          {this.props.editLoginModalErrorMessage && <p>{this.props.editLoginModalErrorMessage}</p>}
        </form>
      </Modal>
    )
  }
}