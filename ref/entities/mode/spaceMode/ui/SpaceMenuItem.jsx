import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@/shared/uiKit/List';
import { useSpaceStates } from '../model';


export const SpaceMenuItem = ({
  children,
  onClick,
  isSelected,
  size = 'medium',
}) => {

  const handleSelect = () => {
    onClick && onClick();
  };

  return (
    <ListItem size={size}>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        onClick={handleSelect}
      >
        <ListItemText>
          {children}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
