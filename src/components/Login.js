import React from 'react'

/// Represents a single set of account credentials sufficient to log in to the target application.

export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <span
          title={this.props.login.password}
        >
          {this.props.login.username}
        </span>
        <button onClick={(e) => {this.props.handleEdit(this.props.login)}}>Edit</button>
      </div>
    )
  }
}