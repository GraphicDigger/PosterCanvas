import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useTaskAssignee } from '../model';
import { forwardRef } from 'react';

export const TaskAssigneeListItem = forwardRef(({ onClick, taskAssignee }, ref) => {

  const name = taskAssignee.name;

  const {
    isTaskAssigneeFocused,
    isTaskAssigneeSelected,
    handleTaskAssigneeHover,
    handleTaskAssigneeFocus,
    handleTaskAssigneeSelect,
  } = useTaskAssignee(taskAssignee.id);

  const handleClick = (id) => {
    handleTaskAssigneeSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isTaskAssigneeSelected}
        isFocused={isTaskAssigneeFocused}
        onClick={() => handleClick(taskAssignee.id)}
        onMouseEnter={() => handleTaskAssigneeHover(taskAssignee.id)}
        onMouseLeave={() => handleTaskAssigneeHover(null)}
        onFocus={() => handleTaskAssigneeFocus(taskAssignee.id)}
        onBlur={() => handleTaskAssigneeFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

