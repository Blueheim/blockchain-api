import React from 'react';
import Nav from '../components/Nav';
import TransactionPoolContainer from '../containers/TransactionPoolContainer';

const TransactionView = () => {
  return (
    <>
    <Nav />
    <main className="l-main m-primary App-main">
      <TransactionPoolContainer />
    </main>
    </>
  )
};

export default TransactionView