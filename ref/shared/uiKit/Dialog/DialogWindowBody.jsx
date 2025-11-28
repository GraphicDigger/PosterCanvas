import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CrossIcon } from '../../assets/icons';

export const DialogBody = ({
  children,
  className,
}) => {
  return (
    <StyledBody className={className}>
      {children}
    </StyledBody>
  );
};

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 12px;
    width: 100%;
`;


DialogBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
