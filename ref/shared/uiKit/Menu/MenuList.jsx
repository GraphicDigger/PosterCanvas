/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


export const MenuList = ({
  children,
  gap = 0,
  padding = 2,
  width,
}) => {
  return (
    <StyledContent
      gap={gap}
      padding={padding}
      width={width}
    >
      {children}
    </StyledContent>

  );
};

const StyledContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => gap}px;
    padding: ${({ padding }) => `${padding * 4}px`};
    min-width: ${({ width }) => width}px;
    `;

MenuList.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.number,
  padding: PropTypes.number,
  width: PropTypes.number,
};
