import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import './App.scss'

import HomeView from '../views/HomeView'
import BlocksView from '../views/BlocksView'
import ConductTransaction from './ConductTransaction'
import TransactionPool from './TransactionPool'

import '../sass/nostromo.config.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="l-app l-app--config-1">
          <header className="l-header m-primary App-header">
              <div className="l-nav">
                <nav className="nav--bar">
                  <ul className="nav__actions">
                    <div className="logo"></div>
                    <li className="nav__action nav__action--1">
                      <NavLink to='/'>Home</NavLink>
                    </li>
                    <li className="nav__action nav__action--1">
                      <NavLink to='/blocks'>Blocks</NavLink>
                    </li>
                    <li className="nav__action nav__action--1">
                      <NavLink to='/conduct-transaction'>Conduct a transaction</NavLink>
                    </li>
                    <li className="nav__action nav__action--1">
                      <NavLink to='/transaction-pool'>Transaction Pool</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
          </header>
          <main className="l-main m-secondary App-main">
            <Switch>
              <Route path='/' exact component={HomeView} />
              <Route path='/blocks' component={BlocksView} />
              <Route path='/conduct-transaction' component={ConductTransaction} />
              <Route path='/transaction-pool' component={TransactionPool} />
            </Switch>
          </main>
          <footer className="l-footer m-tertiary App-footer">
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
