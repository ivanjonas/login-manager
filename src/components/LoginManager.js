import React from 'react'
import Logins from './Logins'
import Actions from './Actions'
import EditModal from './EditModal'

// Represents the entire LoginManager application

export default class LoginManager extends React.Component {
  state = {
    editingLogin: undefined,
    logins: [
      {
        username: 'chloe',
        password: 'hellagood'
      }, {
        username: 'max',
        password: 'areyoucereal'
      }
    ]
  }

  render() {
    return (
      <div className="LoginManager">
        <Logins 
          logins={this.state.logins} 
          handleEdit={this.handleEdit} />
        <Actions />
        <EditModal 
          editingLogin={this.state.editingLogin}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    )
  }

  handleEdit = (login) => {
    // edit the logins in state
    this.setState(() => ({
      editingLogin: login
    }))
    return false
  }

  handleCloseModal = () => {
    // close the modal
    this.setState(() => ({
      editingLogin: undefined
    }))
    return false
  }
}
