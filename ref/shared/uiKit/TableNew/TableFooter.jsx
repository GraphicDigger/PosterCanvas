/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import { useTable } from './model';

export const TableFooter = React.forwardRef(({
  children,
  showSummary = false,
  showSelection = false,
  ...props
}, ref) => {
  const theme = useTheme();
  const {
    data,
    selection: { selectedCount, hasSelection },
  } = useTable();

  return (
    <StyledTableFooter
      ref={ref}
      className='table-footer'
      theme={theme}
      {...props}
    >
      <FooterContent>
        {/* Информация о выборе */}
        {showSelection && hasSelection && (
          <SelectionInfo>
            {selectedCount} из {data.length} строк выбрано
          </SelectionInfo>
        )}

        {/* Общая информация */}
        {showSummary && !hasSelection && (
          <SummaryInfo>
                        Всего строк: {data.length}
          </SummaryInfo>
        )}

        {/* Пользовательский контент */}
        {children}
      </FooterContent>
    </StyledTableFooter>
  );
});

const StyledTableFooter = styled.tfoot`
    background-color: ${({ theme }) => theme.comp.table.header.background};
    border-top: 1px solid ${({ theme }) => theme.comp.table.header.border};
`;

const FooterContent = styled.tr`
    td {
        padding: 12px 16px;
        color: ${({ theme }) => theme.comp.table.header.text};
        font-size: 14px;
    }
`;

const SelectionInfo = styled.td`
    font-weight: 500;
    color: ${({ theme }) => theme.comp.table.cell.focused};
`;

const SummaryInfo = styled.td`
    font-style: italic;
    opacity: 0.8;
`;

TableFooter.propTypes = {
  children: PropTypes.node,
  showSummary: PropTypes.bool,
  showSelection: PropTypes.bool,
};
