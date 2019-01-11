import React from 'react'
import Transaction from './Transaction'

const Block = (props) => {

    const { timestamp, hash, data } = props.block;
    const stringifiedData = JSON.stringify(data);
    const timestampDisplay = new Date(timestamp).toLocaleString();
    const hashDisplay= `${hash.substring(0,20)}...`;
    const dataDisplay = stringifiedData.length > 35 ? 
      `${stringifiedData.substring(0, 35)}...` 
      : stringifiedData;
    
    const transactions = data.map(transaction => (
      <div key={transaction.id}>
        <hr />
        <Transaction transaction={transaction} />
      </div>
    ))

  return (
    <div className="Block m-pd-ty m-bd-xt m-tx-c m-mg-ty-b">
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {timestampDisplay}</div>
      <div>Data: {dataDisplay}</div>
      <div><button className="m-alert m-pd-xt m-rd-xx" onClick={props.click}>Show more</button></div>
      {props.displayTransaction && transactions}
    </div>
  )
}

export default Block;


