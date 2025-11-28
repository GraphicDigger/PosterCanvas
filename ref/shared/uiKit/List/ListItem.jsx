/** @jsxImportSource @emotion/react */
import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { sizeMap } from '../../styles';
import { useTheme } from '@emotion/react';

export const ListItem = forwardRef(({
  children,
  size = 'small',
  onClick,
  width = '100%',
  ...props
}, ref) => {
  const theme = useTheme();

  const childrenArray = React.Children.toArray(children);
  const button = childrenArray.find(
    child => React.isValidElement(child) && child.type.name === 'ListItemButton',
  );

  if (button) {
    const buttonOnClick = (e) => {
      if (button.props.onClick) {
        button.props.onClick(e);
      }

      if (onClick) {
        onClick(e);
      }
    };

    const clonedButton = React.cloneElement(button, {
      ref,
      size,
      onClick: buttonOnClick,
    });

    return (
      <StyledListItem
        size={size}
        className='list-item'
        {...props}
      >
        {clonedButton}
        {childrenArray.filter(child => child !== button)}
      </StyledListItem>
    );
  }

  return (
    <StyledListItem
      ref={ref}
      size={size}
      width={width}
      className='list-item'
      onClick={onClick}
      theme={theme}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { size });
        }
        return child;
      })}
    </StyledListItem>
  );
});

const StyledListItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    height: ${({ theme, size }) => theme.ref.control.height[size] || 'auto'};
    color: ${({ theme }) => theme.sys.typography.color.primary};
`;

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
};
