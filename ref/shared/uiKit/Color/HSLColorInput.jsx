import { Stack } from '../Stack';
import { TextField, SegmentedField } from '../Fields';
import { useColor } from '../FillPicker/model';


export const HSLColorInput = ({ value, onChange }) => {

  const handleHChange = (value) => onChange('h', value);
  const handleSChange = (value) => onChange('s', value);
  const handleLChange = (value) => onChange('l', value);

  return (
    <SegmentedField>
      <TextField
        value={value.h}
        onChange={handleHChange}
        numeric
        min={0}
        max={360}
      />
      <TextField
        value={value.s}
        onChange={handleSChange}
        numeric
        min={0}
        max={100}
      />
      <TextField
        value={value.l}
        onChange={handleLChange}
        numeric
        min={0}
        max={100}
      />
      <TextField
        value={value.opacity}
        onChange={onChange}
        numeric
        min={0}
        max={100}
      />
    </SegmentedField>
  );
};
