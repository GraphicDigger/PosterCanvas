import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '@/shared/uiKit/List';
import { useActorRoleStates } from '../model';


export const ActorRoleListItem = forwardRef(({ onClick, actorRole, size = 'small' }, ref) => {

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useActorRoleStates(actorRole.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick();
  };

  return (
    <ListItem size={size}>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(actorRole.id)}
        onMouseEnter={() => handleHover(actorRole.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(actorRole.id)}
        onBlur={() => handleFocus(null)}
        filled={false}
      >
        <ListItemText>{actorRole.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

