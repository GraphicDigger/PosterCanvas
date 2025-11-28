import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { usePresetModeValueStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const PresetModeValueListItem = forwardRef(({ onClick, presetModeValue }, ref) => {

  const name = presetModeValue.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = usePresetModeValueStates(presetModeValue.id);

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
        onClick={() => handleClick(presetModeValue.id)}
        onMouseEnter={() => handleHover(presetModeValue.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(presetModeValue.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

