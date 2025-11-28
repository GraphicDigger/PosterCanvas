import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '@/shared/uiKit/List';
import { useCallStates } from '../model';
import { CrossIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';


export const ApiCallListItem = ({
  id,
  name,
  removeCall,
}) => {
  const {
    handleHover,
    handleFocus,
    handleSelect,
    isSelected,
    isFocused,
    isHovered,
  } = useCallStates(id);

  const handleClick = (id) => {
    handleSelect(id);
  };

  const handleRemoveCall = (e) => {
    e.stopPropagation();
    removeCall(id);
  };

  return (
    <ListItem>
      <ListItemButton
        filled={true}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(id)}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText editable={true} >
          {name}
        </ListItemText>
        {isHovered && (
          <ListItemEndSlot>
            <ButtonTool onClick={handleRemoveCall}>
              <CrossIcon />
            </ButtonTool>
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};

