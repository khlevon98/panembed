import React from 'react';

import { connect } from 'react-redux';

import ErrorBoundary from '../../components/error-boundary';

class ViewProjectRoute extends React.Component {
  render() {
    return (
      <section className="section">
        <ErrorBoundary>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input disabled value="I am not editable" id="disabled" type="text" className="validate" />
                  <label htmlFor="disabled">Disabled</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </form>
          </div>
        </ErrorBoundary>
      </section>
    );
  }
}

export default connect()(ViewProjectRoute);
