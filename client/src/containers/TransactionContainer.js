import React, { Component } from 'react'
import { getFetchObservable } from '../util/asyncFunctions'

class TransactionContainer extends Component {
  state = { recipient: '', amount: 0, knownAddresses: [] }

  componentDidMount() {
    const fetchData$ = getFetchObservable(
      '/api/known-addresses'); 

    fetchData$.subscribe((fetchRes) => { 
      this.setState({ knownAddresses: fetchRes });
    });
  }

  handleChangeRecipient = event => {
    this.setState({ recipient: event.target.value });
  }

  handleChangeAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  }

  PerformTransaction = (event) => {
    event.preventDefault();
    
    const { recipient, amount } = this.state;

    const fetchData$ = getFetchObservable(
        '/api/transact', 
        {
          recipient,
          amount
        },
         'POST'); 

    fetchData$.subscribe((fetchRes) => { 
      // alert(fetchRes.message || fetchRes.type)
      this.props.history.push({
        pathname: '/transaction-pool'
      });
    });
  }


  render() {
    return (
      <section className='l-section l-section--simple m-mg-xt'>
        <div className="known-adresses m-pd-xt m-fs-ty">
          <div className="m-mg-xt-b m-secondary">Known addresses to be copy/paste</div>
          {
          this.state.knownAddresses.map(knownAddress => {
            return (
              <div key={knownAddress}>
                <div>{knownAddress}</div>
                <br />
              </div>
            )
          })
          }
        </div>
        
        <form className="transact-form m-mg-xt" onSubmit={this.performTransaction}>
          <div className="control m-mg-xt-b">
            <input type="text" 
              placeholder="recipient" 
              value={this.state.recipient} 
              onChange={this.handleChangeRecipient}
              className="control__input m-rd-xx m-tx-grey-dark-1" />
          </div>
          <div className="control">
              <input type="number" 
              value={this.state.amount} 
              onChange={this.handleChangeAmount}
              className="control__input m-rd-xx m-tx-grey-dark-1" />
          </div>
          <button className="m-alert m-pd-xt m-rd-xx m-mg-xt-t">
            Send
          </button>
        </form>
      </section>
    )
  }
}

export default TransactionContainer
