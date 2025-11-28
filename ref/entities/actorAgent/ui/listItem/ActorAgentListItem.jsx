import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useActorAgentStates } from '../../model';
import { Text } from '../../../../shared/uiKit/Text';


export const ActorAgentListItem = forwardRef(({ onClick, actorAgent }, ref) => {

  const name = actorAgent.name;

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useActorAgentStates(actorAgent.id);

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
        onClick={() => handleClick(actorAgent.id)}
        onMouseEnter={() => handleHover(actorAgent.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(actorAgent.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

