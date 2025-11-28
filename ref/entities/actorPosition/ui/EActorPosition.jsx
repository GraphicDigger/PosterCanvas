import React from 'react';
import PropTypes from 'prop-types';
import { ActorPositionListItem } from './listItem';

export const EActorPosition = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ActorPositionListItem {...props} />;
  default:
    return null;
  }
};
