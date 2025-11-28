import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useUserspaceStates } from '../../model';


export const UserspaceListItem = forwardRef(({ onClick, userspace }, ref) => {

  const name = userspace.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useUserspaceStates(userspace.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(userspace.id)}
        onMouseEnter={() => handleHover(userspace.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(userspace.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

