import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import ProjectActions from '../project-actions';

import './project-list.scss';
import Image from '../image';
import { ProjectsNotFound } from '../not-found';
import { GetCodeModal } from '../modal';
import ErrorBoundary from '../error-boundary';

const ProjectList = props => {
  const [{ isOpened, openedProjectId }, setOpened] = useState({
    isOpened: false,
    openedProjectId: '',
  });

  const {
    data,
    showActions,
    userId,
    handleDelete,
    handleGetCode = id => {
      setOpened({ isOpened: true, openedProjectId: id });
    },
  } = props;

  // const iterator = makeRangeIterator({ data, step: 3 });

  // let row = iterator.next();
  // const items = [];

  /* while (!row.done) {
    const rowData = row.value;

    items.push(
      <div className="row" key={rowData.index}>
        {rowData.data.map(({ id, title, thumb, ownerId }) => (
          <div className="col s12 m6 l4" key={id}>
            <div className="card">
              <div className="card-image">
                <Image src={thumb} alt={title} />
                {showActions ? (
                  <ProjectActions
                    projectOwnerId={ownerId}
                    userId={userId}
                    onGetCode={props.handleGetCode}
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
        ))}
      </div>
    );
    row = iterator.next();
  } */

  const items = data.map(({ id, title, thumb, ownerId }) => (
    <div className="project-list-item card" key={id}>
      {/* <div className="card"> */}
      <div className="card-image">
        <Image src={thumb} alt={title} />
        {showActions ? (
          <ProjectActions
            className="project-list-item-actions"
            projectOwnerId={ownerId}
            userId={userId}
            onGetCode={() => handleGetCode(id)}
            onDelete={() => handleDelete(id)}
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
      {/* </div> */}
    </div>
  ));

  return (
    <div className="row project-list min-h-100">
      <ErrorBoundary>
        {data.length ? items : <ProjectsNotFound />}
        <GetCodeModal
          isOpened={isOpened}
          projectId={openedProjectId}
          onClosed={() => {
            setOpened({ isOpened: false, openedProjectId: '' });
          }}
        />
      </ErrorBoundary>
    </div>
  );
};

ProjectList.defaultProps = {
  userId: '',
  showActions: true,
  handleGetCode: undefined,
  handleDelete: () => {},
};

ProjectList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showActions: PropTypes.bool,
  userId: PropTypes.string,
  handleGetCode: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ProjectList;
