import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


export const MemberListItem = ({  onClick }) => {

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <>
    </>
  );
};

MemberListItem.propTypes = {
  onClick: PropTypes.func,
};

