import React, { useMemo, useCallback } from 'react';
import { Stack } from '../../../Stack';
import { TextField } from '../../../Fields';
import { useFill } from '../../../../../features/uiControls/fillControl/model/hooks/useFill';
import { Select } from '../../../Fields';
import { MenuItem } from '../../../Menu';
import { HEXColorInput, RGBColorInput, HSBColorInput, HSLColorInput } from '../../../Color';
import { COLOR_FORMAT } from '../../../../constants';

export const ColorPicker = ({
  // color value
  value,
  onChangeValue,
  // color format
  format,
  onChangeFormat,
  // opacity
  opacity,
  onChangeOpacity,
}) => {

  const handleChangeFormat = useCallback((format) => {
    onChangeFormat(format);
  }, [onChangeFormat]);

  const swatch = useMemo(() => {
    if (format === COLOR_FORMAT.HEX) {
      return (
        <HEXColorInput
          value={value}
          onChange={onChangeValue}
          opacity={opacity}
        />
      );
    }
    if (format === COLOR_FORMAT.RGB) {
      return (
        <RGBColorInput
          value={value}
          onChange={onChangeValue}
          opacity={opacity}
        />
      );
    }
    if (format === COLOR_FORMAT.HSB) {
      return (
        <HSBColorInput
          value={value}
          onChange={onChangeValue}
          opacity={opacity}
        />
      );
    }
  }, [
    value,
    opacity,
    format,
    onChangeValue,
    onChangeFormat,
  ]);

  return (

    <Stack direction='row' gap={1}>
      <Select
        width={86}
        value={format}
        onChange={handleChangeFormat}
      >
        <MenuItem value={COLOR_FORMAT.HEX}>
                    HEX
        </MenuItem>
        <MenuItem value={COLOR_FORMAT.RGB}>
                    RGB
        </MenuItem>
        <MenuItem value={COLOR_FORMAT.HSB}>
                    HSB
        </MenuItem>
      </Select>
      {swatch}
    </Stack>

  );
};
