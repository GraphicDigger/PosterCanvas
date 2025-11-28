/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

export const Pagination = memo(({
  total = 2,
  current = 0,
  onChange,
}) => {
  const theme = useTheme();
  const dots = Array.from({ length: total }, (_, i) => i);

  return (
    <StyledContainer>
      {dots.map((index) => (
        <StyledDot
          key={index}
          active={index === current}
          onClick={() => onChange?.(index)}
          theme={theme}
        />
      ))}
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const StyledDot = styled.button`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: ${({ active, theme }) =>
    active
      ? theme.sys.typography.color.primary
      : theme.sys.typography.color.disabled
};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme, active }) =>
    active
      ? theme.sys.typography.color.primary
      : theme.sys.typography.color.disabled
};
    }
`;

Pagination.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  onChange: PropTypes.func,
};
