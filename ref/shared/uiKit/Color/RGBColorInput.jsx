import { Stack } from '../Stack';
import { TextField, SegmentedField } from '../Fields';
import { useColor } from '../FillPicker/model';


export const RGBColorInput = ({
  value,
  opacity,
  onChange,
}) => {

  const handleRChange = (newR) => onChange({ ...value, r: newR });
  const handleGChange = (newG) => onChange({ ...value, g: newG });
  const handleBChange = (newB) => onChange({ ...value, b: newB });
  const handleOpacityChange = (newOpacity) => onChange({ ...value, opacity: newOpacity });

  return (
    <SegmentedField>
      <TextField
        value={value.r}
        onChange={handleRChange}
        numeric
        min={0}
        max={255}
      />
      <TextField
        value={value.g}
        onChange={handleGChange}
        numeric
        min={0}
        max={255}
      />
      <TextField
        value={value.b}
        onChange={handleBChange}
        numeric
        min={0}
        max={255}
      />
      <TextField
        value={opacity}
        onChange={handleOpacityChange}
        numeric
        min={0}
        max={100}
      />
    </SegmentedField>
  );
};
