/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { checkboxStyles } from './Checkbox.style';
import { textColorsMode } from '../../styles/tokens/text';
import { CheckIcon } from '../../../shared/assets/icons';


export const Checkbox = ({
  variant = 'checkbox',
  checked = false,
  onChange,

  disabled = false,
  label,
  className,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    if (!disabled && onChange) {
      e.stopPropagation();
      onChange(e.target.checked);
    }
  };

  const variantRender = useMemo(() => {
    if (variant === 'checkbox') {
      return (
        <StyledCheckbox checked={checked} theme={theme} disabled={disabled}>
          {checked && !disabled && <CheckIcon size="xxs" color={theme.comp.checkbox.checked.icon} />}
          {disabled && checked && <CheckIcon size="xxs" color={theme.comp.checkbox.disabled.icon} />}
        </StyledCheckbox>
      );
    } else if (variant === 'switch') {
      return (
        <StyledSwitch checked={checked} theme={theme} disabled={disabled} >
          {checked && !disabled && <StyledSwitchCircle color={theme.comp.switch.checked.icon} />}
          {disabled && checked && <StyledSwitchCircle color={theme.comp.switch.disabled.icon} />}
          {!checked && !disabled && <StyledSwitchCircle color={theme.comp.switch.unchecked.icon} />}
        </StyledSwitch>
      );
    }
  }, [variant, checked, disabled, theme]);

  return (
    <StyledWrapper
      className={className}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledInputProxy type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} />

      {variantRender}

      {label && (
        <StyledLabel disabled={disabled} >
          {label}
        </StyledLabel>
      )}

    </StyledWrapper>
  );
};

const StyledCheckbox = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    background-color: ${({ checked, theme, disabled }) => {
    if (disabled) {
      return theme.comp.checkbox.disabled.background;
    }
    if (checked) {
      return theme.comp.checkbox.checked.background;
    }
    return theme.comp.checkbox.unchecked.background;
  }};
    color: white;
    transition: all 0.2s ease;
    overflow: hidden;
`;

const StyledSwitch = styled.div`
    width: 28px;
    height: 16px;
    padding: 2px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: ${({ checked }) => checked ? 'flex-end' : 'flex-start'};
    background-color: ${({ checked, theme, disabled }) => {
    if (disabled) {
      return theme.comp.switch.disabled.background;
    }
    if (checked) {
      return theme.comp.switch.checked.background;
    }
    return theme.comp.switch.unchecked.background;
  }};
`;
const StyledSwitchCircle = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
`;

const StyledHover = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: ${({ theme }) => theme.ref.palette.black};
    opacity: ${({ theme }) => theme.sys.state.hover};
`;

const StyledLabel = styled.span`
    margin-left: 8px;
    color: ${({ disabled, theme }) => disabled ? theme.sys.typography.color.disabled : theme.sys.typography.color.primary};
`;

const StyledWrapper = styled.label`
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    user-select: none;
`;

const StyledInputProxy = styled.input`
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
