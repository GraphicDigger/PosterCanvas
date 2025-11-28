/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useComponents } from '@/entities/uiComponent';

export const Artboard = ({
  children,
  className,
}) => {

  const { selectedComponent } = useComponents();
  const { artboard } = selectedComponent;

  return (
    <StyledArtboard className={className} style={artboard}>
      {children}
    </StyledArtboard>
  );
};

const StyledArtboard = styled.div`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'};
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
    justify-content: ${({ justifyContent }) => justifyContent || 'center'};
    padding: ${({ padding }) => padding || '0'};
`;
