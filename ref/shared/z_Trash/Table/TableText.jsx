/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { useCell } from './model';
import { useCellEdit } from './model/context/CellEditContext';

export const TableText = ({
  cellId,
  editable = true,
  children,
  onKeyDown,
  onBlur,
  onChange,
  ...props
}) => {
  // Пытаемся получить контекст редактирования
  const cellEditContext = useCellEdit();

  // Используем хук только если cellId предоставлен
  const cellHook = cellId ? useCell(cellId) : null;

  // Определяем финальное состояние editable
  const isEditable = editable || (cellHook?.tableTextProps?.editable);
  // console.log(' [TableText] isEditable', isEditable);

  // Объединяем обработчики событий
  const handleKeyDown = (e) => {
    if (cellHook?.tableTextProps?.onKeyDown) {
      cellHook.tableTextProps.onKeyDown(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleBlur = (e) => {
    if (cellHook?.tableTextProps?.onBlur) {
      cellHook.tableTextProps.onBlur(e);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Content className='table-text-content'>
      <Text
        editable={isEditable}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      >
        {children}
      </Text>
    </Content>
  );
};

TableText.propTypes = {
  cellId: PropTypes.string,
  editable: PropTypes.bool,
  children: PropTypes.node,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
