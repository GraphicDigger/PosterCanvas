/** @jsxImportSource @emotion/react */
import React, { forwardRef, cloneElement } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const WindowTrigger = forwardRef(({
  children,
  onClick,
  width,
  ...props
}, ref) => {
  const child = React.Children.only(children);

  const handleClick = (e) => {

    // Execute child's onClick first
    if (child.props.onClick) {
      child.props.onClick(e);
    }

    // Then execute WindowTrigger's onClick
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Trigger ref={ref} width={width} {...props}>
      {cloneElement(child, {
        onClick: handleClick,
      })}
    </Trigger>
  );
});

const Trigger = styled.div`
    cursor: pointer;
    width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    if (width === 'fill') { return '100%'; }
    if (width === 'fit') { return 'max-content'; }
    return width;
  }};`;

WindowTrigger.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};
