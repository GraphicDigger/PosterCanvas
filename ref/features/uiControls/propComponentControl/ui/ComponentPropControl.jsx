/** @jsxImportSource @emotion/react */
import React from 'react';
import { MinusIcon, PlusIcon } from '../../../../shared/assets/icons';
import { List } from '../../../../shared/uiKit/List';
import { WindowPopover, WindowTrigger, Window, WindowBody } from '../../../../shared/uiKit/Window';
import { Field, Label, TextField } from '../../../../shared/uiKit/Fields';
import { Stack } from '../../../../shared/uiKit/Stack';
import { ActionWrapper, RightAction } from '../../../../shared/uiKit/ActionWrapper';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PropListItem } from '../../../../entities/varProp';
import { PropValueListItem } from '../../../../entities/varPropValue';
import { usePropControl } from '../model/hooks/usePropControl';
import { PROP_SETTINGS_MAP } from './components';

export const ComponentPropControl = () => {

  const {
    selectedComponent,
    updatePropValueName,
    updatePropValue,
    deleteProp,
    addPropValue,
  } = usePropControl();

  // console.log('[ComponentPropControl] selectedComponent', selectedComponent)

  return (
    <List gap={1}>
      {selectedComponent?.props?.map((prop) => {
        const SettingsComponent = PROP_SETTINGS_MAP[prop.type];
        return (
          <React.Fragment key={prop.id}>
            <WindowPopover
              placement='left-start'
              offset={16}
              flip={true}
              shift={true}
              closeOnSelect={false}
            // openOnDoubleClick
            >
              <WindowTrigger>
                <ActionWrapper>
                  <PropListItem prop={prop} actionsSlot={
                    <ButtonTool onClick={(e) => addPropValue(prop.id, prop.type, e)}>
                      <PlusIcon />
                    </ButtonTool>
                  } />
                  <RightAction onClick={() => deleteProp(prop.id)}><MinusIcon /></RightAction>
                </ActionWrapper>
              </WindowTrigger>
              <Window>
                <WindowBody>
                  {SettingsComponent && <SettingsComponent prop={prop} />}
                </WindowBody>
              </Window>
            </WindowPopover>
            {prop.values.length > 0 && (
              <List paddingLeft={4}>
                {prop.values.map(propValue => (
                  <WindowPopover
                    key={propValue.id}
                    placement='left-start'
                    offset={16}
                    flip={true}
                    shift={true}
                    closeOnSelect={false}
                    openOnDoubleClick
                  >
                    <WindowTrigger>
                      <PropValueListItem prop={propValue} />
                    </WindowTrigger>
                    <Window>
                      <WindowBody>
                        <Stack direction='column' gap={2}>
                          <Field direction='column'>
                            <Label>Name</Label>
                            <TextField
                              value={propValue.name}
                              onChange={(value) => updatePropValueName(propValue.id, propValue.propId, value)}
                            />
                          </Field>
                          <Field direction='column'>
                            <Label>Value</Label>
                            <TextField
                              value={propValue.value}
                              onChange={(value) => updatePropValue(propValue.id, propValue.propId, value)}
                            />
                          </Field>
                        </Stack>
                      </WindowBody>
                    </Window>
                  </WindowPopover>
                ))}
              </List>
            )}
          </React.Fragment>
        );
      })}
    </List >
  );
};
