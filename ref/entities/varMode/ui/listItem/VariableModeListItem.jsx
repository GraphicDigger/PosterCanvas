import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../../shared/uiKit/List';
import { useVariableModeStates } from '../../model';
import { MinusIcon } from '../../../../shared/assets/icons';


export const VariableModeListItem = forwardRef(({ onClick, variableMode }, ref) => {

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useVariableModeStates(variableMode?.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  const handleRemoveMode = () => {
    console.log('[VariableModeListItem] handleRemoveMode');
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(variableMode?.id)}
        onMouseEnter={() => handleHover(variableMode.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(variableMode?.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{variableMode?.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

