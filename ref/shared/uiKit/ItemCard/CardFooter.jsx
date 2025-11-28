import React from 'react';
import PropTypes from 'prop-types';


export const CardFooter = ({ children, size }) => {
  return children || 'Footer content';
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
