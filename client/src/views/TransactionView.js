import React from 'react';
import Nav from '../components/Nav';
import TransactionContainer from '../containers/TransactionContainer';

const TransactionView = () => {
  return (
    <>
    <Nav />
    <main className="l-main m-primary App-main">
      <TransactionContainer />
    </main>
    </>
  )
};

export default TransactionView