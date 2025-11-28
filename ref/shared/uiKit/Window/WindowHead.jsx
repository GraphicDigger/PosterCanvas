/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';
import { Divider } from '../Divider';
import { WindowTitle } from './WindowTitle';
import { Box } from '../Box';


export const WindowHead = ({
  children,
  padding = 4,
  paddingLeft = 8,
  paddingRight,
}) => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledHead
        padding={padding}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
      >
        {children ? children :
          <>
            <WindowTitle> Window Head </WindowTitle>
            <Box height={14} />
          </>
        }
      </StyledHead>
      <Divider bottom left={0} color={theme.sys.color.outline.default} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    position: relative;
`;

const StyledHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: ${({ padding }) => typeof padding === 'number' ? `${padding * 2}px` : padding};
    padding-left: ${({ paddingLeft }) => typeof paddingLeft === 'number' ? `${paddingLeft * 2}px` : paddingLeft};
    
    ${({ paddingRight }) => paddingRight && css`
        padding-right: ${paddingRight * 2}px;
    `}
`;

WindowHead.propTypes = {
  children: PropTypes.node,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
};
