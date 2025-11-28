/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const FullScreenWrapper = memo(({ children, className }) => {
  return (
    <StyledFullScreenWrapper className={className}>
      {children}
    </StyledFullScreenWrapper>
  );
});

const StyledFullScreenWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: space-between;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
`;

FullScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FullScreenWrapper.displayName = 'FullScreenWrapper';
