import React from 'react';
import styled from '@emotion/styled';
import { DetailHeader } from './header';
import { DetailContent } from './content';

export const GlobalSearchResultDetail = () => {
  return (
    <StyledContainer>
      <DetailHeader />
      <DetailContent />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
