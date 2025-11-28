/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Text } from '../Text';
import { useTable } from './model';
import { Checkbox } from '../Checkbox';
import { TableRow } from './TableRow';
import { ArrowWithLegDownIcon, ArrowWithLegUpIcon, ArrowUpDownIcon } from '../../assets/icons';


export const TableHead = React.forwardRef(({
  children,
  showSelectAll = true,
  ...props
}, ref) => {
  const theme = useTheme();
  const {
    columns,
    config,
    checkedRows: { checkAllRows, clearCheckedRows, isAllChecked, hasChecked },
  } = useTable();

  const handleSelectAllChange = () => {
    if (isAllChecked || hasChecked) {
      clearCheckedRows();
    } else {
      checkAllRows();
    }
  };

  return (
    <StyledTableHead ref={ref} className='table-head' {...props}>
      <TableRow
        rowId="table-header-row"
        divider={false}
        checkable={false}
        {...props}
      >
        {(children || columns).map((column) => {
          if (column.key === '__select') {
            return (
              <TableHeadCell
                column={column}
                theme={theme}
              >
                <Checkbox
                  checked={isAllChecked}
                  onChange={handleSelectAllChange}
                  indeterminate={hasChecked && !isAllChecked}
                />
              </TableHeadCell>
            );
          }

          return (
            <TableHeadCell
              key={column.key}
              column={column}
              theme={theme}
            />
          );
        })}
      </TableRow>
    </StyledTableHead>
  );
});

const TableHeadCell = ({ column, theme, children }) => {

  const [isHovered, setHovered] = useState(false);
  const { config, sorting: { sortBy, isSortedBy, getSortDirection } } = useTable();


  const isSorted = isSortedBy(column.key);
  const sortDirection = getSortDirection(column.key);
  const isSortable = config.sortable && column.sortable !== false;

  const handleSort = () => {
    if (isSortable) {
      sortBy(column.key);
    }
  };

  return (
    <StyledHeaderCell
      theme={theme}
      width={column.width}
      minWidth={column.minWidth}
      onClick={handleSort}
      sortable={isSortable}
      sorted={isSorted}
      isHovered={isHovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children ? children :
        <StyledHeaderContent>
          <Text weight='bold'>{column.title || column.key}</Text>
          {isSortable && (isSorted || isHovered) && (
            <>
              {!isSorted && isHovered
                ? <ArrowUpDownIcon />
                : sortDirection === 'asc'
                  ? <ArrowWithLegUpIcon />
                  : <ArrowWithLegDownIcon />
              }
            </>
          )}
        </StyledHeaderContent>
      }
    </StyledHeaderCell>
  );
};

const StyledTableHead = styled.thead`
    border-bottom: 2px solid ${({ theme }) => theme.sys.color.outline.default};
    position: sticky;
    top: 0;
    z-index: 1;
`;

const StyledHeaderCell = styled.th`
    padding: 0 16px;
    text-align: left;
    font-weight: 600;
    border: 2px solid transparent;
    color: ${({ theme }) => theme.comp.table.headCell.default.text};
    
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    min-width: ${({ minWidth }) => typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    
    cursor: ${({ sortable }) => sortable ? 'pointer' : 'default'};
    user-select: none;

    ${({ sorted, theme }) => sorted && `
        background-color: ${theme.comp.table.sortable.hovered.background};
    `}
`;

const StyledHeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

TableHead.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sortable: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  showSelectAll: PropTypes.bool,
};
