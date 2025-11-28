/** @jsxImportSource @emotion/react */
import React, { memo, useState, forwardRef } from 'react';
import styled from '@emotion/styled';
import { ButtonTool } from '../ButtonTool';
import { PlusIcon } from '../../assets/icons';

export const Connector = memo( forwardRef(({
  onTopClick,
  onRightClick,
  onBottomClick,
  onLeftClick,
  size = 'small',
  children,
}, ref) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledContent>

        {isHovered && (
          <>
            <StyledButtonWrapper position="top">
              <ButtonTool size={size} onClick={onTopClick}>
                <PlusIcon />
              </ButtonTool>
            </StyledButtonWrapper>

            <StyledButtonWrapper position="right">
              <ButtonTool size={size} onClick={onRightClick}>
                <PlusIcon />
              </ButtonTool>
            </StyledButtonWrapper>

            <StyledButtonWrapper position="bottom">
              <ButtonTool size={size} onClick={onBottomClick}>
                <PlusIcon />
              </ButtonTool>
            </StyledButtonWrapper>

            <StyledButtonWrapper position="left">
              <ButtonTool size={size} onClick={onLeftClick}>
                <PlusIcon />
              </ButtonTool>
            </StyledButtonWrapper>
          </>
        )}

        {children}

      </StyledContent>
    </StyledContainer>
  );
}));

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    height: max-content;
    
`;

const StyledContent = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px;
`;

const StyledButtonWrapper = styled.div`
    position: absolute;
    ${({ position }) => {
    switch (position) {
    case 'top':
      return `
                    top: -32px;
                    left: 50%;
                    transform: translateX(-50%);
                `;
    case 'right':
      return `
                    right: -32px;
                    top: 50%;
                    transform: translateY(-50%);
                `;
    case 'bottom':
      return `
                    bottom: -32px;
                    left: 50%;
                    transform: translateX(-50%);
                `;
    case 'left':
      return `
                    left: -32px;
                    top: 50%;
                    transform: translateY(-50%);
                `;
    default:
      return '';
    }
  }}
`;
