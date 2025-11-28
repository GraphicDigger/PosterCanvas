/** @jsxImportSource @emotion/react */
import React, { memo, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { lineColors, shadow } from '../../styles';

export const Surface = memo(forwardRef(({
  children,
  elevation = 0,
  border = false,
  borderRadius = 0,
  width = '100%',
  height = '100%',
  padding = 0,
  position = 'relative',
  backgroundColor,
  onClick,
  className,
}, ref) => {
  const theme = useTheme();

  const handleClick = (e) => {
    if (onClick) {onClick(e);}
  };

  return (
    <StyledSurface
      ref={ref}
      elevation={elevation}
      elevationShadow={theme.sys.shadow.elevation[elevation]}
      padding={padding}
      borderRadius={borderRadius}
      width={width}
      height={height}
      border={border}
      backgroundColor={backgroundColor}
      onClick={handleClick}
      className={className}
      position={position}
      theme={theme}
    >
      {children}
    </StyledSurface>
  );
}));

const StyledSurface = styled.div`
    ${({ position }) => {
    switch (position) {
    case 'relative':
      return 'position: relative;';
    case 'absolute':
      return 'position: absolute;';
    case 'fixed':
      return `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: -100;
                `;
    default:
      return 'position: relative;';
    }
  }};
    background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.comp.surface.default};
    outline: ${({ border, theme }) => border ? `1px solid ${theme.sys.color.outline.default}` : 'none'};
    border-radius: ${({ borderRadius }) => typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
    box-shadow: ${({ elevationShadow }) => elevationShadow};
    padding: ${({ padding }) => padding}px;
    
    width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    return width;
  }};
    height: ${({ height }) => {
    if (typeof height === 'number') { return `${height}px`; }
    return height;
  }};
    // overflow: hidden;
`;

Surface.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  padding: PropTypes.number,
  borderRadius: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.bool,
  background: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

