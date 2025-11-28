/** @jsxImportSource @emotion/react */
import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, EndSlot, useField, FIELD_TYPES } from '../Fields';


export const SearchInput = memo(({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search',
  disabled,
  width,
  size = 'small',
  maxLength,
  endSlot,
}) => {
  const inputRef = useRef(null);

  const {
    handleKeyDown,
    handleChange,
  } = useField({
    value,
    type: FIELD_TYPES.TEXT,
    onChange,
    onSubmit,
  });

  return (
    <TextField
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      width={width}
      size={size}
      maxLength={maxLength}
      type="text"
    >
      {endSlot && (
        <EndSlot>
          {endSlot}
        </EndSlot>
      )}
    </TextField>
  );
});

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  maxLength: PropTypes.number,
};
