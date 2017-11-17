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
      <h3 className="Modal-title">{title}</h3>
      <form onSubmit={props.handleSubmitEdit}>
        <input type="text" name="newUsername" defaultValue={props.editingLogin.username}/>
        <input type="password" name="newPassword" defaultValue={props.editingLogin.password}/>
        <input type="submit" value="Confirm"/>
        {props.editLoginModalErrorMessage && <p>{props.editLoginModalErrorMessage}</p>}
      </form>

      <button className='Button' onClick={props.handleCloseModal}>Cancel</button>
    </Modal>
  )
}

export default EditLoginModal
