/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const Empty = memo(({ className, height = 'fit-content' }) => {
  return <StyledEmpty className={className} height={height} />;
});

const StyledEmpty = styled.div`
    background-color: rgba(151, 71, 255, 0.1);
    border: 1px dashed rgba(151, 71, 255);
    width: 100%;
    height: ${({ height }) => height || '100%'}; 
    min-height: 28px;
`;

Empty.propTypes = {
  className: PropTypes.string,
};

