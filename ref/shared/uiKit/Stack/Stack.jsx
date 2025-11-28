/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const Stack = memo(forwardRef(({

  direction = 'column',
  align = 'center',
  justify = 'flex-start',
  position = 'relative',

  gap = 0,
  padding = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,

  width = 'fill', // fill(100%), fit(max-content), number(px)
  height = 'fill', // fill, fit, number

  children,
  backgroundColor,
  onClick,
  className,
  ...props
}, ref) => {

  const isColumn = direction === 'column';
  const finalAlign = isColumn ? justify : align;
  const finalJustify = isColumn ? align : justify;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledStack
      ref={ref}
      className={className}
      position={position}
      backgroundColor={backgroundColor}
      onClick={handleClick}
      direction={direction}
      gap={gap}
      alignItems={finalAlign}
      justifyContent={finalJustify}
      padding={padding}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledStack>
  );
}));

const StyledStack = styled.div`
    position: ${({ position }) => position};
    display: flex;
    flex-direction: ${({ direction }) => direction};
    flex: ${({ width, height }) =>
    typeof width !== 'number' && width === 'fill' &&
      typeof height !== 'number' && height === 'fill'
      ? '1'
      : 'none'
};
    width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    if (width === 'fill') { return '100%'; }
    if (width === 'fit') { return 'max-content'; }
    return width;
  }};
    height: ${({ height }) => {
    if (typeof height === 'number') { return `${height * 4}px`; }
    if (height === 'fill') { return '100%'; }
    if (height === 'fit') { return 'max-content'; }
    return height;
  }};
    gap: ${({ gap }) => `${gap * 4}px`};
    align-items: ${({ alignItems }) => alignItems};
    justify-content: ${({ justifyContent }) => justifyContent};
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding: ${({ padding }) => padding ? typeof padding === 'number' ? `${padding * 4}px` : padding : 0};
    padding-top: ${({ paddingTop }) => paddingTop ? typeof paddingTop === 'number' ? `${paddingTop * 4}px` : paddingTop : ''};
    padding-bottom: ${({ paddingBottom }) => paddingBottom ? typeof paddingBottom === 'number' ? `${paddingBottom * 4}px` : paddingBottom : ''};
    padding-left: ${({ paddingLeft }) => paddingLeft ? typeof paddingLeft === 'number' ? `${paddingLeft * 4}px` : paddingLeft : ''};
    padding-right: ${({ paddingRight }) => paddingRight ? typeof paddingRight === 'number' ? `${paddingRight * 4}px` : paddingRight : ''};
`;

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  align: PropTypes.string,
  justify: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
