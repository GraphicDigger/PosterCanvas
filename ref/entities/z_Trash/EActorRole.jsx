import React from 'react';
import PropTypes from 'prop-types';
import { ActorRoleListItem } from './listItem';
import { ActorRoleTableItem } from './tableItem';

export const EActorRole = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ActorRoleListItem {...props} />;
  case 'tableItem':
    return <ActorRoleTableItem {...props} />;
  default:
    return null;
  }
};
