import React from 'react';

import './footer.scss';
import { Footer } from 'react-materialize';

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="App-footer page-footer pt-0 teal">
      <div className="footer-copyright">
        <div className="container">
          <p>&copy; {year} Copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
