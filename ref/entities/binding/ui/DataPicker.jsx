import React, { useState, useMemo } from 'react';
import { ButtonToolToggle, ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PropsIcon, VariableIcon } from '@/shared/assets/icons';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody, WindowTitle } from '@/shared/uiKit/Window';
import { useVariables, DataVariableListItem } from '@/entities/varVariableData';
import { List } from '@/shared/uiKit/List';
import { Box } from '@/shared/uiKit/Box';
import { PropListItem } from '@/entities/varProp';
import { useBindVariableToElement, DATA_PICKER_TABS, useDataPicker } from '../model';

export const DataPicker = ({
  children,
  windowSetting = { offset: 207 },
}) => {

  const {
    pickerType,
    setPickerType,
    isScreenCanvas,
    isComponentCanvas,
    variables,
    props,
  } = useDataPicker();

  const { bindElementToVariable } = useBindVariableToElement();

  const handleBindElementToVariable = (variable) => {
    bindElementToVariable(variable);
  };

  const content = useMemo(() => {
    if (pickerType === DATA_PICKER_TABS.DATA_VARIABLES) {
      return (
        <>
          {variables.map((variable) => (
            <DataVariableListItem
              key={variable.id}
              variable={variable}
              onClick={() => handleBindElementToVariable(variable)}
            />
          ))}
        </>
      );
    }
    if (pickerType === DATA_PICKER_TABS.PROPS) {
      return (
        <>
          {props.map((prop) => (
            <PropListItem
              key={prop.id}
              prop={prop}
              onClick={() => handleBindElementToVariable(prop)}
            />
          ))}
        </>
      );
    }
    return null;
  }, [pickerType, variables, handleBindElementToVariable]);

  return (
    <WindowPopover
      placement='left-start'
      offset={windowSetting.offset}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        {children}
      </WindowTrigger>
      <Window>
        <WindowHead paddingLeft={isComponentCanvas ? 4 : 8}>
          {isScreenCanvas && <WindowTitle>Screen Variables</WindowTitle>}
          {isComponentCanvas &&
                        <ButtonToolToggle
                          style='tertiary'
                          value={pickerType}
                          onChange={setPickerType}
                        >
                          <ButtonTool value={DATA_PICKER_TABS.DATA_VARIABLES}>
                            <VariableIcon />
                          </ButtonTool>
                          <ButtonTool value={DATA_PICKER_TABS.PROPS}>
                            <PropsIcon />
                          </ButtonTool>
                        </ButtonToolToggle>

          }
          <Box height={14} />
        </WindowHead>
        <WindowBody>
          <List>
            {content}
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};
