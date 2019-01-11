import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <header className="l-header m-primary App-header">
      <div className="l-nav l-nav--fixed">
        <nav className="nav--bar m-pd-xt-h">
          <div className="nav__brand">
            
          </div>
          <ul className="nav__actions">
            <div className="logo"></div>
            <li className="nav__action">
              <NavLink exact to='/'>Home</NavLink>
            </li>
            <li className="nav__action">
              <NavLink to='/blocks'>Blocks</NavLink>
            </li>
            <li className="nav__action">
              <NavLink to='/transaction'>Perform a transaction</NavLink>
            </li>
            <li className="nav__action">
              <NavLink to='/transaction-pool'>Transaction Pool</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Nav;