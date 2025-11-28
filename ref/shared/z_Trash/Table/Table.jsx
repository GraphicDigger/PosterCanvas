/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { CellEditProvider } from './model';

export const Table = React.forwardRef(({
  children,
  scrollable = true,
  width = '100%',
  maxWidth,
  ...props
}, ref) => {
  return (
    <CellEditProvider>
      <TableWrapper
        ref={ref}
        className='table'
        $scrollable={scrollable}
        $maxWidth={maxWidth}
        $width={width}
      >
        <TableContent ref={ref}>
          {children}
        </TableContent>
      </TableWrapper>
    </CellEditProvider>
  );
});

const TableWrapper = styled.div`
    position: relative;
    width:  ${({ $width }) => typeof $width === 'number' ? `${$width}px` : $width};
    max-width: ${({ $maxWidth }) => typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth};
    overflow: ${({ $scrollable }) => $scrollable ? 'auto' : 'hidden'};
`;

const TableContent = styled.table`
    width: 100%;
`;

Table.propTypes = {
  children: PropTypes.node.isRequired,
  scrollable: PropTypes.bool,
  maxWidth: PropTypes.number,
};
