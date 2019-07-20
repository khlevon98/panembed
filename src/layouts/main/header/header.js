import React from 'react';

import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

import './header.scss';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';

import { DefaultNavigation, AuthNavigation } from '../../../components/navigation';

const AppHeader = () => {
  return (
    <header className="App-header">
      <Navbar
        alignLinks="right"
        className="teal"
        brand={
          <NavLink to="/" className="valign-wrapper d-flex min-h-100">
            <Logo className="d-block logo" />
          </NavLink>
        }
      >
        <>
          <DefaultNavigation />
          <AuthNavigation />
        </>
      </Navbar>
    </header>
  );
};
export default AppHeader;
