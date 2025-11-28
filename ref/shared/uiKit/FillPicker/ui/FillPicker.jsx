/** @jsxImportSource @emotion/react */
import React, { useMemo, useCallback, useState } from 'react';
import { Stack } from '../../Stack';
import { Button } from '../../Button';
import { ColorPicker } from './components/ColorPicker';
import { WindowHead, WindowBody, WindowPopover, WindowTrigger, Window } from '../../Window';
import { ButtonTool, ButtonToolToggle } from '../../ButtonTool';
import { FillColorIcon, FillGradientIcon, FillRadialGradientIcon, FillImageIcon } from '../../../assets/icons';
import dummy from '../../../assets/dummy/fill_dummy.png';
import { DotBind } from '../../DotBind';
import { FILL_PICKER_TABS } from '../model';


export const FillPicker = ({
  children,
  window,
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

  const [pickerType, setPickerType] = useState(FILL_PICKER_TABS.COLOR);

  const handleSetDefaultValue = useCallback((type) => {
    if (type === FILL_PICKER_TABS.COLOR) {
      onChangeValue('#D9D9D9');
    }
    if (type === FILL_PICKER_TABS.GRADIENT) {
      onChangeValue('#D9D9D9');
    }
    if (type === FILL_PICKER_TABS.RADIAL_GRADIENT) {
      onChangeValue('#D9D9D9');
    }
    if (type === FILL_PICKER_TABS.IMAGE) {
      onChangeValue(`url(${dummy})`);
    }
  }, [onChangeValue]);


  const body = useMemo(() => {
    if (pickerType === FILL_PICKER_TABS.COLOR) {
      return (
        <ColorPicker
          value={value}
          onChangeValue={onChangeValue}
          format={format}
          onChangeFormat={onChangeFormat}
          opacity={opacity}
          onChangeOpacity={onChangeOpacity}
        />
      );
    }
    if (pickerType === FILL_PICKER_TABS.GRADIENT) {
      return (
        <> Gradient </>
      );
    }
    if (pickerType === FILL_PICKER_TABS.RADIAL_GRADIENT) {
      return (
        <> Radial gradient </>
      );
    }
    if (pickerType === FILL_PICKER_TABS.IMAGE) {
      return (
        <Stack gap={1}>
          <Button color='primary' stretch>Upload a new image</Button>
          <Button color='default' stretch>Choose from Image Assets </Button>
          <Button color='default' stretch>Paste from Variable</Button>
        </Stack>
      );
    }
  }, [
    pickerType,
    format,
    onChangeValue,
    onChangeFormat,
    opacity,
    onChangeOpacity,
  ]);

  return (

    <WindowPopover
      placement='left-start'
      offset={window?.offset || 16}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        {children || <DotBind />}
      </WindowTrigger>
      <Window>
        <WindowHead paddingLeft={4}>
          <ButtonToolToggle
            value={pickerType}
            onChange={setPickerType}
          >
            <ButtonTool
              value={FILL_PICKER_TABS.COLOR}
              onClick={() => handleSetDefaultValue(FILL_PICKER_TABS.COLOR)}
            >
              <FillColorIcon />
            </ButtonTool>
            <ButtonTool value={FILL_PICKER_TABS.GRADIENT}>
              <FillGradientIcon />
            </ButtonTool>
            <ButtonTool value={FILL_PICKER_TABS.RADIAL_GRADIENT}>
              <FillRadialGradientIcon />
            </ButtonTool>
            <ButtonTool
              value={FILL_PICKER_TABS.IMAGE}
              onClick={() => handleSetDefaultValue(FILL_PICKER_TABS.IMAGE)}
            >
              <FillImageIcon />
            </ButtonTool>
          </ButtonToolToggle>
        </WindowHead>
        <WindowBody>
          {body}
        </WindowBody>
      </Window>
    </WindowPopover >
  );
};
