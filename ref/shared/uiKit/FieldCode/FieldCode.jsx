import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useField, FIELD_TYPES } from '../Fields';
import { TextAreaUnstyled } from '../FieldsUnstyled';

export const CodeField = ({
  value = '',
  onChange,
  minHeight = 50,
  maxHeight,
}) => {
  const codeRef = useRef(null);
  const containerRef = useRef(null);

  const {
    handleChange,
    handleKeyDown,
    handleBlur,
    bufferedValue,
  } = useField({
    inputRef: codeRef,
    value,
    onChange,
    type: FIELD_TYPES.TEXTAREA,
    bufferOnBlur: true,
    submitOnEnter: true,
    maxHeight,
    minHeight,
  });

  return (
    <StyledContainer ref={containerRef}>
      <TextAreaUnstyled
        ref={codeRef}
        value={bufferedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Enter your custom code here..."
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    white-space: pre;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: white;
    width: 100%;
`;
