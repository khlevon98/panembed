import React from 'react';
import PropTypes from 'prop-types';

import ProjectActions from '../project-actions';

import './project-list.scss';

const ProjectList = props => {
  const { data } = props;

  const items = data.map(({ id, title, image, owner }) => (
    <div className="col s12 m6 l4" key={id}>
      <div className="card">
        <div className="card-image">
          <img src={image} alt={title} />
          <ProjectActions projectOwnerId={owner.id.toString()}>
            <button type="button" className="btn-floating halfway-fab waves-effect waves-light blue-grey">
              <i className="material-icons">more_vert</i>
            </button>
          </ProjectActions>
        </div>
        <div className="card-content">
          <p>{title}</p>
        </div>
      </div>
    </div>
  ));

  return <div className="row">{items}</div>;
};

ProjectList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectList;
