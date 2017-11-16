import React from 'react'
import Modal from 'react-modal'

export default class EditModal extends React.Component {
  render() {
    const props = this.props
    const title = `Login for ${props.editingLogin && props.editingLogin.username}`

    return !props.editingLogin ? null : <Modal
      isOpen={!!props.editingLogin}
      contentLabel={title}
      onRequestClose={props.handleClearSelection}
      closeTimeoutMS={250}
      className="Modal"
    >
      <h3 className="Modal-title">{title}</h3>
      <p className="Modal-body" >{props.editingLogin && props.editingLogin.username + ' - ' + props.editingLogin.password}</p>
      <button className='Button' onClick={props.handleCloseModal}>OK</button>
    </Modal>
  }
}
