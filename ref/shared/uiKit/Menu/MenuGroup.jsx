/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


export const MenuGroup = ({
  children,
  label,
  padding,
}) => {
  return (
    <StyledContent padding={padding}>
      <StyledLabel>{label}</StyledLabel>
      {children}
    </StyledContent>
  );
};

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ padding }) => padding ? `${padding * 4}px` : 0};
    `;

const StyledLabel = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 0 8px;
`;

MenuGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};

MenuGroup.displayName = 'MenuGroup';
