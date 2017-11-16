import React from 'react'
import CreateLoginModal from './CreateLoginModal'

export default class Actions extends React.Component {
  state = {
    isCreateLoginModalOpen: false
  }

  handleCreateLogin = (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value.trim()
    const password = e.target.elements.password.value.trim()
    this.props.createLogin(username, password)
    return false
  }

  render() {
    return (
      <div className="Actions">
        <button onClick={(e) => {
          this.setState(() => ({ isCreateLoginModalOpen: true }))
        }}>Create New Login</button>
        <CreateLoginModal 
          handleCreateLogin={this.handleCreateLogin}
          isOpen={this.state.isCreateLoginModalOpen}
        />
      </div>
    )
  }
}