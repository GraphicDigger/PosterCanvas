import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText } from '@/shared/uiKit/List';
import { useProjectStates } from '../model';

export const ProjectListItem = forwardRef(({
  project,
  onClick,
  ...props
}, ref) => {

  const {
    isHovered,
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useProjectStates(project.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem {...props}>
      <ListItemButton
        ref={ref}
        filled={false}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(project.id)}
        onMouseEnter={() => handleHover(project.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(project.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>
          {project.name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

