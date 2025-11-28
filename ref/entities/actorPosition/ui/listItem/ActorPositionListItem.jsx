import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useActorPositionStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const ActorPositionListItem = forwardRef(({ onClick, actorPosition }, ref) => {

  const name = actorPosition.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useActorPositionStates(actorPosition.id);

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
        onClick={() => handleClick(actorPosition.id)}
        onMouseEnter={() => handleHover(actorPosition.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(actorPosition.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

