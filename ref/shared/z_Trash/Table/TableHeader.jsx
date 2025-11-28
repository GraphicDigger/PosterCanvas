/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../../app/providers';

const StyledTableHeader = styled.thead`
    display: flex;
    width: 100%;
`;

export const TableHeader = React.forwardRef(({ children }, ref) => {
  return (
    <StyledTableHeader ref={ref} className='table-header'>
      {children}
    </StyledTableHeader>
  );
});

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
