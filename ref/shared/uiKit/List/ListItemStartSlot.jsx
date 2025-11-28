/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const ListItemStartSlot = ({
  children,
  spacing = 3,
}) => {
  return (
    <Styled spacing={spacing}>
      {children}
    </Styled>
  );
};

ListItemStartSlot.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
};

const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0;
    padding-right: ${({ spacing }) => typeof spacing === 'number' ? `${spacing * 2}px` : spacing};
`;
