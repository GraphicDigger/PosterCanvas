/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// Константы для брейкпоинтов
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Функция для создания медиа-запросов
const createMediaQuery = (breakpoint) => `@media (min-width: ${BREAKPOINTS[breakpoint]}px)`;

export const Grid = forwardRef(({
  // grid container
  container = false,
  columns = 12,
  spacing = 0,

  autoFill = false,
  autoFit = false,
  minmax = null, // { min: '200px', max: '1fr' }

  // grid item
  item = false,
  size,

  children,
  className,
}, ref) => {

  return (
    <StyledGrid
      ref={ref}
      className={className}
      container={container}
      item={item}
      size={size}
      spacing={spacing}
      columns={columns}
      autoFill={autoFill}
      autoFit={autoFit}
      minmax={minmax}
    >
      {children}
    </StyledGrid>
  );
});

const StyledGrid = styled.div`
    box-sizing: border-box;
    
    ${({ columns, spacing, container, autoFill, autoFit, minmax }) => container && css`
        display: grid;
        width: 100%;
        
        ${(() => {
    // minmax with auto-fill or auto-fit
    if (minmax && (autoFill || autoFit)) {
      const repeatType = autoFill ? 'auto-fill' : 'auto-fit';
      const minValue = minmax.min || '200px';
      const maxValue = minmax.max || '1fr';
      return css`
                    grid-template-columns: repeat(${repeatType}, minmax(${minValue}, ${maxValue}));
                `;
    }

    // only auto-fill or auto-fit with fixed size
    if (autoFill || autoFit) {
      const repeatType = autoFill ? 'auto-fill' : 'auto-fit';
      return css`
                    grid-template-columns: repeat(${repeatType}, minmax(200px, 1fr));
                `;
    }

    // standard behavior with fixed number of columns
    return css`
                grid-template-columns: repeat(${columns}, 1fr);
            `;
  })()}
        
        ${typeof spacing === 'number' && spacing > 0 && css`
            gap: ${spacing * 4}px;
        `}
    `}

    ${({ item, size }) => item && size && css`
        grid-column: span ${size};
    `}
`;

Grid.propTypes = {
  children: PropTypes.node,
  container: PropTypes.bool,
  item: PropTypes.bool,
  size: PropTypes.number,
  spacing: PropTypes.number,
  columns: PropTypes.number,
  autoFill: PropTypes.bool,
  autoFit: PropTypes.bool,
  minmax: PropTypes.shape({
    min: PropTypes.string,
    max: PropTypes.string,
  }),
  className: PropTypes.string,
};
