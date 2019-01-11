import React from 'react'
import Transaction from './Transaction'

const Block = (props) => {

    const { timestamp, hash, data } = props.block;
    const timestampDisplay = new Date(timestamp).toLocaleString();
    const hashDisplay= `${hash.substring(0,40)}...`;
    let addressMiner;
    const actionLabel = props.displayTransaction ? 'Hide transactions': 'Show transactions'
    
    const transactions = data.map(transaction =>  {

      if(transaction.input.address === '*authorized-reward*') {
        addressMiner = `${Object.keys(transaction.outputMap)[0].substring(0,40)}...`;
      }


      return (
      <div key={transaction.id}>
        <Transaction transaction={transaction} />
      </div>
      )
    })
    
  return (
    <div className="m-mg-xt-h m-bd-xt m-rd-xt m-mg-ty-b">
      <div className="m-fx-sb-c m-tertiary m-pd-xt-h">
        <span>Creation date</span>
        <span>{timestampDisplay}</span>
      </div>
       <div className="m-fx-sb-c m-tertiary m-pd-xt-h">
        <span>Mined by</span>
        <span>{addressMiner}</span>
      </div>
      <div className="m-fx-sb-c m-secondary m-pd-xt-h">
        <span>Hash</span>
        <span>{hashDisplay}</span>
      </div>
      <div class="m-pd-xt m-fx-en-c">
      <button className="m-alert m-pd-xt m-rd-xt" onClick={props.click}>{actionLabel}</button>
      </div>
      {props.displayTransaction && transactions}
    </div>
  )
}

export default Block;


