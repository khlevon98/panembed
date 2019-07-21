import React from 'react';

import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

import './header.scss';

const EmbedHeader = () => {
  return (
    <header className="Embed-header">
      <a href="/" target="_blank" className="brand-logo blue-grey-text text-lighten-3 center-align">
        <Logo className="d-block logo mx-auto" />
        <span>PanEmbed</span>
      </a>
    </header>
  );
};
export default EmbedHeader;
