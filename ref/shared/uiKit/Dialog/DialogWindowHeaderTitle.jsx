import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

export const DialogTitle = ({ children }) => {
  const theme = useTheme();

  return (
    <StyledDialogTitle
      color={theme.sys.typography.color.primary}
      theme={theme}
    >
      {children}
    </StyledDialogTitle>
  );
};

const StyledDialogTitle = styled.p`
    color: ${({ color }) => color};
    font-size: ${({ theme }) => theme.sys.typography.body.xsmall.fontSize};
    font-weight: ${({ theme }) => theme.sys.typography.weight.bold};
`;

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
