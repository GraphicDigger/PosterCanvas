import React from 'react';
import PropTypes from 'prop-types';
import { PresetModeValueListItem } from './listItem';

export const EPresetModeValue = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <PresetModeValueListItem {...props} />;
  default:
    return null;
  }
};
