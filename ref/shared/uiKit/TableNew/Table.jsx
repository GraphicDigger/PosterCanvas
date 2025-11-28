/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableProvider } from './model';
import { useTheme } from '@emotion/react';
import { Stack } from '../Stack';

export const Table = React.forwardRef(({
  children,
  data = [],
  columns = [],

  // Функциональность
  sortable = false,
  checkable = false,
  editable = false,
  virtualized = false,

  // Callbacks
  onRowHover,
  onRowFocus,
  onRowClick,
  isRowHovered,
  isRowFocused,
  isRowSelected,

  onRowCheck,

  onSort,
  onEdit,

  // Внешний вид
  scrollable = true,
  width = '100%',
  maxWidth,

  // Состояния
  loading = false,
  error = null,
  emptyMessage = 'No data available',

  ...props
}, ref) => {

  const theme = useTheme();

  const tableConfig = useMemo(() => ({
    sortable,
    checkable,
    editable,
    virtualized,
    onRowHover,
    onRowFocus,
    onRowClick,
    isRowHovered,
    isRowFocused,
    isRowSelected,

    onRowCheck,
    onSort,
    onEdit,
  }), [
    sortable,
    checkable,
    editable,
    virtualized,
    onRowClick,
    onRowHover,
    onRowFocus,
    isRowHovered,
    isRowFocused,
    isRowSelected,
    onRowCheck,
    onSort,
    onEdit,
  ]);

  return (
    <TableProvider config={tableConfig} data={data} columns={columns}>
      <TableWrapper
        ref={ref}
        className='table-new'
        $scrollable={scrollable}
        $maxWidth={maxWidth}
        $width={width}
        {...props}
      >
        {loading && (
          <LoadingOverlay>
            <div>Loading...</div>
          </LoadingOverlay>
        )}

        {error && (
          <ErrorMessage>
            {typeof error === 'string' ? error : 'An error occurred'}
          </ErrorMessage>
        )}

        {!loading && !error && data.length > 0 && (
          <TableContent>
            {children}
          </TableContent>
        )}

      </TableWrapper>

      {!loading && !error && data.length === 0 && (
        <StyledEmptyContainer>
          <StyledEmptyWindow theme={theme}>
            <Stack
              justify='center'
              align='center'
              gap={4}
            >
              {emptyMessage}
            </Stack>
          </StyledEmptyWindow>
        </StyledEmptyContainer>
      )}
    </TableProvider>
  );
});

const TableWrapper = styled.div`
    position: relative;
    width: ${({ $width }) => typeof $width === 'number' ? `${$width}px` : $width};
    max-width: ${({ $maxWidth }) => typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth};
    overflow: ${({ $scrollable }) => $scrollable ? 'auto' : 'hidden'};
`;

const TableContent = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: auto; 
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    min-height: 200px;
`;

const ErrorMessage = styled.div`
    padding: 40px 20px;
    text-align: center;
    color: ${({ theme }) => theme?.colors?.error || '#dc3545'};
    background: ${({ theme }) => theme?.colors?.errorBackground || '#fef2f2'};
    border-radius: 4px;
    margin: 20px;
`;

const StyledEmptyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledEmptyWindow = styled.div`
    padding: 40px 60px;
    border-radius: ${({ theme }) => theme.ref.borderRadius.large};
    overflow: hidden;
    background-color: ${({ theme }) => theme.sys.color.surfaceContainer.low};
`;

Table.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.array,
  columns: PropTypes.array,

  // Функциональность
  sortable: PropTypes.bool,
  checkable: PropTypes.bool,
  editable: PropTypes.bool,
  virtualized: PropTypes.bool,

  // Callbacks
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,

  // Внешний вид
  scrollable: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Состояния
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  emptyMessage: PropTypes.string,
};
