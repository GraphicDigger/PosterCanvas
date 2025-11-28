import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '@/shared/uiKit/List';
import { Text } from '@/shared/uiKit/Text';
import { useEventStates } from '../model';


export const EventListItem = forwardRef(({ onClick, event }, ref) => {

  const name = event.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useEventStates(event.id);

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
        onClick={() => handleClick(event.id)}
        onMouseEnter={() => handleHover(event.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(event.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

