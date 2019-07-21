import React from 'react';

import './error-indicator.scss';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <h3 className="boom mb-0 red-text">BOOOOOOM!</h3>
      <p>something has gone terribly wrong</p>
    </div>
  );
};

export default ErrorIndicator;
