/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LeftAction, RightAction } from './index';
import { ActionWrapperContext } from './model/context/contex';

export const ActionWrapper = ({
  children, // ex. simple component (buttonTool ...)
  align,
  width = 'fill',
  rightAction, // ex. dropdownMenu
  leftAction,
  ...props
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const contextValue = useMemo(() => ({
    isHovered,
  }), [isHovered]);

  const slots = useMemo(() => {
    const result = {
      left: null,
      right: null,
      content: [],
    };

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {return;}

      if (child.type === LeftAction) {
        if (!leftAction) {
          result.left = child;
        }
      } else if (child.type === RightAction) {
        if (!rightAction) {
          result.right = child;
        }
      } else {
        result.content.push(child);
      }
    });

    return result;
  }, [children, rightAction, leftAction]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ActionWrapperContext.Provider value={contextValue}>

      <StyledActionWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={width}
        align={align}
        {...props}
      >
        <StyledActionButton position="left">
          {leftAction ? leftAction() : slots.left}
        </StyledActionButton>

        <StyledActionContent>
          {slots.content}
        </StyledActionContent>

        <StyledActionButton position="right">
          {rightAction ? rightAction() : slots.right}
        </StyledActionButton>
      </StyledActionWrapper>

    </ActionWrapperContext.Provider>
  );
};

const StyledActionWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: ${({ align }) => {
    switch (align) {
    case 'center':
      return 'center';
    case 'top':
      return 'flex-start';
    default:
      return 'flex-end';
    }
  }};
    width: ${({ width }) => {
    switch (width) {
    case 'fill':
      return '100%';
    case 'fit':
      return 'auto';
    default:
      return 'auto';
    }
  }};
`;

const StyledActionButton = styled.div`
    position: absolute;
    ${({ position }) => position === 'left' ? 'left: -16px;' : 'right: -16px;'}
    display: flex;
    align-items: center;
    pointer-events: auto;
    overflow: hidden;
    cursor: pointer;

`;

const StyledActionContent = styled.div`
    display: flex;
    flex: 1;
    pointer-events: auto;
    min-width: 0;
    
`;

ActionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
