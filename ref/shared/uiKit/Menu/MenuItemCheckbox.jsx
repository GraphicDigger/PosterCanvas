/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { CheckIcon } from '../../assets/icons';


export const MenuItemCheckbox = ({
  children,
  checked,
  onChange,
  value, //for <Select/>
}) => {
  const theme = useTheme();

  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <StyledMenuItem theme={theme} onClick={handleCheckboxChange}>
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={{ display: 'none' }}
      />
      <StyledIconWrapper>
        {checked && <CheckIcon />}
      </StyledIconWrapper>
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

const StyledIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

MenuItemCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
