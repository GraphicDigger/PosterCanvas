import React from 'react';
import PropTypes from 'prop-types';
import { ActivityCard } from './card';

export const EActivity = ({ uiView = 'card', ...props }) => {
  switch (uiView) {
  case 'card':
    return <ActivityCard {...props} />;
  default:
    return null;
  }
};
