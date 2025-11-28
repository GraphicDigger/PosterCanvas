import React, { useMemo, useRef } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { ResizableWrapper } from '../../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../../shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { TrashIcon, PlusIcon, SearchIcon } from '../../../../shared/assets/icons';
import { Scrollbar } from '../../../../shared/uiKit/Scrollbar';
import { List, ListItem, ListItemText, ListItemButton } from '../../../../shared/uiKit/List';
import { useClickOutside } from '../../../../shared/lib';
import { usePresetCollectionMutation, usePresetCollections } from '../../../../entities/varPresetCollection';
import { STYLE_PROPERTIES } from '../../../../entities/uiElement';
import { useTokenCollection } from '../../../../entities/varTokenCollection';
import { useTokenAndPresetControl, RemoveCollection } from '../../../../features/TokenAndPresetControl';
import { ManagerTokenModePanel } from './ManagerTokenModePanel';


export const ManagerSidebar = () => {

  const { selectedTokenCollection } = useTokenCollection();

  return (
    <ResizableWrapper side='left'>
      <Surface>
        <SectionPanel dividerBottom>
          <SectionPanelHeader paddingVertical={3.5}>
            <SectionPanelName>Collection Settings</SectionPanelName>
            <RemoveCollection
              collectionId={selectedTokenCollection?.id}
              type={ENTITY_KINDS.TOKEN_COLLECTION}
            />
          </SectionPanelHeader>
        </SectionPanel>
        <ManagerTokenModePanel />
      </Surface>
    </ResizableWrapper>
  );
};
