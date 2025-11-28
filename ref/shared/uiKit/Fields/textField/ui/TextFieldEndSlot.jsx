import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const EndSlot = memo(({ children }) => (
  <StyledSlot>
    {children}
  </StyledSlot>
));

const StyledSlot = styled.div`
    display: flex;
    align-items: center;
`;

EndSlot.propTypes = { children: PropTypes.node };
