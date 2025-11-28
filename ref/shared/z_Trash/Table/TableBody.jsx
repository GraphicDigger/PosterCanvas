/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../../app/providers';

const StyledTableBody = styled.tbody`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TableBody = React.forwardRef(({ children }, ref) => {
  return (
    <StyledTableBody ref={ref} className='table-body'>
      {children}
    </StyledTableBody>
  );
});

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};
