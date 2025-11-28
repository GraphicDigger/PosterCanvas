import React, { memo } from 'react';
import { MinusIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Button } from '@/shared/uiKit/Button';
import { CodeIcon } from '@/shared/assets/icons';
import { ACTION_TYPES, ActionListItem } from '@/entities/action';
import { ConfigList } from './ConfigList';
import { useChangeAction } from '../../model';
import { TriggerPicker } from './TriggerPicker';
import { ActionPicker } from './ActionPicker';

export const ActionControl = memo(({ action }) => {

  return (
    <SectionPanel key={action.id} dividerBottom>
      <SectionPanelHeader paddingLeft={8}>
        <TriggerPicker
          action={action}
          triggerSlot={<Button variant='blank' color='default'><p className='body-12-bd'>{action?.trigger}</p></Button>}
          placement='left-start'
          offset={0}
        />
        <ButtonTool  >
          <MinusIcon />
        </ButtonTool>
      </SectionPanelHeader>
      <SectionPanelBody>
        <ActionPicker
          actionId={action.id}
          triggerSlot={<ActionListItem action={action} />}
          placement='left-start'
          offset={17}
        />
        {action.type !== ACTION_TYPES.CUSTOM_ACTION
          ? <ConfigList action={action} />
          : <Button
            startIcon={<CodeIcon />}
            stretch
            lite
            variant='filled'
            color='primary'
            onClick={() => { console.log('edit code'); }}
          > Edit Code
          </Button>
        }
      </SectionPanelBody>
    </SectionPanel>

  );
});
