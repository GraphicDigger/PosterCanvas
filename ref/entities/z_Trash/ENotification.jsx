import React from 'react';
import PropTypes from 'prop-types';
import { NotificationCard } from './card';

export const ENotification = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <NotificationCard {...props} />;
  default:
    return null;
  }
};
