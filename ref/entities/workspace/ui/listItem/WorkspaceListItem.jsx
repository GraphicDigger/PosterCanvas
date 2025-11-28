import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { useWorkspaceStates } from '../../model';


export const WorkspaceListItem = forwardRef(({
  onClick,
  workspace,
}, ref) => {

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useWorkspaceStates(workspace.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        filled = {false}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(workspace.id)}
        onMouseEnter={() => handleHover(workspace.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(workspace.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>{workspace.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

