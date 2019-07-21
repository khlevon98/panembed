import React from 'react';

import { Link } from 'react-router-dom';

const ProjectNotFound = props => {
  return (
    <div className="valign-wrapper min-h-100 mx-auto" {...props}>
      <div className="not-found">
        <h3 className="boom">You have not created projects</h3>
        <p>
          <Link className="teal-text font-18" to="/projects/create">
            Create project
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProjectNotFound;
