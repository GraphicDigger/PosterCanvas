import React, { forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { ENTITY_KINDS } from '../../../shared/constants';
import { ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../shared/uiKit/List';
import { useWireframeBlockStates } from '../model';
import { BlockSelector } from './BlockSelector';
import { useWireframeMode } from '../../mode/editorMode';
import { MinusIcon } from '../../../shared/assets/icons';
import { ActionWrapper, RightAction } from '../../../shared/uiKit/ActionWrapper';

export const WireframeBlockListItem = forwardRef(({
  block,
  onClick,
  endSlot,
  onDelete,
  ...props
}, ref) => {

  const { setBlockDetailMode } = useWireframeMode();
  const {
    handleSelect,
    handleFocus,
    handleHover,
    isSelected,
    isFocused,
    isHovered,
  } = useWireframeBlockStates(block?.id);

  const blockWithoutBinding = useMemo(() => {
    return block.targetType === ENTITY_KINDS.SCREEN;
  }, [block.targetType]);

  const handleClickListItem = () => {
    handleSelect(block.id);
    setBlockDetailMode();
    if (onClick) {onClick();}
  };

  const handleDeleteBlock = () => {
    onDelete(block.id);
  };

  return (
    <ActionWrapper>
      <ListItem>
        <ListItemButton
          ref={ref}
          filled
          isSelected={isSelected}
          isHovered={isHovered}
          isFocused={isFocused}
          onClick={handleClickListItem}
          onMouseEnter={() => handleHover(block.id)}
          onMouseLeave={() => handleHover(null)}
          onFocus={() => handleFocus(block.id)}
          onBlur={() => handleFocus(null)}
        >
          <ListItemText editable={true} color={blockWithoutBinding ? 'disabled' : undefined} >
            {block?.name}
          </ListItemText>
          {endSlot && isHovered && (
            <ListItemEndSlot>
              {endSlot}
            </ListItemEndSlot>
          )}
        </ListItemButton>
      </ListItem>
      {onDelete && (
        <RightAction onClick={() => onDelete(block.id)}>
          <MinusIcon />
        </RightAction>
      )}
    </ActionWrapper>
  );
});
