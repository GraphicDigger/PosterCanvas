/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Stack } from '../../../shared/uiKit/Stack';
import { useDesignMode } from '../../../entities/mode/editorMode';
import { useFocusEntity } from "@/entities/uiFocus";
import { usePresetCollections } from '../../../entities/varPresetCollection';
import { usePresetMutation } from '../../../entities/varPreset/model/hooks/usePresetMutation';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { TextField } from '../../../shared/uiKit/Fields';
import { Button } from '../../../shared/uiKit/Button';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { CrossIcon, PlusIcon, TrashIcon, SettingsIcon } from '../../../shared/assets/icons';
import { usePresetCollectionMutation } from '../../../entities/varPresetCollection';
import { ManagerPresetTable } from './components/ManagerPresetTable';
import { ManagerSidebar } from './components/ManagerSidebar';
import { Text } from '../../../shared/uiKit/Text';

export const PresetManager = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { resetDesignModesToInitialState } = useDesignMode();
  const { handleResetFocusEntity } = useFocusEntity();
  const { selectedPresetCollection } = usePresetCollections();

  const handleCloseManager = () => {
    resetDesignModesToInitialState();
    handleResetFocusEntity();
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Stack direction='row' align='flex-start'>
      <Stack direction='column' align='flex-start'>
        <SlotBar divider>
          <LeftSlot padding={2}>
            <Text weight='bold'>{selectedPresetCollection?.name} Collection</Text>
          </LeftSlot>
          <RightSlot>
            <TextField placeholder='Search' />
            <ButtonTool onClick={handleToggleSidebar}>
              <SettingsIcon />
            </ButtonTool>
            <ButtonTool onClick={handleCloseManager}>
              <CrossIcon />
            </ButtonTool>
          </RightSlot>
        </SlotBar>
        <ManagerPresetTable />
      </Stack>
      {isSidebarOpen && <ManagerSidebar />}
    </Stack>
  );
};
