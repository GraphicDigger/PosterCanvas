/** @jsxImportSource @emotion/react */
import React, { useState, memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { textColorsMode, lineColors, borderRadius } from '../../styles';
import { DotsIcon } from '../../assets/icons';
import { ButtonTool } from '../ButtonTool';
import { Divider } from '../Divider';
import { CardAvatar } from './CardAvatar';
import { CardTitle } from './CardTitle';
import { CardSubtitle } from './CardSubtitle';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { Surface } from '../Surface';


export const ItemCard = memo(({

  children,
  onClick,
  actionSlot,
  onActionsClick,

  isHovered: isHoveredExternal,
  onMouseEnter,
  onMouseLeave,

  isFocused: isFocusedExternal,
  onFocus,
  onBlur,

  isSelected,

  size = 'medium',
  minWidth,
  divider,
  border,
  compact,
}) => {

  const theme = useTheme();

  const showDivider = compact ? true : false;
  const showBorder = compact ? false : true;

  const [isHoveredInternal, setIsHoveredInternal] = useState(false);
  const [isFocusedInternal, setIsFocusedInternal] = useState(false);

  const isHovered = isHoveredExternal !== undefined ? isHoveredExternal : isHoveredInternal;
  const isFocused = isFocusedExternal !== undefined ? isFocusedExternal : isFocusedInternal;

  const handleMouseEnter = (e) => {
    setIsHoveredInternal(true);
    if (onMouseEnter) { onMouseEnter(e); }
  };

  const handleMouseLeave = (e) => {
    setIsHoveredInternal(false);
    if (onMouseLeave) { onMouseLeave(e); }
  };

  const handleFocus = (e) => {
    setIsFocusedInternal(true);
    if (onFocus) { onFocus(e); }
  };

  const handleBlur = (e) => {
    setIsFocusedInternal(false);
    if (onBlur) { onBlur(e); }
  };

  const slots = useMemo(() => {
    const result = {
      avatar: null,
      title: null,
      subtitle: null,
      body: null,
      footer: null,
    };

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {return;}
      const childWithProps = React.cloneElement(child, { size });
      const typeName = (child.type).displayName || (child.type).name;

      switch (typeName) {
      case 'CardAvatar': result.avatar = childWithProps;
        break;
      case 'CardTitle': result.title = childWithProps;
        break;
      case 'CardSubtitle': result.subtitle = childWithProps;
        break;
      case 'CardBody': result.body = childWithProps;
        break;
      case 'CardFooter': result.footer = childWithProps;
        break;
      }
    });

    return result;
  }, [children, size]);

  const handleActionsClick = (e) => {
    e.stopPropagation();
    if (onActionsClick) { onActionsClick(); }
  };

  return (

    <StyledCard
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isSelected={isSelected}
      onClick={onClick}
      border={showBorder}
      theme={theme}
      hasBody={!!slots.body}
      hasFooter={!!slots.footer}
      minWidth={minWidth}
    >
      {slots.avatar && (
        <StyledAvatar>
          {slots.avatar}
        </StyledAvatar>
      )}
      <StyledTitle theme={theme}>
        {slots.title}
        {slots.subtitle}
      </StyledTitle>
      <StyledButton>
        {(actionSlot && isHovered) && actionSlot}
        {(!actionSlot && isHovered) && <ButtonTool onClick={handleActionsClick}> <DotsIcon /> </ButtonTool>}
      </StyledButton>
      {slots.body &&
        <StyledBody theme={theme}> {slots.body} </StyledBody>}
      {slots.footer &&
        <StyledFooter theme={theme}> {slots.footer} </StyledFooter>}
      {showDivider && <Divider bottom left color={theme.comp.card.outline.default} />}

    </StyledCard>

  );
});


const StyledCard = styled.div`
    display: grid;
    position: relative;
    grid-template-areas: ${({ hasBody, hasFooter }) => {
    let areas = '"avatar name button"';
    if (hasBody) { areas += '\n        ". body body"'; }
    if (hasFooter) { areas += '\n        ". footer footer"'; }
    return areas;
  }};
    grid-template-columns: auto 1fr auto;
    grid-template-rows: ${({ hasBody, hasFooter }) => {
    let rows = 'auto';
    if (hasBody) { rows += ' auto'; }
    if (hasFooter) { rows += ' auto'; }
    return rows;
  }};
    row-gap: 10px;
    column-gap: 16px;
    cursor: pointer;
    border-radius: ${({ border, theme }) => border && theme.ref.borderRadius.large};
    border: ${({ border, theme }) => border ? `1px solid ${theme.comp.card.outline.default}` : 'none'};
    background-color: ${({ isHovered, isFocused, isSelected, theme }) => {
    if (isHovered) { return theme.comp.card.background.hover; }
    if (isFocused) { return theme.comp.card.background.focus; }
    if (isSelected) { return theme.comp.card.background.selected; }
    return theme.comp.card.background.default;
  }};
    min-width: ${({ minWidth }) => minWidth ? `${minWidth}px` : '0'};
    width: 100%;
    padding: 16px;
    overflow: hidden;
`;

const StyledAvatar = styled.div`
    grid-area: avatar;
    display: flex;
    align-items: center;
`;

const StyledTitle = styled.p`
    color: ${({ theme }) => theme.sys.typography.color.primary};
    & :last-child {
        color: ${({ theme }) => theme.sys.typography.color.disabled};
    }
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    gap: 2px;
`;

const StyledButton = styled.div`
    grid-area: button;
    display: flex;
`;

const StyledFooter = styled.div`
    grid-area: footer;
    display: flex;
`;

const StyledBody = styled.div`
    grid-area: body;
    color: ${({ theme }) => theme.sys.typography.color.primary};
`;

