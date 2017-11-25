import React from 'react'
import Modal from 'react-modal'

const EditLoginModal = (props) => {
  const title = `Edit login for ${props.editingLogin && props.editingLogin.username}`

  return !props.editingLogin ? null : (
    <Modal
      isOpen={!!props.editingLogin}
      contentLabel={title}
      onAfterOpen={() => {
        document.querySelector('.js-editLoginModal input[name=newUsername]').select(true)
      }}
      onRequestClose={props.handleCloseModal}
      closeTimeoutMS={250}
      className="js-editLoginModal"
    >
      <form onSubmit={props.handleSubmitEdit}>
        <input className="Modal-input Modal-input--large js-focus" type="text" name="newUsername" defaultValue={props.editingLogin.username}/>
        <input className="Modal-input Modal-input--large" type="password" name="newPassword" defaultValue={props.editingLogin.password}/>
        <button className="Modal-button Button Button--green Button--large" style={{margin: '.5em 0'}}>Confirm</button>
      </form>

      <button className='Modal-button Button Button--large' onClick={props.handleCloseModal}>Cancel</button>

      {props.editLoginModalErrorMessage && <p className="Feedback Feedback--friendlyWarning">{props.editLoginModalErrorMessage}</p>}
    </Modal>
  )
}

export default EditLoginModal
