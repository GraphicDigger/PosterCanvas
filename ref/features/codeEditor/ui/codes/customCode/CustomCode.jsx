/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


export const CustomCode = ({ code }) => {
  return (
    <StyledPre>
      {code?.content}
    </StyledPre>
  );
};

CustomCode.propTypes = {
  code: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    lang: PropTypes.string.isRequired,
  }),
};

const StyledPre = styled.pre`
    padding: 16px 24px;
    display: flex;
    margin: 0;
    width: 100%;
    white-space: pre;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
`;
