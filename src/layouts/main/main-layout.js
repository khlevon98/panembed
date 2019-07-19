import React, { Component } from 'react';
import './main-layout.scss';

import AppHeader from './header';
import AppFooter from './footer';

class AppLayout extends Component {
  render() {
    const { children } = this.props;

    const classList = ['App'].join(' ');

    return (
      <div className={classList}>
        <AppHeader />

        <main className="App-content container">{children}</main>

        <AppFooter />
      </div>
    );
  }
}

export default AppLayout;
