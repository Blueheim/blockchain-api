import React, { Component } from 'react'
import { getFetchObservable } from '../util/asyncFunctions'
import BlockContainer from './BlockContainer'

class BlocksContainer extends Component {
  state = { 
    blocks: []
  }

  componentDidMount() {
    const fetchData$ = getFetchObservable('/api/blocks'); 
    fetchData$.subscribe((fetchRes) => { 
      this.setState({ blocks: fetchRes });
    });
  }

  render() {
    return (
      <div className="m-fx-cl-c-c">
        <h3>Blocks</h3>
        {
          this.state.blocks.map(block => {
            return (
              <BlockContainer 
                key={block.hash} 
                block={block} />
            )
          })
        }
      </div>
    )
  }
}

export default BlocksContainer
