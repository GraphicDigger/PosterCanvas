import React from 'react';
import { List } from '../../../../shared/uiKit/List/List';
import { ListItem } from '../../../../shared/uiKit/List/ListItem';
import { ListItemButton } from '../../../../shared/uiKit/List/ListItemButton';
import { ListItemText } from '../../../../shared/uiKit/List/ListItemText';
import { useUILibraryComponents } from '../../../../shared/uiMui';
import { useSelectorComponents } from '../../model';

export const LibrarySelector = () => {

  const { selectedLibraryId, handleLibrarySelected } = useSelectorComponents();
  const { uiLibraries } = useUILibraryComponents();
  return (

    <List>
      {uiLibraries.map(library => (
        <ListItem key={library.id}>
          <ListItemButton
            isSelected={selectedLibraryId === library.id}
            onClick={() => handleLibrarySelected(library.id)}
          >
            <ListItemText>
              {library.name}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>

  );
};
