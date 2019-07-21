import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import ProjectActions from '../project-actions';

import './project-list.scss';
import Image from '../image';
import { ProjectsNotFound } from '../not-found';

const ProjectList = props => {
  const { data, showActions, userId } = props;

  const items = data.map(({ id, title, thumb, ownerId }) => (
    <div className="col s12 m6 l4" key={id}>
      <div className="card">
        <div className="card-image">
          <Image src={thumb} alt={title} />
          {showActions ? (
            <ProjectActions
              projectOwnerId={ownerId}
              userId={userId}
              onGet={props.handleGet}
              onDelete={() => props.handleDelete(id)}
            >
              <button type="button" className="btn-floating halfway-fab waves-effect waves-light blue-grey">
                <i className="material-icons">more_vert</i>
              </button>
            </ProjectActions>
          ) : null}
        </div>
        <div className="card-content">
          <p>
            <Link className="blue-grey-text" to={`/projects/${id}`}>
              {title}
            </Link>
          </p>
        </div>
      </div>
    </div>
  ));

  return <div className="row project-list min-h-100">{data.length ? items : <ProjectsNotFound />}</div>;
};

ProjectList.defaultProps = {
  userId: '',
  showActions: true,
  handleGet: () => {},
  handleDelete: () => {},
};

ProjectList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showActions: PropTypes.bool,
  userId: PropTypes.string,
  handleGet: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ProjectList;
