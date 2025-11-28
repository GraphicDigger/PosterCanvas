/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


export const Field = ({
  children,
  direction = 'row',
  onClick,
  width,
}) => {
  const handleClick = (e) => {
    onClick?.(e);
  };

  return (
    <Container
      direction={direction}
      onClick={onClick && handleClick}
      isClickable={!!onClick}
      width={width}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: ${({ direction }) => direction};
    justify-content: ${({ direction }) => (direction === 'row' ? 'space-between' : 'flex-start')};
    align-items: ${({ direction }) => (direction === 'row' ? 'center' : 'flex-start')};
    gap: 6px;
    width: ${({ width }) => width
    ? typeof width === 'number'
      ? `${width}px`
      : width
    : '100%'};
    cursor: ${({ isClickable }) => isClickable ? 'pointer' : 'default'};

`;

Field.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  onClick: PropTypes.func,
};
