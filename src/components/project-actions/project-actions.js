import React from 'react';

import PropTypes from 'prop-types';

import { Divider, Dropdown } from 'react-materialize';

const ProjectActions = ({ children, projectOwnerId, user, ...rest }) => {
  const isUserProjectOwner = projectOwnerId === user.id;

  let actions = [
    <a href="#!" key="get_embed">
      Get
    </a>,
  ];

  if (isUserProjectOwner) {
    actions = [
      ...actions,
      <Divider key="divider" />,
      <a href="#!" key="edit_project">
        Edit
      </a>,
      <a href="#!" className="red-text" key="delete_project">
        Delete
      </a>,
    ];
  }

  return (
    <Dropdown trigger={children} {...rest}>
      {actions}
    </Dropdown>
  );
};

ProjectActions.defaultProps = {
  user: {
    id: '1',
  },
};

ProjectActions.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({}),
  projectOwnerId: PropTypes.string.isRequired,
};

export default ProjectActions;
