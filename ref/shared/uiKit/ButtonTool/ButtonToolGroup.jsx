/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

export const ButtonToolGroup = ({ children, fill = true }) => {

  const theme = useTheme();

  return (
    <StyledButtonToolGroup $fill={fill} theme={theme}>
      {children}
    </StyledButtonToolGroup>
  );
};

const StyledButtonToolGroup = styled.div`
    display: flex;
    background-color: ${({ $fill, theme }) => $fill ? theme.sys.color.surfaceContainer.low : 'transparent'};
    padding: 0;
    border-radius: 8px;
`;

ButtonToolGroup.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.bool,
};
