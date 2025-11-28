/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

export const SectionPanelName = ({
  children,
  size = 'small',
}) => {
  const theme = useTheme();

  return (
    <StyledSectionPanelName
      className='section-panel-name'
      color={theme.sys.typography.color.primary}
      theme={theme}
      size={size}
    >
      {children || 'Section'}
    </StyledSectionPanelName>
  );
};

const StyledSectionPanelName = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ color }) => color};
    ${({ size, theme }) => {
    switch (size) {
    case 'medium':
      return css`
              font-size: ${theme.sys.typography.heading.xsmall.fontSize};
              font-weight: ${theme.ref.font.weightBold};
            `;
    case 'small':
    default:
      return css`
              font-size: ${theme.sys.typography.body.xsmall.fontSize};
              font-weight: ${theme.ref.font.weightBold};
            `;
    }
  }}
`;

SectionPanelName.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  typographyStyle: PropTypes.string, // Имя стиля из typography.js
};

