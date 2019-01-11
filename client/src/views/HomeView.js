import React from 'react';
import Nav from '../components/Nav';
import HomeContainer from '../containers/HomeContainer';

const HomeView = () => {
  return (
      <>
      <Nav />
       <main className="l-main m-primary App-main">
          <HomeContainer />
      </main>
      </>
    );
};

export default HomeView