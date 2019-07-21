import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './project-details.scss';
import PanViewer from '../pan-viewet';
import { GetCodeModal } from '../modal';

const ProjectDetail = props => {
  const {
    data: { id, image, title, description, ownerName, createDate },
  } = props;

  const [{ isOpened, openedProjectId }, setOpened] = useState({
    isOpened: false,
    openedProjectId: '',
  });

  const handleGetCode = () => {
    setOpened({ isOpened: true, openedProjectId: id });
  };

  const date = new Date(createDate.toDate()).toUTCString();

  return (
    <section className="section project-details">
      <div className="row">
        <h3 className="mb-0">{title}</h3>
      </div>
      <div className="row viewer mb-0">
        <PanViewer src={image} />
      </div>
      <div className="row">
        <span className="helper-text d-block font-12">
          Created by <b>{ownerName}</b> at {date}
        </span>

        <p className=" mt-3">
          <button className="btn teal waves-effect" onClick={handleGetCode} type="button">
            Get code
          </button>
        </p>

        <p className=" mt-3">{description}</p>
      </div>

      <GetCodeModal
        isOpened={isOpened}
        projectId={openedProjectId}
        onClosed={() => {
          setOpened({ isOpened: false, openedProjectId: '' });
        }}
      />
    </section>
  );
};

ProjectDetail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    ownerName: PropTypes.string,
    image: PropTypes.string,
    createDate: PropTypes.shape({ toDate: PropTypes.func }),
  }).isRequired,
};

export default ProjectDetail;
