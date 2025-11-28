import React from 'react';
import PropTypes from 'prop-types';
import { AttrListItem } from './components/AttrListItem';
import { AttrTextField } from './components/AttrTextField';


export const EHtmlAttr = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <AttrListItem {...props} />;
  case 'textField':
    return <AttrTextField {...props} />;
  default:
    return null;
  }
};
