/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { mainColors } from '../../../../../../shared/styles';
import { useAbsoluteProperty } from '../../model';
import { STYLE_PROPERTIES, TRANSFORM } from '../../../../../entities/uiElement';

export const PositionMap = ({ mapVisible = true }) => {
  const theme = useTheme();

  const [isHoverTop, setIsHoverTop] = useState(false);
  const [isHoverRight, setIsHoverRight] = useState(false);
  const [isHoverBottom, setIsHoverBottom] = useState(false);
  const [isHoverLeft, setIsHoverLeft] = useState(false);
  const [isHoverCenter, setIsHoverCenter] = useState(false);
  const [isHoverVerticalCenter, setIsHoverVerticalCenter] = useState(false);
  const [isHoverHorizontalCenter, setIsHoverHorizontalCenter] = useState(false);

  const {
    top,
    right,
    bottom,
    left,
    isVerticalCenter,
    isHorizontalCenter,
    isCenter,
    togglePosition,
    updateTopValue,
    updateRightValue,
    updateBottomValue,
    updateLeftValue,
  } = useAbsoluteProperty();

  const colors = useMemo(() => {
    return {
      defaultLine: theme.sys.color.outline.high,
      hoverLine: theme.sys.color.primary,
      activeLine: theme.sys.color.primary,
      hoverContainer: theme.sys.color.primaryContainer,
    };
  }, [theme]);

  return (
    <Container>
      {mapVisible && (
        <StyledMap theme={theme} colors={colors}>
          <CenterContainer
            onMouseEnter={() => setIsHoverCenter(true)}
            onMouseLeave={() => setIsHoverCenter(false)}
            colors={colors}
            isHover={isHoverCenter}
          >
            <VerticalCenterContainer
              onMouseEnter={() => setIsHoverVerticalCenter(true)}
              onMouseLeave={() => setIsHoverVerticalCenter(false)}
              colors={colors}
              isHover={isHoverVerticalCenter}
              onClick={() => togglePosition(TRANSFORM.translateY)}
            >
              <VerticalCenter
                colors={colors}
                isHover={isHoverVerticalCenter}
                isActive={isVerticalCenter || isCenter}
              />
            </VerticalCenterContainer>
            <HorizontalCenterContainer
              onMouseEnter={() => setIsHoverHorizontalCenter(true)}
              onMouseLeave={() => setIsHoverHorizontalCenter(false)}
              colors={colors}
              isHover={isHoverHorizontalCenter}
              onClick={() => togglePosition(TRANSFORM.translateX)}
            >
              <HorizontalCenter
                colors={colors}
                isHover={isHoverHorizontalCenter}
                isActive={isHorizontalCenter || isCenter}
              />
            </HorizontalCenterContainer>
          </CenterContainer>

          <TopContainer
            onMouseEnter={() => setIsHoverTop(true)}
            onMouseLeave={() => setIsHoverTop(false)}
            colors={colors}
            isHover={isHoverTop}
            onClick={() => togglePosition(STYLE_PROPERTIES.top)}
          > <Top
              isHover={isHoverTop}
              colors={colors}
              isActive={top.value}
              isVerticalCenter={isVerticalCenter}
              isCenter={isCenter}
            />
          </TopContainer>

          <RightContainer
            onMouseEnter={() => setIsHoverRight(true)}
            onMouseLeave={() => setIsHoverRight(false)}
            colors={colors}
            isHover={isHoverRight}
            onClick={() => togglePosition(STYLE_PROPERTIES.right)}
          > <Right
              isHover={isHoverRight}
              colors={colors}
              isActive={right.value}
            />
          </RightContainer>

          <BottomContainer
            onMouseEnter={() => setIsHoverBottom(true)}
            onMouseLeave={() => setIsHoverBottom(false)}
            colors={colors}
            isHover={isHoverBottom}
            onClick={() => togglePosition(STYLE_PROPERTIES.bottom)}
          > <Bottom
              isHover={isHoverBottom}
              colors={colors}
              isActive={bottom.value}
              isVerticalCenter={isVerticalCenter}
              isCenter={isCenter}
            />
          </BottomContainer>

          <LeftContainer
            onMouseEnter={() => setIsHoverLeft(true)}
            onMouseLeave={() => setIsHoverLeft(false)}
            colors={colors}
            isHover={isHoverLeft}
            onClick={() => togglePosition(STYLE_PROPERTIES.left)}
          > <Left
              isHover={isHoverLeft}
              colors={colors}
              isActive={left.value}
              isHorizontalCenter={isHorizontalCenter}
              isCenter={isCenter}
            />
          </LeftContainer>
        </StyledMap>
      )}
    </Container>
  );
};

const Container = styled.div`
    min-height: 20px;
`;

const StyledMap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    outline: 1px solid ${({ colors }) => colors.defaultLine};
    position: relative;
    overflow: hidden;
`;

const CenterContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
`;

const HorizontalCenterContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 11px;
    top: 0;
    bottom: 0;
    left: calc(50% - 5.5px);
    cursor: pointer;
    mix-blend-mode: darken;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const HorizontalCenter = styled.div`
        height: 18px;
        border-radius: 10px;
        width: ${({ isHover, isActive }) => isHover || isActive ? '3px' : '1px'};
        background-color: ${({ colors, isHover, isActive }) =>
    isHover || isActive
      ? colors.hoverLine
      : colors.defaultLine
};
    `;

const VerticalCenterContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13px;
    left: 0;
    right: 0;
    top: calc(50% - 6.5px);
    cursor: pointer;
    mix-blend-mode: darken;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const VerticalCenter = styled.div`
        width: 25px;
        border-radius: 10px;
        height: ${({ isHover, isActive }) => isHover || isActive ? '3px' : '1px'};
        background-color: ${({ colors, isHover, isActive }) =>
    isHover || isActive ? colors.hoverLine : colors.defaultLine
};
    `;

const TopContainer = styled.div`
    position: absolute;
    height: 13px;
    left: 0;
    top: 0;
    right: 0;
    cursor: pointer;
    mix-blend-mode: multiply;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const Top = styled.div`
        position: absolute;
        left: 13px;
        top: 4px;
        right: 13px;
        border-radius: 10px;
        height: ${({ isHover, isActive, isVerticalCenter, isCenter }) => {
    if ((isHover || isActive) && !isVerticalCenter && !isCenter) { return '3px'; }
    return '1px';
  }};
        background-color: ${({ colors, isHover, isActive, isVerticalCenter, isCenter }) => {
    if ((isHover || isActive) && !isVerticalCenter && !isCenter) { return colors.hoverLine; }
    return colors.defaultLine;
  }};

    `;

const RightContainer = styled.div`
    position: absolute;
    width: 13px;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    mix-blend-mode: multiply;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const Right = styled.div`
        position: absolute;
        top: 13px;
        right: 4px;
        bottom: 13px;
        border-radius: 10px;
        width: ${({ isHover, isActive, isCenter }) => isHover || isActive && !isCenter ? '3px' : '1px'};
        background-color: ${({ colors, isHover, isActive, isCenter }) =>
    (isHover || isActive) && !isCenter ? colors.hoverLine : colors.defaultLine
};
    `;

const BottomContainer = styled.div`
    position: absolute;
    height: 13px;
    left: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    mix-blend-mode: multiply;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const Bottom = styled.div`
        position: absolute;
        left: 13px;
        bottom: 4px;
        right: 13px;
        border-radius: 10px;
        height: ${({ isHover, isActive, isVerticalCenter }) => {
    if ((isHover || isActive) && !isVerticalCenter) { return '3px'; }
    return '1px';
  }};
        background-color: ${({ colors, isHover, isActive, isVerticalCenter }) => {
    if ((isHover || isActive) && !isVerticalCenter) { return colors.hoverLine; }
    return colors.defaultLine;
  }};
    `;

const LeftContainer = styled.div`
    position: absolute;
    width: 13px;
    top: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
    mix-blend-mode: multiply;
    background-color: ${({ colors, isHover }) => isHover ? colors.hoverContainer : 'transparent'};
`; const Left = styled.div`
        position: absolute;
        top: 13px;
        left: 4px;
        bottom: 13px;
        border-radius: 10px;
        width: ${({ isHover, isActive, isHorizontalCenter, isCenter }) => {
    if ((isHover || isActive) && !isHorizontalCenter && !isCenter) { return '3px'; }
    return '1px';
  }};
        background-color: ${({ colors, isHover, isActive, isHorizontalCenter, isCenter }) => {
    if ((isHover || isActive) && !isHorizontalCenter && !isCenter) { return colors.hoverLine; }
    return colors.defaultLine;
  }};
      `;
