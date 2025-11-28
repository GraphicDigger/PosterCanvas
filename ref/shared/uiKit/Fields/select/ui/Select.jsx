/** @jsxImportSource @emotion/react */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { MenuItem, MenuList, MenuItemCheckbox, MenuItemRadio } from '../../../Menu';
import { useSelect, useSelectChildren } from '../model';
import { Surface } from '../../../Surface';
import { ArrowDownIcon } from '../../../../assets/icons';


const OptionsContainer = ({ children, isOpen, width }) => {
  const theme = useTheme();

  if (!isOpen) {return null;}

  return (
    <StyledOptionsContainer width={width}>
      <Surface
        backgroundColor={theme.sys.color.surface}
        borderRadius={theme.ref.borderRadius.large}
        elevation={4}
      >
        <MenuList width={width}>
          {children}
        </MenuList>
      </Surface>
    </StyledOptionsContainer>
  );
};


export const Select = ({
  value,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = 'Select an option',
  disabled = false,
  size = 'small',
  width,
  variant, // 'default', 'checkbox', 'radio'
  name,
  children,
  ...restProps
}) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);
  const [optionsWidth, setOptionsWidth] = useState(0);

  // Определяем эффективный вариант (тип элементов списка)
  const effectiveVariant = useMemo(() => {
    if (variant) {return variant;}

    return multiple ? 'checkbox' : 'default';
  }, [variant, multiple]);

  // Используем хук для работы с дочерними элементами
  const { extractedOptions } = useSelectChildren(children, {
    selectedValue: value,
    multiple,
    handleSelect: () => {},
    name,
    variant: effectiveVariant,
  });

  // Основной хук для работы с селектом
  const {
    selectRef,
    isOpen,
    isHovered,
    isFocused,
    selectedValue,
    selectedOption,
    selectedOptions,
    displayValue,
    handleSelect,
    toggleOpen,
    selectProps,
    options: validOptions,
  } = useSelect({
    options: extractedOptions,
    value,
    defaultValue,
    onChange,
    multiple,
    disabled,
    inputRef: wrapperRef,
  });

  // Используем хук для рендеринга дочерних элементов с нужными пропсами
  const { renderChildren } = useSelectChildren(children, {
    selectedValue,
    multiple,
    handleSelect,
    name,
    variant: effectiveVariant,
  });

  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      setOptionsWidth(wrapperRef.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <SelectWrapper ref={wrapperRef} width={width} {...restProps}>
      <StyledSelect
        {...selectProps}
        $size={size}
        theme={theme}
        $disabled={disabled}
        $isFocused={isFocused}
        $isHovered={isHovered}
        $isOpen={isOpen}
      >
        {displayValue ? (
          <StyledValue theme={theme}>
            {displayValue}
          </StyledValue>
        ) : (
          <StyledPlaceholder theme={theme}>
            {placeholder}
          </StyledPlaceholder>
        )}
        <ArrowDownIcon size="xxs" />
      </StyledSelect>
      <OptionsContainer isOpen={isOpen} width={optionsWidth}>
        {renderChildren(isOpen)}
      </OptionsContainer>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width ? `${width}px` : '100%'};
`;

const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 4px;
  height: ${({ $size, theme }) => theme.ref.control.height[$size] || theme.ref.control.height.medium};
  border-radius: ${ ({ theme }) => theme.ref.borderRadius.medium};
  border: 2px solid transparent;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  &:focus { outline: none }
  user-select: none;
  
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  background-color: ${({ theme }) => theme.comp.select.default.background};
  border-color: ${({ $isFocused, theme }) => $isFocused ? theme.comp.select.focus.border : 'transparent'};
  
  &:hover {
    background-color: ${({ $disabled, theme }) =>
    $disabled ? 'inherit' : theme.comp.select.hover.background};
  }
`;

const StyledValue = styled.span`
  flex-grow: 1;
  color: ${({ theme }) => theme.sys.typography.color.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledPlaceholder = styled.span`
  flex-grow: 1;
  color: ${({ theme }) => theme.sys.typography.color.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledOptionsContainer = styled.div`
  position: absolute;
  top: calc(100% - 8px);
  left: 0;
  z-index: 2000;
`;

// PropTypes
OptionsContainer.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  width: PropTypes.number,
};

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Select;
