import { Stack } from '../Stack';
import { TextField, StartSlot, SegmentedField } from '../Fields';
import { ColorPreview } from '../ColorPreview';

export const HEXColorInput = ({
  children,
  value,
  onChange,
  opacity,
  ...restProps
}) => {

  return (
    <SegmentedField >
      <TextField
        value={value}
        onChange={onChange}
        {...restProps}
      >
        <StartSlot>
          {children ? children : <ColorPreview color={value} />}
        </StartSlot>
      </TextField>
      {opacity && (
        <TextField
          value={opacity}
          onChange={onChange}
          width={89}
          {...restProps}
        >
        </TextField>
      )}
    </SegmentedField>
  );
};
