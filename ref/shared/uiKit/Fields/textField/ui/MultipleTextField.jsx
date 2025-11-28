/** @jsxImportSource @emotion/react */
import React, { memo, useState, forwardRef, useCallback, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useField, FIELD_TYPES } from '../model';
import { TextAreaUnstyled } from '../../../FieldsUnstyled';
import { typography } from '../../../../styles';


export const TextFieldMultiple = memo(forwardRef(({
  // Input props
  id,
  name,
  value,
  placeholder,
  disabled = false,
  readOnly = false,
  maxLength,
  error,
  className,
  autoFocus = false,
  style,
  wrap = 'soft',

  // Style props
  fill = true,
  width,
  resize,
  size = 'small',
  minHeight = 32,
  maxHeight,

  // Event handlers
  onChange,
  onKeyDown,
  onKeyUp,
  onPaste,
  onDrop,
  // bufferOnBlur = false,
  onFocus: propOnFocus = () => { },
  onBlur: propOnBlur = () => { },

}, ref) => {
  const theme = useTheme();
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const {
    handleChange,
    handleKeyDown,
    handlePaste,
    handleDrop,
  } = useField({
    value,
    onChange,
    onPaste,
    onDrop,
    inputRef: textareaRef,
    autoAdjustHeight: true,
    type: FIELD_TYPES.TEXTAREA,
    minHeight,
    maxHeight,
    // bufferOnBlur,

  });

  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    propOnFocus(e);
  }, [propOnFocus]);

  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    propOnBlur(e);
  }, [propOnBlur]);

  const handleHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // const handleChange = useCallback((e) => {
  //     onChange(e);
  // }, [onChange]);

  // const handleKeyDown = useCallback((e) => {
  //     onKeyDown(e);
  // }, [onKeyDown]);

  // const handlePaste = useCallback((e) => {
  //     onPaste(e);
  // }, [onPaste]);

  // const handleDrop = useCallback((e) => {
  //     onDrop(e);
  // }, [onDrop]);

  return (
    <StyledLayout width={width}>
      <StyledTextArea
        $size={size}
        $fill={fill}
        $resize={resize}
        $theme={theme}
        isFocused={isFocused}
        isHovered={isHovered}
      >
        <TextAreaUnstyled
          ref={textareaRef}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          className={className}
          wrap={wrap}
          style={style}
          resize={resize}

          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={onKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        />
      </StyledTextArea>
      {error && <StyledError theme={theme}>{error}</StyledError>}
    </StyledLayout>
  );
}));

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: ${({ width }) => width ? `${width}px` : '100%'};
`;

const StyledTextArea = styled.div`
    width: 100%;
    height: auto;
    padding: 4px 4px 4px 8px;
    display: flex;
    align-items: center;
    resize: ${({ $resize }) => $resize};
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    min - height: ${({ $size, theme }) => theme.ref.control.height[$size] || theme.ref.control.height.small};
    border: 2px solid transparent;

    background-color: ${({ $fill, $backgroundColor }) => $fill ? $backgroundColor : 'transparent'};
    
    ${({ isHovered, isFocused, error, theme }) => {
    const f = theme.comp.textFieldMultiple;

    if (isHovered) {
      return css`
            background-color: ${f.hover.background};
          `;
    }

    if (isFocused) {
      return css`
            background-color: ${f.focus.background};
            border: 2px solid ${f.focus.border};
          `;
    }

    if (error) {
      return css`
            background-color: ${f.error.background};
          `;
    }

    return css`
          background-color: ${f.default.background};
        `;
  }}
    ${({ variant = 'small', theme }) => {
    const t = theme.sys.typography.body;
    switch (variant) {
    case 'medium':
      return css`
              font-size: ${t.small.fontSize};
              font-weight: ${t.small.fontWeight};
              line-height: ${t.small.lineHeight};
            `;
    case 'small':
    default:
      return css`
              font-size: ${t.xsmall.fontSize};
              font-weight: ${t.xsmall.fontWeight};
              line-height: ${t.xsmall.lineHeight};
            `;
    }
  }
}
`;

const StyledError = styled.div`
    width: 100 %;
    color: red;
    margin - top: 4px;
    ${({ theme }) => {
    const t = theme.sys.typography.body.xsmall;
    return css`
            font-size: ${t.fontSize};
            font-weight: ${t.fontWeight};
            line-height: ${t.lineHeight};
        `;
  }}
`;

TextFieldMultiple.propTypes = {
  fill: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  wrap: PropTypes.oneOf(['soft', 'hard']),
  style: PropTypes.object,
};

export default TextFieldMultiple;
