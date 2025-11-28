/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../../app/providers';


export const TableHead = React.forwardRef(({
  children,
  width = '100%',
  minWidth,
}, ref) => {

  return (
    <StyledTableHead
      ref={ref}
      className='table-head fw-bd'
      width={width}
      minWidth={minWidth}
    >
      {children}
    </StyledTableHead>
  );
});

const StyledTableHead = styled.thead`
    display: flex;
    padding: 0 16px;
    align-items: center;
    width: ${({ width }) => typeof width === 'number' ? `${width}px` : width};
    min-width: ${({ minWidth }) => typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
    height: 100%;

`;

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};
