/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '../Box';
import { Stack } from '../Stack';

export const SectionPanelHeader = ({
  children,
  paddingVertical = 5,
  paddingHorizontal = 8,
  paddingLeft,
  paddingRight,
}) => {
  return (
    <HeaderContainer
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      className='section-panel-header'
    >
      <Box height={14} />
      <Stack direction='row' align='center' justify='space-between'>
        {children}
      </Stack>

    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-top: ${({ paddingVertical }) => typeof paddingVertical === 'number' ? `${paddingVertical * 2}px` : paddingVertical};
    padding-bottom: ${({ paddingVertical }) => typeof paddingVertical === 'number' ? `${paddingVertical * 2}px` : paddingVertical};
    padding-left: ${({ paddingHorizontal, paddingLeft }) => typeof paddingLeft === 'number' ? `${paddingLeft * 2}px` : paddingLeft || `${paddingHorizontal * 2}px`};
    padding-right: ${({ paddingHorizontal, paddingRight }) => typeof paddingRight === 'number' ? `${paddingRight * 2}px` : paddingRight || `${paddingHorizontal * 2}px`};

`;

SectionPanelHeader.propTypes = {
  children: PropTypes.node,
};

