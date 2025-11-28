import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useUser } from '../model';
import { forwardRef } from 'react';

export const UserListItem = forwardRef(({ onClick, user }, ref) => {

  const name = user.name;

  const {
    isUserFocused,
    isUserSelected,
    handleUserHover,
    handleUserFocus,
    handleUserSelect,
  } = useUser(user.id);

  const handleClick = (id) => {
    handleUserSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isUserSelected}
        isFocused={isUserFocused}
        onClick={() => handleClick(user.id)}
        onMouseEnter={() => handleUserHover(user.id)}
        onMouseLeave={() => handleUserHover(null)}
        onFocus={() => handleUserFocus(user.id)}
        onBlur={() => handleUserFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

