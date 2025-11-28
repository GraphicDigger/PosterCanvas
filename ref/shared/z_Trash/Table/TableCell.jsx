/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '../../../app/providers';
import { useCell } from './model';

export const TableCell = React.forwardRef(({
  cellId,
  children,
  editable = true,
  align,
  width = '100%',
  minWidth,
  onClick,
  onDoubleClick,
  focused,
}, ref) => {
  const { theme } = useTheme();

  // Используем хук только если cellId предоставлен и editable = true
  const cellHook = cellId && editable ? useCell(cellId) : null;

  // Объединяем обработчики событий
  const handleDoubleClick = (e) => {
    // console.log(' [TableCell] handleDoubleClick', cellHook);
    if (cellHook?.tableCellProps?.onDoubleClick) {
      cellHook.tableCellProps.onDoubleClick(e);
    }
    if (onDoubleClick) {
      onDoubleClick(e);
    }
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Определяем финальное состояние focused
  const isFocused = focused || (cellHook?.tableCellProps?.focused);

  return (
    <StyledCell
      ref={ref}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      focused={isFocused}
      theme={theme}
      tabIndex={0}
      className='table-cell'
      align={align}
      width={width}
      minWidth={minWidth}
    >
      {children}
    </StyledCell>
  );
});

const StyledCell = styled.td`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: ${({ align }) => {
    switch (align) {
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'left':
    default:
      return 'flex-start';
    }
  }};
    padding: 0 16px;
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    min-width: ${({ minWidth }) => typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    height: 100%;
    cursor: pointer;
    border: 1px solid red;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  cellId: PropTypes.string,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  focused: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
