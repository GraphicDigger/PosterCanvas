import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Surface } from '@/shared/uiKit/Surface';
import { PlusIcon } from '@/shared/assets/icons';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { List, ListItem, ListItemButton } from '@/shared/uiKit/List';
import { useApi, ApiListItem } from '@/entities/api';
import { setSelectedApiId } from '@/entities/api';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody, ViewerTrigger } from '@/shared/uiKit/Viewer';


export const CategoryApiList = () => {

  const { categoryApis, selectedCategory } = useApi();

  return (
    <ViewerPanel
      minWidth={200}
      width={250}
      maxWidth={300}
      anchor='left'
    >
      <ViewerPanelHeader title={selectedCategory?.name} />
      <ViewerPanelBody>
        <List gap={0} padding={0}>
          {categoryApis && categoryApis.length > 0 ? (
            categoryApis.map(api => (
              <ViewerTrigger
                key={api.id}
                step={3}
                groupId='apiProjectSettings'
              >
                <ApiListItem id={api.id} name={api.name} />
              </ViewerTrigger>

            ))
          ) : (
            <ListItem>
              No APIs found
            </ListItem>
          )}
        </List>
      </ViewerPanelBody>
    </ViewerPanel>
  );
};
