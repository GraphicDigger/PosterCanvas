/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo } from 'react';
import { parseSizeFromUI, formatSizeForUI } from '../../../../shared/lib';
import { WindowPopover, WindowTrigger, Window, WindowBody } from '../../../../shared/uiKit/Window';
import { Field, Label, TextField, FieldList } from '../../../../shared/uiKit/Fields';
import { ActionWrapper } from '../../../../shared/uiKit/ActionWrapper';
import { useVariableModeMutation, VARIABLE_MODE_TYPE } from '../../model';
import { VARIABLE_MODE_GROUP_TYPE } from '../../../varModeGroup';

export const VariableModeSettingsWindow = ({ children, variableMode }) => {

  const { updateVariableMode } = useVariableModeMutation();

  const handleUpdateVariable = useCallback((updates) => {
    updateVariableMode(variableMode.id, updates);
  }, [updateVariableMode]);

  const handleUpdateMin = useCallback((value) => {
    handleUpdateVariable({ meta: { minWidth: parseSizeFromUI(value) } });
  }, [handleUpdateVariable]);

  const handleUpdateMax = useCallback((value) => {
    handleUpdateVariable({ meta: { maxWidth: parseSizeFromUI(value) } });
  }, [handleUpdateVariable]);

  const handleUpdateThemeValue = useCallback((value) => {
    handleUpdateVariable({ meta: { value } });
  }, [handleUpdateVariable]);

  const {
    displayValue: displayMinValue,
    placeholder: minPlaceholder,
    isPx: isMinPx,
  } = useMemo(() => formatSizeForUI(variableMode?.meta?.minWidth), [variableMode?.meta?.minWidth]);

  const {
    displayValue: displayMaxValue,
    placeholder: maxPlaceholder,
    isPx: isMaxPx,
  } = useMemo(() => formatSizeForUI(variableMode?.meta?.maxWidth), [variableMode?.meta?.maxWidth]);

  // console.log('variableMode', variableMode);

  const content = useMemo(() => {
    if (variableMode.modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.BREAKPOINT) {
      return (
        <>
          <Field>
            <Label>Name</Label>
            <TextField
              width={170}
              value={variableMode.name}
              onChange={(value) => handleUpdateVariable({ name: value })}
            />
          </Field>
          <Field>
            <Label>Max</Label>
            <TextField
              width={170}
              value={displayMaxValue}
              onChange={handleUpdateMax}
            />
          </Field>
          <Field>
            <Label>Min</Label>
            <TextField
              width={170}
              value={displayMinValue}
              onChange={handleUpdateMin}
            />
          </Field>
        </>
      );
    }
    if (variableMode.modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.THEME) {
      return (
        <>
          <Field>
            <Label>Name</Label>
            <TextField
              width={170}
              value={variableMode.name}
              onChange={(value) => handleUpdateVariable({ name: value })}
            />
          </Field>
          <Field>
            <Label>Value</Label>
            <TextField
              width={170}
              value={variableMode.meta.value}
              onChange={handleUpdateThemeValue}
            />
          </Field>
        </>
      );
    }
    return (
      <Field>
        <Label>Name</Label>
        <TextField
          width={170}
          value={variableMode.name}
          onChange={(value) => handleUpdateVariable({ name: value })}
        />
      </Field>
    );
  }, [variableMode, handleUpdateVariable]);

  return (
    <WindowPopover
      placement='right-start'
      offset={17}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        <ActionWrapper>
          {children}
        </ActionWrapper>
      </WindowTrigger>
      <Window>
        <WindowBody>
          <FieldList gap={1}>
            {content}
          </FieldList>
        </WindowBody>
      </Window>
    </WindowPopover>

  );
};
