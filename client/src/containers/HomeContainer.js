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
      <section className="l-section l-section--simple home">
        <div className="m-fx-en-c">
          <div className="home__content m-pd-xt-h">
              <h1 className="title-4 m-fs-xs m-mg-md-b">
                Blockchain sandbox
              </h1>
              <div className="Wallet m-mg-md-b m-primary">
                <div className="m-wt-700 m-info m-rd-xt-t m-pd-ty">Your crypto-wallet</div>
                <div>Address:</div>
                <div>{address}</div>
                <div>Balance: {balance}</div>
              </div>
          </div>
        
        </div>
      </section>
    )
  }
}

export default HomeContainer
