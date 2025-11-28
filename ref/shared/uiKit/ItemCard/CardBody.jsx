import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { typography } from '../../styles';
import { useTheme } from '@emotion/react';

export const CardBody = ({ children, size }) => {

  const theme = useTheme();
  const textSize = size === 'medium' ? 'small' : 'xsmall';

  return (
    <StyledBody theme={theme} size={theme.sys.typography.body[textSize]}>
      {children || 'Body text'}
    </StyledBody>
  );
};

const StyledBody = styled.p(({ size, theme }) => ({
  ...size,
  color: theme.sys.typography.color.primary,
}));

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
};
