import { Stack } from '../Stack';
import { TextField, SegmentedField } from '../Fields';
import { useColor } from '../FillPicker/model';


export const HSBColorInput = ({ value, opacity, onChange, onOpacityChange }) => {

  const handleHChange = (newH) => onChange({ ...value, h: newH });
  const handleSChange = (newS) => onChange({ ...value, s: newS });
  const handleBChange = (newB) => onChange({ ...value, b: newB });
  const handleOpacityChange = (newOpacity) => {
    if (onOpacityChange) {
      onOpacityChange(newOpacity);
    }
  };

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
        value={value.b}
        onChange={handleBChange}
        numeric
        min={0}
        max={100}
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
