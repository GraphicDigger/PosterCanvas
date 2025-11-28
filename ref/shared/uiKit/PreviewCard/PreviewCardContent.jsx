/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export const PreviewCardContent = ({
  children,
  full = false,
  fitHeight = false,
  fitWidth = false,
  alignItems = 'center',
  justifyContent = 'center',
  className,
}) => {
  return (
    <StyledContent
      fitHeight={fitHeight}
      fitWidth={fitWidth}
      full={full}
      alignItems={alignItems}
      justifyContent={justifyContent}
      className={className}
    >
      {children}
    </StyledContent>
  );
};

const StyledContent = styled.div`
    display: flex;
    
    ${({ fitHeight, fitWidth, full, alignItems, justifyContent }) => css`
        ${full && css`
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        `}
        
        ${!full && css`
            align-items: ${alignItems};
            justify-content: ${justifyContent};
        `}
        
        ${fitHeight && css`
            height: 100%;
        `}
        
        ${fitWidth && css`
            width: 100%;
        `}
        
        ${fitHeight && fitWidth && css`
            width: 100%;
            height: 100%;
        `}
    `}
`;

PreviewCardContent.propTypes = {
  children: PropTypes.node,
  fitHeight: PropTypes.bool,
  fitWidth: PropTypes.bool,
  full: PropTypes.bool,
  alignItems: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ]),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  className: PropTypes.string,
};
