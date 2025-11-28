/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Stack } from '../../../shared/uiKit/Stack';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { Text } from '../../../shared/uiKit/Text';
import { TextField } from '../../../shared/uiKit/Fields';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { SettingsIcon, CrossIcon, PlusIcon } from '../../../shared/assets/icons';
import { useTokenCollection } from '../../../entities/varTokenCollection';
import { Button } from '../../../shared/uiKit/Button';
import { ManagerSidebar } from './components/ManagerSidebar';
import { ManagerTokenTable } from './components/ManagerTokenTable';
import { useDesignMode } from '../../../entities/mode/editorMode';
import { AddTokenButton } from '../../../features/TokenAndPresetControl';

export const TokenManager = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { selectedTokenCollection } = useTokenCollection();
  const { toggleTokenManagerInDesignMode } = useDesignMode();

  const handleCloseManager = () => {
    toggleTokenManagerInDesignMode();
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Stack direction='row' align='flex-start'>
      <Stack direction='column' align='flex-start'>
        <SlotBar divider>
          <LeftSlot padding={2}>
            <Text weight='bold'>{selectedTokenCollection?.name} Collection</Text>
          </LeftSlot>
          <RightSlot>
            {selectedTokenCollection && (
              <>
                <TextField placeholder='Search' />
                <AddTokenButton/>
                <ButtonTool onClick={handleToggleSidebar}>
                  <SettingsIcon />
                </ButtonTool>
              </>
            )}
            <ButtonTool onClick={handleCloseManager}>
              <CrossIcon />
            </ButtonTool>
          </RightSlot>
        </SlotBar>
        <ManagerTokenTable />
      </Stack>
      {isSidebarOpen && selectedTokenCollection && <ManagerSidebar />}
    </Stack>
  );
};
