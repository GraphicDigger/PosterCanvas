/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@/app/providers';
import { lineColors } from '@/shared/styles';
import { PlusIcon, FullScreenIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { Button } from '@/shared/uiKit/Button';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Divider } from '@/shared/uiKit/Divider';
import { ActionPanel, ActionListItem, useActionsByEntity } from '@/entities/action';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useFocusEntity } from '@/entities/uiFocus';
import { useChangeAction } from '../model';
import { TriggerPicker } from './components/TriggerPicker';
import { ActionPicker } from './components/ActionPicker';
import { ActionControl } from './components/ActionControl';

export const ActionBuilder = () => {

  const { focusEntity } = useFocusEntity();
  const { entityActions } = useActionsByEntity(focusEntity?.id, focusEntity?.kind);
  const { toggleActionInDesignMode } = useDesignMode();

  return (
    <>
      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <ButtonTool onClick={toggleActionInDesignMode}>
            <FullScreenIcon />
          </ButtonTool>
          <TriggerPicker
            triggerSlot={<Button startIcon={<PlusIcon />} disabled={!focusEntity} > Add Action</Button>}
            placement='bottom-end'
            offset={-36}
          />
        </SectionPanelHeader>
      </SectionPanel>
      {entityActions?.map(action => (
        <ActionControl
          key={action.id}
          action={action}
        />
      ))}
    </>
  );
};

