/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { textColorsMode } from '../../../styles';

export const Label = ({
  children,
  htmlFor,
  color = 'secondary',
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledLabel
      htmlFor={htmlFor}
      theme={theme}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
    display: block;
    flex: 1;
    color: ${({ theme }) => theme.sys.typography.color.secondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  color: PropTypes.string,
};
