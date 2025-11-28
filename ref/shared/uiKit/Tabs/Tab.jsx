/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';


export const Tab = ({
  children,
  variant = 'underlined',
  selected,
  onClick,
  tabSpacing = 16,
  tabWidth = 'auto',
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick && onClick(children);
  };

  return (
    <StyledTab
      variant={variant}
      isSelected={selected}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      theme={theme}
      tabSpacing={tabSpacing}
      tabWidth={tabWidth}
      data-testid={`tab-${children.toLowerCase()}`}
    >
      {children}
    </StyledTab>
  );
};

const StyledTab = styled.button`
    position: relative;
    display: flex;

    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    height: 100%;
    transition: all 0.2s ease;
    background: none;

    ${({ theme, isSelected, isHovered }) => `
        color: ${isSelected || isHovered ? theme.sys.typography.color.primary : theme.sys.typography.color.secondary}; 
    `}
    
    ${({ variant, isSelected, theme }) => variant === 'filled' && `
        height: 28px;
        padding: 0 8px;
        border-radius: 8px;
        background-color: ${isSelected ? theme.sys.color.surfaceContainer.lowest : 'transparent'};

        &:hover {
            background-color: ${!isSelected && theme.sys.color.surfaceContainer.lowest};
        }
    `}
    
    ${({ variant, isSelected, theme, tabSpacing, tabWidth }) => variant === 'underlined' &&
        `
        margin-right: ${tabSpacing}px;
        width: ${tabWidth};
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: ${isSelected ? theme.sys.typography.color.primary : 'transparent'};
            transition: background-color 0.2s ease;
            z-index: ${theme.ref.zIndex.layers.baseUI};
        }
        
    `}
`;


Tab.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['underlined', 'filled']),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  spacing: PropTypes.number,
};
