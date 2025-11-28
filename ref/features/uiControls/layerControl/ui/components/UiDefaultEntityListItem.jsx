import { ListItem, ListItemButton, ListItemText } from '../../../../../shared/uiKit/List';
import { forwardRef } from 'react';

export const UiDefaultEntityListItem = forwardRef(({ onClick, uiDefaultEntity }, ref) => {

  const handleClick = (id) => {
    handleDefaultElementSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        onClick={() => handleClick(uiDefaultEntity.id)}
      >
        <ListItemText>{uiDefaultEntity.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

