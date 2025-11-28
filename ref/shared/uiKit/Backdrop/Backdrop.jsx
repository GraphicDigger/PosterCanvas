/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { getPositionStyles } from './Backdrop.style';


export const Backdrop = ({
  opacity = 0.4,
  onClick,
  zIndex = 1000,
  ignorePointer = false,

  children,
  position = 'center',

}) => {

  const handleClick = (e) => {
    if (onClick) {onClick();}
    e.stopPropagation();
  };

  return (
    <Styled
      ignorePointer={ignorePointer}
      position={position}
      onClick={e => handleClick(e)}
      zIndex={zIndex}
    >
      {children}
      <StyledOverlay opacity={opacity} />
    </Styled>
  );
};

const Styled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    pointer-events: ${({ ignorePointer }) => ignorePointer ? 'none' : 'auto'};
    justify-content: ${({ position }) => getPositionStyles(position).justify};
    align-items: ${({ position }) => getPositionStyles(position).align};
    z-index: ${({ zIndex }) => zIndex};

    & > :first-child {
        z-index: 1;
    }
`;

const StyledContent = styled.div`
    position: relative;
    z-index: 1;
`;

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: ${({ opacity }) => opacity};
`;

Backdrop.propTypes = {
  opacity: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.node,
  position: PropTypes.oneOf(['center', 'left', 'right']),
};
