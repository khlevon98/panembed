import React from 'react';

import { connect } from 'react-redux';

import ErrorBoundary from '../../components/error-boundary';
import { fetchProject } from '../../store/actions/project';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import ProjectDetails from '../../components/project-details';
import Spinner from '../../components/spinner';
import PropTypes from 'prop-types';
import NotFound from '../../components/not-found';

class ViewProjectRoute extends React.Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  render() {
    const {
      project: { data, isLoaded, error },
    } = this.props;

    if (!isLoaded) {
      return <Spinner />;
    }

    if (!data || error) {
      return <NotFound />;
    }

    return (
      <section className="section">
        <ErrorBoundary>
          <ProjectDetails data={data} />
        </ErrorBoundary>
      </section>
    );
  }
}

ViewProjectRoute.propTypes = {
  project: PropTypes.shape({
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    data: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  getProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    project: state.project.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProject: id => dispatch(fetchProject(id)),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
);

export default enhance(ViewProjectRoute);
