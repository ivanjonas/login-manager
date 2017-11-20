import React from 'react'
import CreateLoginButton from './CreateLoginModal'

export default class Actions extends React.Component {
  render() {
    return (
      <div className="Actions">
        <CreateLoginButton 
          createLogin={this.props.createLogin}
        />
      </div>
    )
  }
}