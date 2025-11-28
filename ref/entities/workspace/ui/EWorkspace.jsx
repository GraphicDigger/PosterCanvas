import React from 'react';
import PropTypes from 'prop-types';
import { WorkspaceListItem } from './listItem';
import { WorkspaceSwitcher } from './switcher/WorkspaceSwitcher';

export const EWorkspace = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <WorkspaceListItem {...props} />;
  case 'switcher':
    return <WorkspaceSwitcher {...props} />;
  default:
    return null;
  }
};
