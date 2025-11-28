/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from './model';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { Checkbox } from '../Checkbox';

export const TableBody = React.forwardRef(({
  children,
  renderRow,
  renderCell,
  ...props
}, ref) => {

  const { data, columns, config, sorting: { sortedData } } = useTable();

  if (children) {
    return (
      <StyledTableBody ref={ref} className='table-body' {...props}>
        {children}
      </StyledTableBody>
    );
  }

  const dataToRender = config.sortable ? sortedData : data;

  return (
    <StyledTableBody
      ref={ref}
      className='table-body'
      {...props}
    >
      {dataToRender.map((rowData, rowIndex) => {

        const rowId = rowData.id || rowIndex;

        if (renderRow) {return renderRow(rowData, rowIndex, rowId);}

        return (
          <TableRow
            key={rowId}
            rowId={rowId}
            data={rowData}
            onClick={config.onRowClick}
            {...props}
          >
            {columns.map((column) => {
              const cellId = `${rowId}-${column.key}`;
              const cellValue = rowData[column.key];

              if (column.key === '__select') {
                return (
                  <TableCell
                    key={column.key}
                    cellId={cellId}
                    rowId={rowId}
                    columnKey={column.key}
                    width={column.width}
                    minWidth={column.minWidth}
                    onClick={e => e.stopPropagation()}
                  >
                    <SelectCheckbox rowId={rowId} />
                  </TableCell>
                );
              }

              if (renderCell) {return renderCell(cellValue, rowData, column, cellId, rowId);}

              if (column.cell) {
                const Component = column.cell;
                return (
                  <TableCell
                    key={column.key}
                    cellId={cellId}
                    rowId={rowId}
                    columnKey={column.key}
                    width={column.width}
                    minWidth={column.minWidth}
                    onClick={column.onClick}
                    rowData={rowData}
                  >
                    <Component
                      value={cellValue}
                      rowData={rowData}
                    />
                  </TableCell>
                );
              }

              if (column.render) {
                return (
                  <TableCell
                    key={column.key}
                    cellId={cellId}
                    rowId={rowId}
                    columnKey={column.key}
                    width={column.width}
                    minWidth={column.minWidth}
                    onClick={column.onClick}
                    rowData={rowData}
                  >
                    {column.render(cellValue, rowData, rowIndex)}
                  </TableCell>
                );
              }

              return (
                <TableCell
                  key={column.key}
                  cellId={cellId}
                  rowId={rowId}
                  columnKey={column.key}
                  width={column.width}
                  minWidth={column.minWidth}
                  onClick={column.onClick}
                  rowData={rowData}
                >
                  {cellValue}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </StyledTableBody>
  );
});

const SelectCheckbox = ({ rowId }) => {
  const { checkedRows: { isRowChecked, checkRow } } = useTable();
  const handleChange = (checked) => {
    checkRow(rowId);
  };
  return (
    <Checkbox
      checked={isRowChecked(rowId)}
      onChange={handleChange}
    />
  );
};

const StyledTableBody = styled.tbody`
    /* Стили для тела таблицы */
`;

TableBody.propTypes = {
  children: PropTypes.node,
  renderRow: PropTypes.func,
  renderCell: PropTypes.func,
};
