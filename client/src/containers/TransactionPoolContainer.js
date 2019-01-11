import React, { Component } from 'react'
import Transaction from './Transaction'
import { getFetchObservable } from '../util/asyncFunctions'
import { timer } from 'rxjs';

const POLL_INTERVAL_MS = 10000;

class TransactionPoolContainer extends Component {
  state = {
    transactionPoolMap: {}
  }

  fetchTransactionPoolMap = () => {

    const fetchData$ = getFetchObservable(
        '/api/transaction-pool-map'); 

    fetchData$.subscribe((fetchRes) => { 
      this.setState({transactionPoolMap: fetchRes})
    })
  }

  fetchMineTransactions = () => {
    const fetchData$ = getFetchObservable(
        '/api/mine-transactions'); 
      
    fetchData$.subscribe((fetchRes) => { 
      this.props.history.push({
        pathname: '/blocks'
      });
    })

  }

  componentDidMount() {
    //Request polling 
    this.poolTimerSubscription = timer(0, POLL_INTERVAL_MS).subscribe( _ => this.fetchTransactionPoolMap());
  }

  componentWillUnmount() {
    this.poolTimerSubscription.unsubscribe();
  }

  render() {
    return (
      <div className='TransactionPool'>
        {
          Object.values(this.state.transactionPoolMap).map(transaction => {
            return (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            )
          })
        }
        <hr />
        <button className="m-alert" onClick={this.fetchMineTransactions}>Mine the transactions</button>
      </div>
    )
  }
}

export default TransactionPoolContainer

