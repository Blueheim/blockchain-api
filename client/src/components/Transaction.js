import React from 'react'

const Transaction = ({ transaction }) => {

  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <div className="m-pd-xt m-rd-xt">
      <div className="m-fx-sb-c">
          <span>From: {`${input.address.substring(0, 20)}...`}</span>
          <span>Balance: { input.amount }</span> 
      </div>
      {
        recipients.map(recipient => (
            <div key={recipient}>
              To: {`${recipient.substring(0, 20)}...`} | Sent: { outputMap[recipient] }
            </div>
          )
        )
      }
    </div>
  )
}


export default Transaction