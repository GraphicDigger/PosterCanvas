import React, { memo } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '../../../../../shared/uiKit/List';
import { MenuList, MenuItemCheckbox } from '../../../../../shared/uiKit/Menu';
import { WindowPopover, WindowTrigger, Window } from '../../../../../shared/uiKit/Window';
import { useScreens } from '../../../../../entities/uiScreen';
import { useSearchStates, useSearchFilters } from '../../../model';

export const SearchByProject = memo(() => {

  const { allScreens } = useScreens();

  const {
    selectedScreenIds,
    includeComponents,
    includeElements,
    includeImages,
    includeText,
  } = useSearchFilters();

  const {
    handleToggleScreenInSearch,
    handleToggleComponents,
    handleToggleElements,
    handleToggleImages,
    handleToggleText,
  } = useSearchStates();

  // Список экранов
  const handleToggleScreen = (screenId) => {
    handleToggleScreenInSearch(screenId);
  };

  return (
    <List gap={0}>
      <WindowPopover placement='right-start' offset={9}>
        <WindowTrigger>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                                Screens
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </WindowTrigger>
        <Window width={180}>
          <MenuList>
            {allScreens.map(screen => (
              <MenuItemCheckbox
                key={screen.id}
                checked={selectedScreenIds.includes(screen.id)}
                onChange={() => handleToggleScreen(screen.id)}
              >
                {screen.name}
              </MenuItemCheckbox>
            ))}
          </MenuList>
        </Window>
      </WindowPopover>

      <MenuList padding={1}>
        <MenuItemCheckbox
          checked={includeComponents}
          onChange={handleToggleComponents}
        >
                    Components
        </MenuItemCheckbox>

        <MenuItemCheckbox
          checked={includeElements}
          onChange={handleToggleElements}
        >
                    Elements
        </MenuItemCheckbox>

        <MenuItemCheckbox
          checked={includeImages}
          onChange={handleToggleImages}
        >
                    Images
        </MenuItemCheckbox>

        <MenuItemCheckbox
          checked={includeText}
          onChange={handleToggleText}
        >
                    Text
        </MenuItemCheckbox>
      </MenuList>
    </List>
  );
});

