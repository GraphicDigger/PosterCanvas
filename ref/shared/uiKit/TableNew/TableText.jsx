/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable } from './model';

export const TableText = ({
  cellId,
  rowId,
  columnKey,
  children,
  placeholder = '',
  editable = false,
}) => {
  const {
    config,
    editing: {
      isEditing,
      startEditing,
      stopEditing,
    },
  } = useTable();
  const theme = useTheme();
  const [localValue, setLocalValue] = useState(children || '');
  const isEditMode = isEditing(cellId);
  const isEditable = config.editable && editable;


  // sync local value with children prop
  useEffect(() => {
    if (!isEditMode) {
      setLocalValue(children || '');
    }
  }, [children, isEditMode]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isEditMode) {
      e.preventDefault();
      stopEditing(true, localValue);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isEditMode) {
        setLocalValue(children || '');
        stopEditing(false);
      }
    }
  };

  const handleBlur = (e) => {
    if (isEditMode) {
      if (localValue !== null && localValue !== undefined) {
        stopEditing(true, localValue);
      } else {
        stopEditing(false);
      }
    }
  };

  const handleClick = (e) => {
    if (isEditable && !isEditMode) {
      e.stopPropagation();
      startEditing(cellId, rowId, columnKey);
    }
  };

  return (
    <Content className='table-text-content'>
      {isEditMode && isEditable ? (
        <TableInput
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <DisplayText
          $editable={isEditable}
          onClick={handleClick}
          theme={theme}
        >
          {children}
        </DisplayText>
      )}
    </Content>
  );
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
`;

const TableInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
    cursor: pointer;
`;

const DisplayText = styled.div`
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    color: ${({ theme }) => theme.sys.typography.color.primary};
    user-select: ${({ $editable }) => $editable ? 'text' : 'none'};
`;

TableText.propTypes = {
  cellId: PropTypes.string,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnKey: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
};
