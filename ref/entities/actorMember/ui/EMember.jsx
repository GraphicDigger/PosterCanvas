import React from 'react';
import PropTypes from 'prop-types';
import { MemberListItem } from './listItem';

export const EMember = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <MemberListItem {...props} />;
  default:
    return null;
  }
};
