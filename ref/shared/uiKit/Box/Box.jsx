/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

export const Box = forwardRef(({
  children,
  onClick,

  css: customCss,
  className,

  size,
  width,
  height,

}, ref) => {
  return (
    <BoxContainer
      ref={ref}
      css={[customCss, css]}
      className={className}
      onClick={onClick}
      size={size}
      width={width}
      height={height}
    >
      {children}
    </BoxContainer>
  );
});

const BoxContainer = styled.div`
    ${({ size }) => size && css`
        width: ${size * 2}px;
        height: ${size * 2}px;
    `}
    ${({ width }) => width && css`
        width: ${width * 2}px;
    `}
    ${({ height }) => height && css`
        height: ${height * 2}px;
    `}
`;

Box.propTypes = {
  children: PropTypes.node,
  css: PropTypes.object,
  direction: PropTypes.oneOf(['row', 'column']),
  gap: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
