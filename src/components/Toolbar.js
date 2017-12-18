import React from 'react'
import DropTarget from './testbed/DropTarget'

export default class Toolbar extends React.Component {
  render() {
    return (
      <div
        className={"Toolbar " + (this.props.isUnderSpotlight ? "spotlight spotlight-text-top-right" : "")}
        data-spotlight-text="Click here to place the Login Manager into the page. Click multiple times to change the insertion mode."
      >
        <DropTarget handleFirstActivation={this.props.handleFirstActivation} />
      </div>
    )
  }
}
