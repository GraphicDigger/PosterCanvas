import React, { memo } from 'react';
import { useTheme } from '@emotion/react';
import { surfaceColors } from '@/shared/styles';
import { Window, WindowHead, WindowBody } from '@/shared/uiKit/Window';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { CodeField } from '@/shared/uiKit/FieldCode/FieldCode';
import { Connector } from '@/shared/uiKit/Connector';
import { ConfigList } from './ConfigList';
import { ACTION_TYPES } from '@/entities/action/model';
import { useChangeAction } from '../../model';
import { ActionPicker } from './ActionPicker';
import { TriggerPicker } from './TriggerPicker';
import { Button } from '@/shared/uiKit/Button';


export const ActionControlCanvasCard = memo(({ action }) => {

  const theme = useTheme();

  const { handleUpdateActionType, handleUpdateActionConfig } = useChangeAction();

  const handleCodeChange = (value) => {
    const codeValue = typeof value === 'string' ? value : value?.target?.value || '';
    handleUpdateActionConfig(action.id, 'code', codeValue);
  };

  return (
    <Connector
      onTopClick={() => { }}
      onRightClick={() => { }}
      onBottomClick={() => { }}
      onLeftClick={() => { }}
    >
      <Window width={300} backgroundColor={theme.sys.color.surfaceContainer.lowest}>
        <WindowHead padding={0} paddingLeft={0}>
          <SlotBar>
            <LeftSlot >
              <ActionPicker
                actionId={action.id}
                triggerSlot={<Button variant='blank' color='default'> {action?.name}</Button>}
                placement='left-start'
                offset={9}
              />
            </LeftSlot>
            <RightSlot>
              <TriggerPicker
                action={action}
                triggerSlot={<Button variant='blank' color='default'> {action?.trigger}</Button>}
                placement='right-start'
                offset={-60}
              />
            </RightSlot>
          </SlotBar>
        </WindowHead>
        <WindowBody>
          {action.type === ACTION_TYPES.CUSTOM_ACTION ? (
            <CodeField
              value={action.config.code || ''}
              onChange={handleCodeChange}
            />
          ) : (
            <ConfigList
              action={action}
              onConfigChange={handleUpdateActionConfig}
            />
          )}
        </WindowBody>
      </Window>
    </Connector >
  );
});
