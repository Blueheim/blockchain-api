import React, { Component } from 'react'
import { getFetchObservable } from '../util/asyncFunctions'
import BlockContainer from './BlockContainer'

class BlocksContainer extends Component {
  state = { 
    blocks: [],
    paginatedId: 1,
    blocksLength: 0
  }

  componentDidMount() {
    this.fetchBlocksLength() ;
    this.fetchPaginatedBlocks(this.state.paginatedId)
  }

  fetchBlocksLength = () => {
    const fetchData$ = getFetchObservable(`/api/blocks/length`); 

    fetchData$.subscribe((fetchRes) => { 
      this.setState({ blocksLength: fetchRes });
    });
  }

  fetchPaginatedBlocks = (paginatedId) => {
    const fetchData$ = getFetchObservable(`/api/blocks/${paginatedId}`); 

    fetchData$.subscribe((fetchRes) => { 
      this.setState({ blocks: fetchRes });
    });
  }

  render() {
    return (
      <section className="l-section l-section--simple">
         <h3>Blocks</h3>
        <div className="block-pagination">
        <div>
          {
            [...Array(Math.ceil(this.state.blocksLength / 5)).keys()].map(key => {
              const paginatedId = key + 1;
              return (
                <span key={key} onClick={() => this.fetchPaginatedBlocks(paginatedId)}>
                  <button className="m-alert m-pd-xt">{paginatedId}</button>{' '}
                </span>
              )
            })
          }
        </div>
        </div>
        <div className="block-list">
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

      </section>
    )
  }
}

export default BlocksContainer
