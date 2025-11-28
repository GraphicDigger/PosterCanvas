/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { surfaceColors, textColorsMode, lineColors } from '../../styles';

export const Message = memo(({
  children,
  fill,
  border,
  align = 'left',
  maxWidth,
  ...props
}) => {
  const theme = useTheme();
  const alignSelf = align === 'left' ? 'flex-start' : 'flex-end';

  return (
    <StyledContainer
      alignSelf={alignSelf}
      fill={fill}
      border={border}
      maxWidth={maxWidth}
      theme={theme}
      {...props}
    >
      {children}
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
    font-size: ${({ theme }) => theme.sys.typography.body.small.fontSize};
    line-height: ${({ theme }) => theme.sys.typography.body.small.lineHeight};
    font-weight: ${({ theme }) => theme.sys.typography.body.small.fontWeight};
    display: flex;
    padding: ${({ fill, border }) => fill || border ? '8px 12px' : '0px'};
    background-color: ${({ theme, fill }) => theme.sys.color.surfaceContainer.lowest};
    align-self: ${({ alignSelf }) => alignSelf};
    color: ${({ theme }) => theme.sys.typography.color.primary};
    border-radius: 8px;
    border: ${({ theme, border }) => border ? `1px solid ${theme.sys.color.outline.default}` : 'transparent'};
    max-width: ${({ maxWidth }) => typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
    white-space: pre-wrap;
`;
