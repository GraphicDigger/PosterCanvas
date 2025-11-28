import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useVariableModeGroupStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const VariableModeGroupListItem = forwardRef(({ onClick, variableModeGroup }, ref) => {

  const name = variableModeGroup.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useVariableModeGroupStates(variableModeGroup.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(variableModeGroup.id)}
        onMouseEnter={() => handleHover(variableModeGroup.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(variableModeGroup.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

