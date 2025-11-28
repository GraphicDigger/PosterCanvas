import React from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
  ListItemButton,
  ListItemEndSlot,
  ListItemText,
} from '../../../shared/uiKit/List';
import { useScreenStates } from '../model';
import { CodeIcon } from '../../../shared/assets/icons';
import { useFocusEntity } from '../../uiFocus';
import { useDesignMode } from '../../mode/editorMode';

export const ScreenListItem = ({ screen, endSlot, onClick }) => {

  const {
    handleSelect,
    handleFocus,
    handleHover,
    isSelected,
    isFocused,
    isHovered,
  } = useScreenStates(screen?.id);

  const { resetFocused } = useFocusEntity();

  const handleClickListItem = () => {
    handleSelect(screen.id);
    onClick?.();
  };

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={handleClickListItem}
        onMouseEnter={() => handleHover(screen.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(screen.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText editable={true} >
          {screen.name}
        </ListItemText>
        {endSlot && (isHovered || isSelected) && (
          <ListItemEndSlot>
            <span onClick={(e) => e.stopPropagation()}>
              {endSlot}
            </span>
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};

ScreenListItem.propTypes = {
  screen: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  endSlot: PropTypes.node,
  onClick: PropTypes.func,
};
