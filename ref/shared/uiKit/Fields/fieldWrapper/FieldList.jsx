/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '../../providers';
import { textColorsMode } from '../../styles';

export const FieldList = ({
  children,
  gap = 2,
}) => {

  return (
    <StyledFieldList gap={gap}>
      {children}
    </StyledFieldList>
  );
};

const StyledFieldList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => typeof gap === 'number' ? `${gap * 4}px` : gap};
    width: 100%;
`;

FieldList.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.number,
};
