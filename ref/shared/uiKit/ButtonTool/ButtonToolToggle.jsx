/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const ButtonToolToggle = ({
  size = 'small',
  color = 'default',
  variant = 'blank',
  background = true,
  value,
  onChange,
  disabled = false,
  width,
  children,
}) => {
  const theme = useTheme();

  const handleButtonClick = (newValue, originalOnClick) => {
    if (!disabled) {
      if (originalOnClick && typeof originalOnClick === 'function') {
        originalOnClick(newValue);
      }
      onChange?.(newValue);
    }
  };

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const originalOnClick = child.props.onClick;
      return React.cloneElement(child, {
        color,
        variant,
        size,
        isSelected: value === child.props.value,
        disabled,
        onClick: () => handleButtonClick(child.props.value, originalOnClick),
      });
    }
    return child;
  });

  return (
    <GroupContainer
      background={background}
      theme={theme}
      width={width}
      disabled={disabled}
    >
      {clonedChildren}
    </GroupContainer>
  );
};

const GroupContainer = styled.div`
    display: flex;
    width: ${({ width }) => {
    if (!width) {return 'auto';}
    return typeof width === 'number' ? `${width}px` : width;
  }};
    background-color: ${({ background, theme }) => background && theme.sys.color.surfaceContainer.low};
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

ButtonToolToggle.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  variant: PropTypes.oneOf(['blank', 'lite', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  width: PropTypes.number,
};
