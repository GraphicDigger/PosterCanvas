/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Empty } from '../Empty';

export const WindowBody = ({
  children,
  padding = 4,
}) => {

  return (
    <Body padding={padding}>
      {children ? children : <Empty />}
    </Body>
  );
};

const Body = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ padding }) => padding * 4}px;
`;

WindowBody.propTypes = {
  children: PropTypes.node,
};
