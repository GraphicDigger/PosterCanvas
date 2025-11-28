/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Empty } from '../Empty';

export const PreviewCardList = memo(({
  children,
  minCardWidth = 172,
  gap = 16,
  columns,
  className,
}) => {
  return (
    <StyledPreviewCardList
      className={className}
      $minCardWidth={minCardWidth}
      $columns={columns}
      $gap={gap}
    >
      {children || <Empty />}
    </StyledPreviewCardList>
  );
});

const StyledPreviewCardList = styled.div`
    display: grid;
    grid-template-columns: ${({ $columns, $minCardWidth }) =>
    $columns
      ? `repeat(${$columns}, 1fr)`
      : `repeat(auto-fit, minmax(${$minCardWidth}px, 1fr))`};
    gap: ${({ $gap }) => $gap}px;
    padding: 12px 16px;
    min-width: fit-content;
    resize: horizontal;
`;

PreviewCardList.propTypes = {
  children: PropTypes.node,
  minCardWidth: PropTypes.number,
  columns: PropTypes.number,
  gap: PropTypes.number,
  className: PropTypes.string,
};

