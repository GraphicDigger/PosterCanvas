/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useTable } from './model';

export const TableCell = React.forwardRef(({
  cellId,
  rowId,
  columnKey,
  children,
  editable: editableOverride,
  align = 'left',
  width = '100%',
  minWidth,
  onClick,
  onDoubleClick,
  rowData,
  ...props
}, ref) => {
  const theme = useTheme();
  const {
    config,
    editing: {
      startEditing,
      stopEditing,
      isEditing,
      isCellFocused,
      focusCell,
      blurCell,
    },
  } = useTable();

  const isEditMode = isEditing(cellId);
  const isFocused = isCellFocused(cellId);
  const isEditable = editableOverride !== undefined ? editableOverride : config.editable;

  const handleClick = (e) => {
    // Если есть внешний обработчик клика, вызываем его и останавливаем всплытие
    if (onClick) {
      onClick(e, rowData);
      focusCell(cellId, rowId, columnKey);
      e.stopPropagation();
      return;
    }

    // Запускаем редактирование при клике на ячейку
    if (isEditable && cellId && rowId && columnKey) {
      startEditing(cellId, rowId, columnKey);
    } else if (cellId && rowId && columnKey) {
      // Если ячейка не редактируемая, просто устанавливаем фокус
      focusCell(cellId, rowId, columnKey);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();

    // Начинаем редактирование при двойном клике
    if (isEditable && cellId && rowId && columnKey) {
      startEditing(cellId, rowId, columnKey);
    }

    if (onDoubleClick) {
      onDoubleClick(e);
    }
  };

  const handleKeyDown = (e) => {
    // Обработка клавиш делегируется TableText
  };

  const handleBlur = (e) => {
    blurCell();
  };

  return (
    <StyledCell
      ref={ref}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}

      isFocused={isFocused}
      isEditing={isEditMode}
      isEditable={isEditable}
      theme={theme}
      align={align}
      width={width}
      minWidth={minWidth}

      tabIndex={isEditable ? 0 : -1}
      className='table-cell'

      {...props}
    >
      {children}
    </StyledCell>
  );
});

const StyledCell = styled.td`
    display: table-cell;
    align-items: center;
    vertical-align: middle;
    padding: 0 16px;
    
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    min-width: ${({ minWidth }) => typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    
    text-align: ${({ align }) => align};
    cursor: pointer;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    border:  2px solid transparent;
    
    ${({ isFocused, theme }) => isFocused && `
        border-color: ${theme.comp.table.cell.focused.border};
    `}
    
    ${({ isEditing, theme }) => isEditing && `
        border-color: ${theme.comp.table.cell.focused.border};
    `}
`;

TableCell.propTypes = {
  cellId: PropTypes.string,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnKey: PropTypes.string,
  children: PropTypes.node.isRequired,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  rowData: PropTypes.object,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
