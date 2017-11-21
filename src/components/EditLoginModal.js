import React from 'react'
import Modal from 'react-modal'

const EditLoginModal = (props) => {
  const title = `Edit login for ${props.editingLogin && props.editingLogin.username}`

  return !props.editingLogin ? null : (
    <Modal
      isOpen={!!props.editingLogin}
      contentLabel={title}
      onRequestClose={props.handleCloseModal}
      closeTimeoutMS={250}
      className="EditLoginModal"
    >
      <form onSubmit={props.handleSubmitEdit}>
        <input className="Modal-input Modal-input--large" type="text" name="newUsername" defaultValue={props.editingLogin.username}/>
        <input className="Modal-input Modal-input--large" type="password" name="newPassword" defaultValue={props.editingLogin.password}/>
        <button className="Modal-button Button Button--green Button--large" style={{margin: '.5em 0'}}>Confirm</button>
      </form>

      <button className='Modal-button Button Button--large' onClick={props.handleCloseModal}>Cancel</button>

      {props.editLoginModalErrorMessage && <p>{props.editLoginModalErrorMessage}</p>}
    </Modal>
  )
}

export default EditLoginModal
