/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const DotBind = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {

  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onMouseEnter) { onMouseEnter(e); }
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (onMouseLeave) { onMouseLeave(e); }
  };

  return (
    <StyledDotBind
      className={className}
      isHovered={isHovered}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label="Dot bind"
      theme={theme}
    />
  );
};

export const StyledDotBind = styled.div`
  width: 8px;
  height: 8px;
  margin: 4px;
  background-color: ${({ theme }) => theme.sys.color.primary};
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  cursor: pointer;
  transform: scale(${({ isHovered }) => isHovered ? 1.5 : 1});
`;

DotBind.propTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};
