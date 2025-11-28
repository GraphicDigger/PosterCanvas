/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CODE_LANG } from '../../../../../entities/code';

export const ScreenCode = ({ code }) => {
  if (!code) {return null;}

  // Рендерим разный контент в зависимости от языка
  const renderContent = () => {
    switch (code.lang) {
    case CODE_LANG.JSX:
      return (
        <StyledPre>
          {code.content}
        </StyledPre>
      );

    case CODE_LANG.CSS:
      return (
        <StyledPre>
          {code.content || `
.${code.name.toLowerCase()} {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 100%;
    height: 100%;
}`}
        </StyledPre>
      );

    default:
      return <StyledPre>{code.content}</StyledPre>;
    }
  };

  return (
    <StyledWrapper>
      {renderContent()}
    </StyledWrapper>
  );
};

ScreenCode.propTypes = {
  code: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    content: PropTypes.string,
    screenId: PropTypes.string.isRequired,
  }),
};

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px 24px;
`;

const StyledPre = styled.pre`
    margin: 0;
    width: 100%;
    white-space: pre;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
`;
