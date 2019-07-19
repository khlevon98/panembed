import React from 'react';

import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

import './header.scss';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="App-header">
      <Navbar
        brand={
          <NavLink to="/" className="valign-wrapper d-flex min-h-100">
            <Logo className="d-block logo" />
          </NavLink>
        }
        alignLinks="right"
        className="teal"
      >
        <NavLink to="/">Getting started</NavLink>
      </Navbar>
    </header>
  );
};

export default AppHeader;
