import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { typography } from '../../styles';
import { useTheme } from '@emotion/react';


export const CardTitle = ({
  children,
  size,
}) => {
  const theme = useTheme();
  const textSize = size === 'medium' ? 'small' : 'xsmall';

  return (
    <StyledTitle
      theme={theme}
      size={textSize}>
      {children || 'Title'}
    </StyledTitle>
  );
};

const StyledTitle = styled.p(({ size, theme }) => ({
  fontSize: theme.sys.typography.body[size].fontSize,
  color: theme.sys.typography.color.primary,
  fontWeight: theme.sys.typography.weight.bold,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
