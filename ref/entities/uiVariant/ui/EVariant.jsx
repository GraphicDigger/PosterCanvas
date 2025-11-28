import React from 'react';
import PropTypes from 'prop-types';
import { VariantListItem } from './listItem/VariantListItem';
import { VariantsPanel } from '../../../features/uiControls/variantControl/VariantsControl';

export const EVariant = ({ uiView = 'listItem', ...props }) => {

  switch (uiView) {
  case 'listItem':
    return <VariantListItem {...props} />;
  default:
    return null;
  }
};

EVariant.propTypes = {
  uiView: PropTypes.oneOf(['listItem']).isRequired,
};
