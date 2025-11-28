import React, { memo, forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';

export const TextAreaUnstyled = memo(forwardRef(({
  id,
  name,
  value,
  className,
  placeholder,
  rows,
  cols,
  disabled,
  readOnly,
  maxLength,
  maxHeight,
  minHeight,
  resize = false,
  wrap,
  autoFocus,
  style,

  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onPaste,
  onDrop,
  onMouseEnter,
  onMouseLeave,
}, ref) => {

  const theme = useTheme();

  return (
    <StyledTextArea
      ref={ref}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      className={className}
      style={style}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      autoFocus={autoFocus}
      wrap={wrap}
      minHeight={minHeight}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyUp={onKeyUp}
      onPaste={onPaste}
      onDrop={onDrop}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}

      $maxHeight={maxHeight}
      $resize={resize}
      $disabled={disabled}
      $readOnly={readOnly}
    />
  );
}));

const StyledTextArea = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    background: none;
    overflow-x: hidden;
    color: ${({ theme }) => theme.sys.typography.color.primary};
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
    resize: ${({ $resize }) => $resize ? 'vertical' : 'none'};
    max-height: ${({ $maxHeight }) => $maxHeight ? `${$maxHeight}px` : 'none'};
    min-height: ${({ $minHeight }) => $minHeight ? `${$minHeight}px` : 'none'};
    cursor: ${({ $disabled, $readOnly }) =>
    $disabled ? 'not-allowed' :  $readOnly ? 'default' : 'text'
};
    &::placeholder {
        color: ${({ theme }) => theme.sys.typography.color.disabled};
        opacity: 0.5;
    }
`;

TextAreaUnstyled.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  wrap: PropTypes.oneOf(['soft', 'hard']),
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fill: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  theme: PropTypes.object,
  isFocused: PropTypes.bool,
};
