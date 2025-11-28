import React, { memo } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '../../../../../shared/uiKit/List';
import { MenuList, MenuItemCheckbox } from '../../../../../shared/uiKit/Menu';
import { WindowPopover, WindowTrigger, Window } from '../../../../../shared/uiKit/Window';
import {
  useProjects,
  useSearchProjects,
} from '../../../../../entities/project';

import { useSearchStates, useSearchFilters } from '../../../model';


export const SearchByWorkspace = memo(() => {
  const { allProjects } = useProjects();
  const {
    selectedProjectIds,
    includeTasks,
    includeDocuments,
    includeChats,
  } = useSearchFilters();

  const {
    handleToggleProjectInSearch,
    handleToggleTasks,
    handleToggleDocuments,
    handleToggleChats,
  } = useSearchStates();

  const handleToggleProject = (projectId) => {
    handleToggleProjectInSearch(projectId);
  };

  const handleToggleAll = () => {
    allProjects.forEach(project => handleToggleProject(project.id));
  };

  const isAllSelected = selectedProjectIds.length === allProjects.length;

  return (
    <List gap={0}>
      <WindowPopover placement='right-start' offset={9}>
        <WindowTrigger>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                                Projects
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </WindowTrigger>
        <Window width={180}>
          <MenuList>
            {allProjects.map(project => (
              <MenuItemCheckbox
                key={project.id}
                checked={selectedProjectIds.includes(project.id)}
                onChange={() => handleToggleProject(project.id)}
              >
                {project.name}
              </MenuItemCheckbox>
            ))}
          </MenuList>
        </Window>
      </WindowPopover>

      <MenuList padding={1}>
        <MenuItemCheckbox
          checked={includeTasks}
          onChange={handleToggleTasks}
        >
                    Tasks
        </MenuItemCheckbox>

        <MenuItemCheckbox
          checked={includeDocuments}
          onChange={handleToggleDocuments}
        >
                    Documents
        </MenuItemCheckbox>

        <MenuItemCheckbox
          checked={includeChats}
          onChange={handleToggleChats}
        >
                    Chats
        </MenuItemCheckbox>
      </MenuList>
    </List>
  );
});

