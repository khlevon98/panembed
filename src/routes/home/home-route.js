import React from 'react';
import { connect } from 'react-redux';

import ErrorBoundary from '../../components/error-boundary';

import ProjectList from '../../components/project-list';
import { fetchProjects } from '../../store/actions/project';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Spinner from '../../components/spinner';
import PropTypes from 'prop-types';

class HomeRoute extends React.Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const {
      projects: { data, isLoaded },
    } = this.props;

    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <section className="section">
        <ErrorBoundary>
          <ProjectList data={data} />
        </ErrorBoundary>
      </section>
    );
  }
}

HomeRoute.propTypes = {
  projects: PropTypes.shape({
    isLoaded: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getProjects: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.project.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: () => dispatch(fetchProjects()),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
);

export default enhance(HomeRoute);
