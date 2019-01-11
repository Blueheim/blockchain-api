import React, { Component } from 'react'
import { getFetchObservable } from '../util/asyncFunctions'

class ConductTransaction extends Component {
  state = { recipient: '', amount: 0 }

  handleChangeRecipient = event => {
    this.setState({ recipient: event.target.value });
  }

  handleChangeAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  }

  conductTransaction = (event) => {
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
      <div className='ConductTransaction m-mg-md'>
        <form onSubmit={this.conductTransaction}>
          <div className="control m-mg-xt-b">
            <input type="text" 
              placeholder="recipient" 
              value={this.state.recipient} 
              onChange={this.handleChangeRecipient}
              className="control__input m-tx-grey-dark-1" />
          </div>
          <div className="control">
              <input type="number" 
              value={this.state.amount} 
              onChange={this.handleChangeAmount}
              className="control__input m-tx-grey-dark-1" />
          </div>
          <button className="m-alert m-pd-xt">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default ConductTransaction
