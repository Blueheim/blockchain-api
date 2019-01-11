import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import './App.scss'

import HomeView from '../views/HomeView'
import BlocksView from '../views/BlocksView'
import TransactionView from '../views/TransactionView'
import TransactionPool from './TransactionPool'

import '../sass/nostromo.config.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="l-app l-app--config-1 App">
            <Switch>
              <Route path='/' exact component={HomeView} />
              <Route path='/blocks' component={BlocksView} />
              <Route path='/transaction' component={TransactionView} />
              <Route path='/transaction-pool' component={TransactionPool} />
            </Switch>
          <footer className="l-footer m-primary App-footer">
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
