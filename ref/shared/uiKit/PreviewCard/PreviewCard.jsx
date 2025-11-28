/** @jsxImportSource @emotion/react */
import React, { memo, useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { surfaceColors } from '../../styles';
import { Text } from '../Text';
import { Empty } from '../Empty';
import { PreviewCardTopTitle } from './PreviewCardTitle';
import { PreviewCardBottomTitle } from './PreviewCardTitle';
import { PreviewCardContent } from './PreviewCardContent';


export const PreviewCard = ({
  children,
  onClick,
  transparent = false,
  className,
  aspectRatio = '1.6',
  borderRadius = 16,
  padding = 0,
  gap = 16,
}) => {
  const theme = useTheme();

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const slots = useMemo(() => {
    const result = {
      topTitle: null,
      bottomTitle: null,
      content: null,
    };

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {return;}

      if (child.type === PreviewCardTopTitle) {result.topTitle = child;}
      if (child.type === PreviewCardContent) {result.content = child;}
      if (child.type === PreviewCardBottomTitle) {result.bottomTitle = child;}
    });

    return result;
  }, [children]);

  return (
    <StyledContainer onClick={handleClick}>

      {slots.topTitle}

      <StyledPreview
        aspectRatio={aspectRatio}
        padding={padding}
        gap={gap}
        theme={theme}
        transparent={transparent}
      >
        {slots.content || <Empty />}
      </StyledPreview>

      {slots.bottomTitle}

    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    cursor: pointer;
    `;

const StyledPreview = styled.div`
    padding: ${({ padding }) => padding}px;
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
    gap: ${({ gap }) => gap}px;
    background-color: ${({ theme, transparent }) => transparent ? 'transparent' : theme.sys.color.surfaceContainer.low};
    overflow: hidden;
`;

PreviewCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
  borderRadius: PropTypes.number,
  padding: PropTypes.number,
  gap: PropTypes.number,
};

PreviewCard.displayName = 'PreviewCard';
