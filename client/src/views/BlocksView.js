import React from 'react';
import Nav from '../components/Nav';
import BlocksContainer from '../containers/BlocksContainer';

const BlocksView = () => {
  return (
    <>
    <Nav />
    <main className="l-main m-primary App-main">
      <BlocksContainer />
    </main>
    </>
  )
};

export default BlocksView