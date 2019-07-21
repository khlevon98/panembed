import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from '../../components/not-found';
import PanViewer from '../../components/pan-viewet';
import PropTypes from 'prop-types';
import { fetchProject } from '../../store/actions/project';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Spinner from '../../components/spinner';

class EmbedRoute extends Component {
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
      <section className="section p-0">
        <PanViewer src={data.image} />
      </section>
    );
  }
}

EmbedRoute.propTypes = {
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

export default enhance(EmbedRoute);
