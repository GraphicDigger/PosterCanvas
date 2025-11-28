import { useState } from 'react';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { Field, Label, TextField, Select } from '../../../../../shared/uiKit/Fields';
import { usePropControl } from '../../model/hooks/usePropControl';
import { MenuItem } from '../../../../../shared/uiKit/Menu';
import { useDataModels } from '../../../../../entities/dataModel';

export const DataSettings = ({ prop }) => {

  const {
    updatePropName,
    updatePropType,
    updatePropDefaultValue,
  } = usePropControl();

  const { allModels } = useDataModels();

  const [nummberOfRecords, setNumberOfRecords] = useState(3);

  return (
    <Stack direction='column' gap={2}>
      <Field direction='column'>
        <Label>Name</Label>
        <TextField
          value={prop.name}
          onChange={(value) => updatePropName(prop.id, value)}
        />
      </Field>
      <Field direction='column'>
        <Label>Type</Label>
        <TextField
          disabled
          value={prop.type}
          onChange={(value) => updatePropType(prop.id, value)}
        />
      </Field>
      <Stack direction='row' gap={2}>
        <Field direction='column'>
          <Label>Collection</Label>
          <Select
            value={typeof prop.defaultValue === 'object' && prop.defaultValue !== null ? prop.defaultValue.modelId : ''}
            onChange={(selectedModelId) => {
              updatePropDefaultValue(prop.id, { modelId: selectedModelId });
            }}
          >
            {allModels.map((model) => (
              <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>
            ))}
          </Select>
        </Field>
        <Field direction='column' width={100}>
          <Label>Records</Label>
          <TextField
            value={nummberOfRecords}
            onChange={(value) => setNumberOfRecords(value)}
          />
        </Field>
      </Stack>
    </Stack>
  );
};
