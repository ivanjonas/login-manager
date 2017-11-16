import React from 'react'
import Login from './Login'

// Represents a collection of Login components

export default class Logins extends React.Component {
  render() {
    return (
      <div className="Logins">
        {
          this.props.logins.map((login) => (
            <Login
              key={login.username + login.password}
              login={login}
              handleEdit={this.props.handleEdit}
            />
          ))
        }
      </div>
    )
  }
}