import PropTypes from 'prop-types';
import React, { memo, forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { textColorsMode } from '../../styles';

export const InputUnstyled = memo(forwardRef(({
  id,
  name,
  value = '',
  type,
  placeholder,
  alignText,
  className,
  disabled,
  readOnly,
  required,
  maxLength,
  dataValue,

  onChange = () => { },
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  onPaste,
  onDrop,
  cursor,

}, ref) => {

  const theme = useTheme();

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <StyledInput
      ref={ref}
      id={id}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      theme={theme}
      $alignText={alignText}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      data-value={dataValue}
      $cursor={cursor}

      onChange={handleChange}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onDrop={onDrop}
    />
  );
}));

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    color: ${({ theme }) => theme.sys.typography.color.primary};
    text-align: ${({ $alignText }) => $alignText};
    cursor: ${({ $cursor }) => $cursor};
    
    &::placeholder {
        color: ${({ theme }) => theme.sys.typography.color.primary}; 
        opacity: 0.6; 
    }
`;


InputUnstyled.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  alignText: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  dataValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  textColors: PropTypes.string,
};
