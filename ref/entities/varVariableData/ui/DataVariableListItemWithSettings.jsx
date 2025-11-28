/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, useEffect } from 'react';
import { MinusIcon, PlusIcon } from '@/shared/assets/icons';
import { List } from '@/shared/uiKit/List';
import { WindowPopover, WindowTrigger, Window, WindowBody } from '@/shared/uiKit/Window';
import { Field, Label, TextField, Select } from '@/shared/uiKit/Fields';
import { Stack } from '@/shared/uiKit/Stack';
import { ActionWrapper } from '@/shared/uiKit/ActionWrapper';
import { ENTITY_KINDS } from '@/shared/constants';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useDataModels } from '@/entities/dataModel';
import { VARIABLE_TYPES } from '@/shared/constants';
import { DataVariableListItem } from './DataVariableListItem';
import { useVariableMutation } from '../model';

export const DataVariableListItemWithSettings = ({ children, variable }) => {

  const { updateVariable } = useVariableMutation();

  const handleUpdateVariable = useCallback((id, value) => {
    updateVariable(id, value);
  }, [updateVariable]);

  return (
    <WindowPopover
      placement='right-start'
      offset={16}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        <ActionWrapper>
          <DataVariableListItem variable={variable} />
        </ActionWrapper>
      </WindowTrigger>
      <Window>
        <WindowBody>
          <Stack direction='column' gap={2}>
            <Field direction='column'>
              <Label>Name</Label>
              <TextField value={variable.name} onChange={(value) => handleUpdateVariable(variable.id, { name: value })} />
            </Field>
            <Field direction='column'>
              <Label>Type</Label>
              <TextField disabled value={variable.type} onChange={(value) => handleUpdateVariable(variable.id, { type: value })} />
            </Field>
            <Field direction='column'>
              <Label>Value</Label>
              <ValueField type={variable.type} value={variable.value} onChange={(value) => handleUpdateVariable(variable.id, { value: value })} />
            </Field>
          </Stack>
        </WindowBody>
      </Window>
    </WindowPopover>

  );
};

const ValueField = ({ type, value, onChange }) => {

  const { allModels } = useDataModels();

  switch (type) {
  case VARIABLE_TYPES.STRING:
    return (
      <TextField
        value={value}
        onChange={(value) => onChange(value)}
      />
    );
  case VARIABLE_TYPES.NUMBER:
    return (
      <TextField
        value={value}
        onChange={(value) => onChange(value)}
      />
    );
  case VARIABLE_TYPES.BOOLEAN:
    return (
      <Select
        value={value}
        onChange={(value) => onChange(value)}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>
    );
  case VARIABLE_TYPES.COLOR:
    return (
      <TextField
        value={value}
        onChange={(value) => onChange(value)}
      />
    );
  case VARIABLE_TYPES.DATA:
    return (
      <Select
        value={typeof value === 'object' && value !== null ? value.id : ''}
        onChange={(selectedModelId) => {
          const newBindingObject = {
            type: ENTITY_KINDS.DATA_MODEL,
            id: selectedModelId,
          };
          onChange(newBindingObject);
        }}
      >
        {allModels.map((model) => (
          <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>
        ))}
      </Select>
    );
  default:
    return null;
  }
};
