import React from 'react';
import styled from '@emotion/styled';
import { typography } from '../../styles';
import { useTheme } from '@emotion/react';

export const CardSubtitle = ({ children }) => {
  const theme = useTheme();

  return (
    <StyledBody theme={theme} size={theme.sys.typography.body.xsmall}>
      {children || 'Body text'}
    </StyledBody>
  );
};

const StyledBody = styled.p(({ size, theme }) => ({
  ...size,
  color: theme.sys.typography.color.secondary,
}));

