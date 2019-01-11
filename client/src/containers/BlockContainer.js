import React, { Component } from 'react'
import Block from '../components/Block'

class BlockContainer extends Component {
  state = {
     displayTransaction: false
  }

  handleToggleTransaction = () => {
    this.setState({ displayTransaction: !this.state.displayTransaction})
  }
     
  render() {

    return (
      <Block
        block={this.props.block}
        displayTransaction={this.state.displayTransaction}
        click={this.handleToggleTransaction}
      />
    )
  }
}

export default BlockContainer
