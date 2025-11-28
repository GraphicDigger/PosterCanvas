/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


export const MenuLabel = ({ children }) => {
  return (
    <StyledLabel>
      {children}
    </StyledLabel>
  );
};

const StyledLabel = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 0 8px;
`;

MenuLabel.propTypes = {
  children: PropTypes.node.isRequired,
};
