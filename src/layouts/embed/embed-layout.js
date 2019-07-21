import React, { Component } from 'react';
import './embed-layout.scss';

import EmbedHeader from './header';
import EmbedFooter from './footer';

class EmbedLayout extends Component {
  render() {
    const { children } = this.props;

    const classList = ['Embed'].join(' ');

    return (
      <div className={classList}>
        <EmbedHeader />

        <main className="Embed-content">{children}</main>

        <EmbedFooter />
      </div>
    );
  }
}

export default EmbedLayout;
