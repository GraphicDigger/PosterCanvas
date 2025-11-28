import React from 'react';
import PropTypes from 'prop-types';
import { ActorAgentListItem } from './listItem';

export const EActorAgent = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ActorAgentListItem {...props} />;
  default:
    return null;
  }
};
