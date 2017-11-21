import React from 'react'
import CreateLogin from './CreateLogin'

export default class Actions extends React.Component {
  render() {
    return (
      <div className="Actions">
        <CreateLogin createLogin={this.props.createLogin}/>
      </div>
    )
  }
}
