import React from 'react'

/// Represents a single set of account credentials sufficient to log in to the target application.

export default class Login extends React.Component {
  render() {
    return (
      <div
        className="Login"
        onMouseOver={(e) => {
          (e.target === e.currentTarget) && e.target.classList.add('Login--hovered')
        }}
        onMouseOut={(e) => { e.currentTarget.classList.remove('Login--hovered') }}
      >
        <span
          className="Login-username"
          title={this.props.login.password}
        >
          {this.props.login.username}
        </span>
        <div className="Login-buttons">
          <button
            className="FlatButton"
            onClick={(e) => { this.props.handleEdit(this.props.login) }}
            title="Edit"
          >
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button
            className="FlatButton FlatButton--red"
            onClick={(e) => { this.props.handleDelete(this.props.login) }}
            title="Delete"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}
