import React, { Component } from 'react'
import {mergeMap, tap, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, of, from, fromEvent, pipe } from 'rxjs';
import { getFetchObservable } from '../util/asyncFunctions'
import BlocksContainer from './BlocksContainer'

class HomeContainer extends Component {
  state = {
    walletInfo: {}
  }

  componentDidMount() {
    const fetchData$ = getFetchObservable('/api/wallet-info'); 
    fetchData$.subscribe((fetchRes) => { 
      this.setState({ walletInfo: fetchRes});
    });

  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div>
        <h1 className="m-tx-c m-mg-md-b">
           Welcome to the blockchain
        </h1>
        <div className="Wallet m-mg-md-b m-tx-c">
           <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </div>
      </div>
    )
  }
}

export default HomeContainer
