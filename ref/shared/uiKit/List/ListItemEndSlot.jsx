/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const ListItemEndSlot = ({
  children,
  spacing = 0,
}) => {
  return (
    <Styled spacing={spacing}>
      {children}
    </Styled>
  );
};


const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    margin-left: auto;
    padding: ${({ spacing }) => `${spacing * 2}px`};
`;


ListItemEndSlot.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
};
