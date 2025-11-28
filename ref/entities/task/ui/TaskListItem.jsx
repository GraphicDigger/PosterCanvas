import { ListItem, ListItemButton, ListItemText } from '@shared/uiKit/List';
import { useTask } from '../model';
import { forwardRef } from 'react';


export const TaskListItem = forwardRef(({ onClick, task }, ref) => {

  const {
    isTaskFocused,
    isTaskSelected,
    handleTaskHover,
    handleTaskFocus,
    handleTaskSelect,
  } = useTask(task.id);

  const handleClick = (id) => {
    handleTaskSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isTaskSelected}
        isFocused={isTaskFocused}
        onClick={() => handleClick(task.id)}
        onMouseEnter={() => handleTaskHover(task.id)}
        onMouseLeave={() => handleTaskHover(null)}
        onFocus={() => handleTaskFocus(task.id)}
        onBlur={() => handleTaskFocus(null)}
      >
        <ListItemText>{task.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

