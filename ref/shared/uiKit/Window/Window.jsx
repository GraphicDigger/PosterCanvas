/** @jsxImportSource @emotion/react */
import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Surface } from '../Surface';

export const Window = forwardRef(({
  children,
  width = 260,
  backgroundColor,
  onClick,
}, ref) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledContent
      ref={ref}
      width={width}
      onClick={handleClick}
    >
      <Surface
        elevation={4}
        borderRadius={12}
        backgroundColor={backgroundColor}
      >
        {children}
      </Surface>
    </StyledContent>
  );
});

const StyledContent = styled.div`
    width: ${({ width }) => width}px;
`;

