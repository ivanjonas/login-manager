import React from 'react'
import CreateLogin from './CreateLogin'
import DropTarget from './DropTarget'

export default class Actions extends React.Component {
  render() {
    return (
      <div className="Actions">
        <CreateLogin handleCreateLogin={this.props.handleCreateLogin} />
        {this.props.showDropTarget && <DropTarget />}
      </div>
    )
  }
}
