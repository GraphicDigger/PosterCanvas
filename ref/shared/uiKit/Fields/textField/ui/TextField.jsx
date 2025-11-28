/** @jsxImportSource @emotion/react */
import React, { memo, useRef, useMemo, forwardRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { getBorderRadius } from './TextField.style';
import { InputUnstyled } from '../../../FieldsUnstyled';
import { useField } from '../model';
import { StartSlot } from './TextFieldStartSlot';
import { EndSlot } from './TextFieldEndSlot';


export const TextField = memo(forwardRef(({
  children,

  // Input props
  id,
  name,
  value = '',
  placeholder,
  type = 'text',
  disabled = false,
  readOnly = false,
  required = false,
  maxLength,
  dataValue,
  className = 'input',
  error,

  // Style props
  width = '100%',
  fill = true,
  size = 'small',
  alignText = 'left',
  position,
  orientation,

  // Event handlers
  onChange = () => { },
  bufferOnBlur = false,
  onKeyDown,
  onPaste,
  onDrop,
  onFocus,
  onBlur,

  // numeric
  numeric = false,
  allowDecimals = true,
  allowNegative = false,
  allowUnits = false,
  units = [],
  min = null,
  max = null,

}, ref) => {

  const theme = useTheme();
  const internalRef = useRef(null);

  const {
    inputRef,
    fieldProps,
    isHovered,
    isFocused,
  } = useField({
    inputRef: ref || internalRef,
    type,
    value,
    onChange,
    onKeyDown,
    onPaste,
    onDrop,
    onFocus,
    onBlur,
    bufferOnBlur,
    // numeric
    numeric,
    allowDecimals,
    allowNegative,
    allowUnits,
    units,
    maxLength,
    min,
    max,
  });

  const slots = useMemo(() => {
    const result = {
      start: null,
      end: null,
    };
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) { return; }
      if (child.type === StartSlot) { result.start = child; }
      if (child.type === EndSlot) { result.end = child; }
    });
    return result;
  }, [children]);

  const getBackgroundColor = useMemo(() => {
    if (isHovered) { return theme.comp.textField.hover; }
    if (isFocused) { return theme.comp.textField.focus; }
    if (error) { return theme.comp.textField.error; }
    return theme.comp.textField.default;
  }, [isHovered, isFocused, error, theme]);

  return (
    <StyledLayout width={width}>
      <StyledInput
        $isFocused={isFocused}
        $size={size}
        $fill={fill}
        $backgroundColor={getBackgroundColor}
        $theme={theme}
        $position={position}
        $orientation={orientation}
        $alignText={alignText}
        theme={theme}
      >
        {slots.start}
        <InputUnstyled
          {...fieldProps}
          id={id}
          name={name}
          placeholder={placeholder}
          alignText={alignText}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          dataValue={dataValue}
        />
        {slots.end}
      </StyledInput>
      {error && <StyledError>{error}</StyledError>}
    </StyledLayout>
  );
}));

const StyledLayout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width}
`;

const StyledInput = styled.div`
    position: relative;
    width: 100%;
    height: ${({ $size, theme }) => theme.ref.control.height[$size] || theme.ref.control.height.small};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: ${({ $alignText }) => $alignText === 'center' ? '0 2px 1px 2px' : '0 0 1px 8px'};
    border-radius: ${({ $position, $orientation, theme }) => getBorderRadius($position, $orientation, theme)};
    background-color: ${({ $fill, $backgroundColor, $theme }) =>
    ($fill ? $backgroundColor : 'transparent')};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: ${({ $position, $orientation, theme }) => getBorderRadius($position, $orientation, theme)};
        border: ${({ $isFocused, $theme }) =>
    $isFocused ? `2px solid ${$theme.ref.color.blue60}` : '2px solid transparent'};
        pointer-events: none;
        z-index: 1;
    }

    & > * {
        position: relative;
        z-index: 0;
    }

`;

const StyledError = styled.div`
    width: 100%;
    color: red;
    margin-top: 4px;
`;


TextField.propTypes = {
  // Input props
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  dataValue: PropTypes.string,
  className: PropTypes.string,

  // Style props
  width: PropTypes.number,
  fill: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  alignText: PropTypes.oneOf(['left', 'center', 'right']),
  position: PropTypes.oneOf(['first', 'middle', 'last']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  // Event handlers
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  // Error
  error: PropTypes.string,

  // Children for slots
  children: PropTypes.node,
};

// Добавляем слоты как статические свойства
TextField.StartSlot = StartSlot;
TextField.EndSlot = EndSlot;
