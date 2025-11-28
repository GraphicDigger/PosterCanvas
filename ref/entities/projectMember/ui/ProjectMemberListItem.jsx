import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useProjectMember } from '../model';
import { forwardRef } from 'react';

export const ProjectMemberListItem = forwardRef(({ onClick, projectMember }, ref) => {

  const name = projectMember.name;

  const {
    isProjectMemberFocused,
    isProjectMemberSelected,
    handleProjectMemberHover,
    handleProjectMemberFocus,
    handleProjectMemberSelect,
  } = useProjectMember(projectMember.id);

  const handleClick = (id) => {
    handleProjectMemberSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isProjectMemberSelected}
        isFocused={isProjectMemberFocused}
        onClick={() => handleClick(projectMember.id)}
        onMouseEnter={() => handleProjectMemberHover(projectMember.id)}
        onMouseLeave={() => handleProjectMemberHover(null)}
        onFocus={() => handleProjectMemberFocus(projectMember.id)}
        onBlur={() => handleProjectMemberFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

