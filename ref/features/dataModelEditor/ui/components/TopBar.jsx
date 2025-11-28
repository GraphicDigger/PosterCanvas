import React from 'react';
import { SlotBar, LeftSlot, RightSlot } from '../../../../shared/uiKit/SlotBar';
import { Button } from '../../../../shared/uiKit/Button';
import { Text } from '../../../../shared/uiKit/Text';
import { useDataModels } from '../../../../entities/dataModel';
import { useDraftModel } from '../../model';
import { useTheme } from '@emotion/react';

export const TopBar = () => {
  const theme = useTheme();
  const { selectedModel } = useDataModels();
  const { hasDraftChanges, saveDraftModelField, discardChanges } = useDraftModel();

  const handleSave = () => {
    if (selectedModel && hasDraftChanges) {
      saveDraftModelField();
    } else {
      console.warn('[ModelTopBar] Cannot save: no selected model or no draft changes');
    }
  };

  const handleCancel = () => {
    discardChanges();
  };

  return (
    <SlotBar divider backgroundColor={theme.sys.color.surface}>
      <LeftSlot padding={2}>
        <Text weight='bold' color='primary'>{selectedModel?.label}</Text>
      </LeftSlot>
      <RightSlot>
        {hasDraftChanges && (
          <Button
            color='default'
            onClick={handleCancel}
            disabled={!hasDraftChanges}
          >
            Discard changes
          </Button>
        )}
        <Button
          color={hasDraftChanges ? 'primary' : 'default'}
          onClick={handleSave}
          disabled={!hasDraftChanges || !selectedModel}
        >
          Save
        </Button>
      </RightSlot>
    </SlotBar>
  );
};
