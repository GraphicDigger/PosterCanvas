/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { memo, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { useTable } from './model';

export const TableRow = memo(React.forwardRef(({
  children,
  rowId,
  data,
  size = 'medium',
  divider = true,
  checkable,
  onClick,
  ...props
}, ref) => {
  const theme = useTheme();
  const {
    state,
    dispatch,
    config,
    checkedRows: { isRowChecked },
    editing: { isRowEditing },
    rowState: {
      isRowHovered,
      isRowFocused,
      isRowSelected,
      setRowHovered,
      setRowFocused,
    },
  } = useTable();

  const isHovered = useMemo(() => isRowHovered(rowId), [isRowHovered, rowId]);
  const isFocused = useMemo(() => isRowFocused(rowId), [isRowFocused, rowId]);
  const isSelected = useMemo(() => isRowSelected(rowId), [isRowSelected, rowId]);

  const isChecked = useMemo(() => isRowChecked(rowId), [isRowChecked, rowId]);
  const isEditing = useMemo(() => isRowEditing(rowId), [isRowEditing, rowId]);
  const isCheckable = checkable !== undefined ? checkable : config.checkable;

  const handleClick = (e) => {
    if (onClick) {onClick(rowId);}

    // Останавливаем всплытие только если обработали событие
    if (onClick || (isCheckable && !isEditing)) {
      e.stopPropagation();
    }
  };

  const handleMouseEnter = () => {
    setRowHovered(rowId);
  };

  const handleMouseLeave = () => {
    setRowHovered(null);
  };

  const handleFocus = () => {
    setRowFocused(rowId);
  };

  const handleBlur = () => {
    setRowFocused(null);
  };

  return (
    <StyledTableRow
      ref={ref}
      className='table-row'
      size={size}
      theme={theme}

      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isSelected={isSelected}
      isHovered={isHovered}
      isEditing={isEditing}
      isCheckable={isCheckable}
      isChecked={isChecked}

      {...props}
    >
      {children}
      {divider && <Divider bottom />}
    </StyledTableRow>
  );
}));

const StyledTableRow = styled.tr`
    position: relative;
    font-size: ${({ theme, size }) => {
    switch (size) {
    case 'small':
      return theme.sys.typography.body.xsmall.fontSize;
    case 'medium':
      return theme.sys.typography.body.small.fontSize;
    case 'large':
      return theme.sys.typography.body.medium.fontSize;
    default:
      return theme.sys.typography.body.xsmall.fontSize;
    }
  }};
    height: ${({ theme, size }) => theme.ref.control.height[size]};
    cursor: ${({ isCheckable }) => isCheckable ? 'pointer' : 'default'};
    transition: background-color 0.2s ease;
    
    background-color: ${({ theme, isSelected, isHovered, isEditing, isChecked }) => {
    if (isHovered) {return theme.comp.table.row.hovered.background;}
    if (isSelected || isChecked) {return theme.comp.table.row.selected.background;}
    if (isEditing) {return theme.comp.table.row.focused.background;}
    return theme.comp.table.row.default.background;
  }};
`;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  divider: PropTypes.bool,
  checkable: PropTypes.bool,
  onClick: PropTypes.func,
};
