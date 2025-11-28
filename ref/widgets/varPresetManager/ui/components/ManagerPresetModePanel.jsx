/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowTitle, WindowBody } from '@/shared/uiKit/Window';
import { List, ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '@/shared/uiKit/List';
import { PlusIcon, ReferenceIcon, UnlinkIcon } from '@/shared/assets/icons';
import { EVariableMode, useVariableModes, VARIABLE_MODE_TYPE } from '@/entities/varMode';
import { usePresetCollections, usePresetCollectionMutation } from '@/entities/varPresetCollection';
import { usePresetModeValues } from '@/entities/varPresetModeValue';
import { usePresets } from '@/entities/varPreset';
import { useTokenAndPresetControl, AddVariableMode, BindCollectionToVariableMode } from '@/features/TokenAndPresetControl';
import { VARIABLE_MODE_GROUP_TYPE } from '@/entities/varModeGroup';
import { ButtonToolGroup } from '@/shared/uiKit/ButtonTool';


export const ManagerPresetModePanel = () => {

  const { selectedPresetCollectionId } = usePresetCollections();
  const { selectedCollectionModes, defaultVariableModeByIds } = useVariableModes();
  const modeIds = selectedCollectionModes.map(mode => mode.id);
  const currentDefaultMode = defaultVariableModeByIds(modeIds);
  const boundModeGroup = currentDefaultMode?.modeGroup;

  const { removeVariableMode } = useTokenAndPresetControl({
    type: VARIABLE_MODE_TYPE.PRESET_MODE,
    collectionId: selectedPresetCollectionId,
  });

  const handleRemoveMode = (variableModeId) => {
    removeVariableMode(variableModeId);
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Modes</SectionPanelName>
        <ButtonToolGroup fill={false}>
          <BindCollectionToVariableMode
            type={VARIABLE_MODE_TYPE.PRESET_MODE}
            collectionId={selectedPresetCollectionId}
            defaultMode={currentDefaultMode}
            modeGroup={boundModeGroup}
          />
          <AddVariableMode
            type={VARIABLE_MODE_TYPE.PRESET_MODE}
            collectionId={selectedPresetCollectionId}
          />
        </ButtonToolGroup>
      </SectionPanelHeader>
      <SectionPanelBody>
        <EVariableMode
          uiView='list'
          variableModes={selectedCollectionModes}
          onRemoveMode={handleRemoveMode}
        />
      </SectionPanelBody>
    </SectionPanel>
  );
};

