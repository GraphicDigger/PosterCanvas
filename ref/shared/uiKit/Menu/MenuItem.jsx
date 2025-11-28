/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import {
  borderRadius,
  spacing,
  mainColors,
  colors,
  textColorsMode,
} from '../../styles';
import { Text } from '../Text';


export const MenuItem = ({
  children,
  onClick,
  value, //for <Select/>
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <StyledItem theme={theme} onClick={handleClick}>
      {children}
    </StyledItem>
  );
};


const StyledItem = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    height: 28px;
    width: 100%;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    color: ${({ theme }) => theme.sys.typography.color.primary};
    cursor: pointer;
    
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
        background-color: ${({ theme }) => theme.sys.color.primary};
        color: ${({ theme }) => theme.sys.color.onPrimary};
    }

`;


MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  closeMenu: PropTypes.func,
  value: PropTypes.string,
};

// Добавляем displayName для компонента
MenuItem.displayName = 'MenuItem';
