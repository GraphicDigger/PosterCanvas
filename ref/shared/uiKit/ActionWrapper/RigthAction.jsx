/** @jsxImportSource @emotion/react */
import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ButtonTool } from '../ButtonTool/ButtonTool';
import { PlusIcon } from '../../assets/icons';
import { ActionWrapperContext } from './model/context/contex';


export const RightAction = forwardRef(({ children, onClick, isVisible: isVisibleProp }, ref) => {
  const { isHovered } = useContext(ActionWrapperContext);

  // Prop takes precedence over context
  const isVisible = isVisibleProp !== undefined ? isVisibleProp : isHovered;

  return (
    <ActionContainer isVisible={isVisible} ref={ref}>
      <ButtonTool width='16px' onClick={onClick}>
        {children || <PlusIcon />}
      </ButtonTool>
    </ActionContainer>
  );
});

const ActionContainer = styled.div`
    opacity: ${({ isVisible }) => isVisible ? 1 : 0};
    pointer-events: ${({ isVisible }) => isVisible ? 'auto' : 'none'};
`;

RightAction.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isVisible: PropTypes.bool,
};
