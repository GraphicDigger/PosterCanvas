/** @jsxImportSource @emotion/react */
import React, { memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { LeftSlot } from './LeftSlot';
import { CenterSlot } from './CenterSlot';
import { RightSlot } from './RightSlot';
import { lineColors } from '../../styles';


export const SlotBar = memo(({
  children,
  divider = false,
  className = 'slotBar',
  height = 11,
  paddingHorizontal = 2,
  paddingVertical,
  backgroundColor,

  position = 'relative',
  top,
  bottom,
  zIndex = 1,
}) => {
  const theme = useTheme();
  const dividerColor = theme.sys.color.outline.light1;

  const slots = useMemo(() => {
    const result = {
      left: null,
      center: null,
      right: null,
    };

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) { return; }

      if (child.type === LeftSlot) { result.left = child; }
      if (child.type === CenterSlot) { result.center = child; }
      if (child.type === RightSlot) { result.right = child; }
    });

    return result;
  }, [children]);

  const layoutStyle = useMemo(() => {

    const { left, center, right } = slots;

    if (left && !center && !right) { return { justifyContent: 'flex-start' }; }
    if (!left && center && !right) { return { justifyContent: 'center' }; }
    if ((!left && center && right) || (!left && !center && right)) { return { justifyContent: 'flex-end' }; }
    if (left && !center && right) { return { justifyContent: 'space-between' }; }
    if (left && center && right) { return { justifyContent: 'space-between' }; }

    return {};
  }, [slots]);

  return (
    <StyledSlotBar
      $paddingVertical={paddingVertical}
      $paddingHorizontal={paddingHorizontal}
      $layoutStyle={layoutStyle}
      $height={height}
      className={className}
      $position={position}
      $zIndex={zIndex}
      $top={top}
      $bottom={bottom}
      $backgroundColor={backgroundColor}
    >
      {slots.left}
      {(!slots.left && slots.center && !slots.right)
        ? slots.center
        : <StyledCenterWrapper> {slots.center} </StyledCenterWrapper>}
      {slots.right}
      {divider && <Divider left bottom color={dividerColor} />}
    </StyledSlotBar>
  );
});

const StyledSlotBar = styled.div`
    width: 100%;
    display: flex;
    position: ${({ $position }) => $position};
    ${({ $position, $top, $bottom }) => $position === 'absolute' &&
    `
        left: 0;
        top: ${$top ? $top : '0'};
        bottom: ${$bottom && $bottom};
        pointer-events: none;
    `};
    z-index: ${({ $zIndex, theme }) => $zIndex && typeof $zIndex === 'number' ? $zIndex : theme.ref.zIndex.layers.base};
    height: ${({ $height, $paddingVertical }) => $paddingVertical !== undefined ? 'max-content' : `${$height * 4}px`};
    min-height: ${({ $height, $paddingVertical }) => $paddingVertical !== undefined ? 'auto' : `${$height * 4}px`};
    padding-top: ${({ $paddingVertical }) => $paddingVertical !== undefined ? `${$paddingVertical * 4}px` : '0px'};
    padding-bottom: ${({ $paddingVertical }) => $paddingVertical !== undefined ? `${$paddingVertical * 4}px` : '0px'};
    padding-left: ${({ $paddingHorizontal }) => $paddingHorizontal !== undefined ? `${$paddingHorizontal * 4}px` : '0px'};
    padding-right: ${({ $paddingHorizontal }) => $paddingHorizontal !== undefined ? `${$paddingHorizontal * 4}px` : '0px'};
    align-items: center;
    ${props => ({ ...props.$layoutStyle })}
`;

const StyledCenterWrapper = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

SlotBar.propTypes = {
  children: PropTypes.node,
  divider: PropTypes.bool,
  className: PropTypes.string,
};
