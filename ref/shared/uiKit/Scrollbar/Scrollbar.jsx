import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Box } from '../Box';

export const Scrollbar = ({
  children,
  spacing = 28,
  scrollToBottom = false,
  width = 'fill',
  height = 'fill',
  ...props
}) => {
  const scrollRef = useRef(null);

  // Эффект для прокрутки к нужной позиции
  useEffect(() => {
    if (!scrollRef.current) {return;}

    // Прокручиваем вниз если scrollToBottom = true
    if (scrollToBottom) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      scrollRef.current.scrollTop = 0;
    }
  }, [scrollToBottom]);

  return (
    <StyledScrollbar
      ref={scrollRef}
      spacing={spacing}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledScrollbar>
  );
};

const StyledScrollbar = styled.div`
    display: flex;
    flex-direction: column;
        width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    if (width === 'fill') { return '100%'; }
    if (width === 'fit') { return 'max-content'; }
    return width;
  }};
    height: ${({ height }) => {
    if (typeof height === 'number') { return `${height}px`; }
    if (height === 'fill') { return '100%'; }
    if (height === 'fit') { return 'max-content'; }
    return height;
  }};
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: ${({ spacing }) => spacing}px;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
