import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


export const InstanceListItem = ({  onClick }) => {

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <>
    </>
  );
};

InstanceListItem.propTypes = {
  onClick: PropTypes.func,
};

