/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useRef, memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '../../../app/providers';
import { mainColors, surfaceColors } from '../../styles';

export const ResizableWrapper = memo(forwardRef(({
  children,
  initialWidth = 250,
  minWidth = 250,
  maxWidth = 500,
  side = 'right',
  className,
  ...props
}, ref) => {
  const [width, setWidth] = useState(initialWidth);

  // Синхронизируем width с initialWidth и minWidth при их изменении
  useEffect(() => {
    const newWidth = Math.max(initialWidth, minWidth);
    setWidth(newWidth);
  }, [initialWidth, minWidth]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    function handleMouseMove(e) {
      const delta = side === 'right'
        ? e.clientX - startX
        : startX - e.clientX;

      const newWidth = Math.min(
        Math.max(startWidth + delta, minWidth),
        maxWidth,
      );

      setWidth(newWidth);
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = side === 'right' ? 'e-resize' : 'w-resize';
  }, [width, side, minWidth, maxWidth]);

  return (
    <StyledResizableWrapper
      ref={ref}
      className={className || 'resizable-wrapper'}
      $width={width}
      $side={side}
      {...props}
    >
      {children}
      <StyledResizeHandle
        $side={side}
        onMouseDown={handleMouseDown}
      />
    </StyledResizableWrapper>
  );
}));

const StyledResizableWrapper = styled.div`
    position: relative;
    width: ${({ $width }) => typeof $width === 'number' ? `${$width}px` : $width};
    height: 100%;
    flex: 0 0 auto;
    user-select: none;
`;

const StyledResizeHandle = styled.div`
    position: absolute;
    ${({ $side }) => $side}: -2px;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: ${({ $side }) => $side === 'right' ? 'e-resize' : 'w-resize'};
    background: transparent;
    z-index: 10;
`;

ResizableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  initialWidth: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  side: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

ResizableWrapper.displayName = 'ResizableWrapper';
