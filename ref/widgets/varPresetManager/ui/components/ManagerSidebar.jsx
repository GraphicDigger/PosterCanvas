import React, { useMemo, useRef } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { ResizableWrapper } from '../../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../../shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { TrashIcon, PlusIcon, SearchIcon } from '../../../../shared/assets/icons';
import { Scrollbar } from '../../../../shared/uiKit/Scrollbar';
import { List, ListItem, ListItemText, ListItemButton } from '../../../../shared/uiKit/List';
import { useClickOutside } from '../../../../shared/lib';
import { usePresetCollections } from '../../../../entities/varPresetCollection';
import { STYLE_PROPERTIES } from '../../../../entities/uiElement';
import { ManagerPresetModePanel } from './ManagerPresetModePanel';
import { usePresetManager, PRESET_MANAGER_SIDEBAR_MODES } from '../../model';
import { useTokenAndPresetControl, RemoveCollection } from '../../../../features/TokenAndPresetControl';
import { usePresets, usePresetStates } from '../../../../entities/varPreset';
import { usePresetModeValueMutation } from '../../../../entities/varPresetModeValue';
import { useVariableModes } from '../../../../entities/varMode';

export const ManagerSidebar = () => {

  const ref = useRef(null);
  const { sidebarMode, resetMode } = usePresetManager();
  const { selectedPresetCollection } = usePresetCollections();
  const { selectedCollectionModes } = useVariableModes();
  const { selectedPreset } = usePresets();
  const { removeSelectedPreset } = usePresetStates();
  const { updatePresetModeValue } = usePresetModeValueMutation();
  const modeId = selectedCollectionModes.find(mode => mode.isDefault)?.id;


  useClickOutside(ref, () => { resetMode(); });

  const handleUpdatePresetModeValue = (propertyKey) => {
    updatePresetModeValue(
      selectedPreset.id,
      modeId,
      propertyKey,
      propertyMap[propertyKey],
    );
    resetMode();
    removeSelectedPreset();
  };

  const propertyMap = {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.5',
    letterSpacing: '0.05em',
    textAlign: 'left',
  };

  const content = useMemo(() => {
    if (sidebarMode === PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST) {
      return (
        <>
          <SectionPanel dividerBottom>
            <SectionPanelHeader paddingVertical={3.5}>
              <SectionPanelName>Properties</SectionPanelName>
              <ButtonTool>
                <SearchIcon />
              </ButtonTool>
            </SectionPanelHeader>
          </SectionPanel>
          <Scrollbar>
            <SectionPanel>
              <SectionPanelBody>
                <List gap={0}>
                  {Object.values(STYLE_PROPERTIES).map((property) => (
                    <ListItem>
                      <ListItemButton onClick={() => handleUpdatePresetModeValue(property)} filled={false}>
                        <ListItemText>
                          {property}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </SectionPanelBody>
            </SectionPanel>
          </Scrollbar>
        </>
      );
    }

    if (sidebarMode === PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS) {
      return (
        <>
          <SectionPanel dividerBottom>
            <SectionPanelHeader paddingVertical={3.5}>
              <SectionPanelName>Collection Settings</SectionPanelName>
              <RemoveCollection
                collectionId={selectedPresetCollection?.id}
                type={ENTITY_KINDS.PRESET_COLLECTION}
              />
            </SectionPanelHeader>
          </SectionPanel>
          <ManagerPresetModePanel />
        </>
      );
    }
  }, [sidebarMode, selectedPresetCollection]);


  return (
    <ResizableWrapper side='left' ref={ref}>
      <Surface>
        {content}
      </Surface>
    </ResizableWrapper>
  );
};
