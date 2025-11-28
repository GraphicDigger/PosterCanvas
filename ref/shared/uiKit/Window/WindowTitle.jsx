/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';


export const WindowTitle = ({ children }) => {

  const theme = useTheme();

  return (
    <StyledText theme={theme}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.p`
    line-height: ${({ theme }) => theme.ref.font.lineHeight100};
    font-weight: ${({ theme }) => theme.ref.font.weightBold};
    color: ${({ theme }) => theme.sys.typography.color.primary};
`;
