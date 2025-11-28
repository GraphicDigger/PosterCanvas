import { Stack } from '../../../../../shared/uiKit/Stack';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { usePropControl } from '../../model/hooks/usePropControl';


export const PropSettings = ({ prop }) => {

  const {
    updatePropName,
    updatePropType,
    updatePropDefaultValue,
  } = usePropControl();

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
      <Field direction='column'>
        <Label>Default value</Label>
        <TextField
          value={prop.defaultValue}
          onChange={(value) => updatePropDefaultValue(prop.id, value)}
        />
      </Field>
    </Stack>
  );
};
