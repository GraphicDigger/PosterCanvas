/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { CheckIcon } from '../../assets/icons';


export const MenuItemRadio = ({
  children,
  checked,
  onChange,
  name,
  value, //for <Select/>
}) => {
  const theme = useTheme();

  const handleRadioChange = () => {
    if (onChange) {onChange(!checked);}
  };

  return (
    <StyledMenuItem theme={theme} onClick={handleRadioChange}>
      <input
        type="radio"
        checked={checked}
        name={name}
        readOnly
        style={{ display: 'none' }}
      />
      <IconWrapper>
        {checked && <CheckIcon />}
      </IconWrapper>
      {children}
    </StyledMenuItem>
  );
};


const StyledMenuItem = styled.div`
    height: 28px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    color: ${({ theme }) => theme.sys.typography.color.primary};

    &:hover {
        background-color: ${({ theme }) => theme.sys.color.primary};
        color: ${({ theme }) => theme.sys.color.onPrimary};
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

MenuItemRadio.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};

// Добавляем displayName для компонента
MenuItemRadio.displayName = 'MenuItemRadio';
