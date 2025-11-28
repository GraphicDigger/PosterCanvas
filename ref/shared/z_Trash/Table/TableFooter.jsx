/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../../app/providers';

const StyledTableFooter = styled.tfoot`
    display: flex;
`;

export const TableFooter = React.forwardRef(({ children }, ref) => {
  return (
    <StyledTableFooter ref={ref}>
      {children}
    </StyledTableFooter>
  );
});

TableFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
