import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '../../../Box';

export const StartSlot = memo(({ children }) => (
  <StyledSlot>
    <Box css={{ width: '16px', height: '16px' }}>
      {children}
    </Box>
  </StyledSlot>
));

const StyledSlot = styled.div`
    display: flex;
    align-items: center;
`;

StartSlot.propTypes = { children: PropTypes.node };
