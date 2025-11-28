import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';


export const PreviewCardTopTitle = ({ children, align = 'left' }) => {

  const theme = useTheme();
  return (
    <StyledTopTitle align={align} theme={theme}>
      {children || 'Title'}
    </StyledTopTitle>
  );
};

export const PreviewCardBottomTitle = ({ children, align = 'left' }) => {
  const theme = useTheme();
  return (
    <StyledBottomTitle align={align} theme={theme}>
      {children || 'Title'}
    </StyledBottomTitle>
  );
};

const StyledTopTitle = styled.p`
    text-align: ${({ align }) => align};
    color: ${({ theme }) => theme.sys.typography.color.primary};
`;

const StyledBottomTitle = styled.p`
    text-align: ${({ align }) => align};
    color: ${({ theme }) => theme.sys.typography.color.primary};
`;


PreviewCardTopTitle.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

PreviewCardBottomTitle.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};
