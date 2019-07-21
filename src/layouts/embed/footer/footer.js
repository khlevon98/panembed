import React from 'react';

import './footer.scss';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

const EmbedFooter = ({ project: { data } }) => {
  const { ownerName } = data || {};
  const year = new Date().getFullYear();

  return (
    <footer className="Embed-footer pt-0 right-align">
      <p className="m-0 white-text">
        &copy; {year} Copyright {ownerName ? `by ${ownerName}` : null}
      </p>
    </footer>
  );
};

EmbedFooter.propTypes = {
  project: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    project: state.project.current,
  };
}

const enhance = compose(connect(mapStateToProps));

export default enhance(EmbedFooter);
