import React from 'react';
import { WindowPopover, WindowTrigger, Window, WindowBody } from '../../../../shared/uiKit/Window';
import { ActionWrapper, RightAction } from '../../../../shared/uiKit/ActionWrapper';
import { MinusIcon } from '../../../../shared/assets/icons';
import { FieldList } from '../../../../shared/uiKit/Fields';
import { EPreset } from '../../../../entities/varPreset';
import {
  FontFamilyField,
  WeightField,
  SizeField,
  LineField,
  LetterField,
  AlignField,
} from './fields';
import { useTypographyPreset } from '../model/hooks/useTypographyPreset';

export const TypographyPresetControl = ({ boundPreset, onRemovePreset }) => {

  const {
    fontFamily,
    fontWeight,
    textAlign,
    fontSize,
    lineHeight,
    letterSpacing,
    handleUpdateFontFamily,
    handleUpdateFontSize,
    handleUpdateFontWeight,
    handleUpdateLineHeight,
    handleUpdateLetterSpacing,
    handleUpdateTextAlign,
  } = useTypographyPreset(boundPreset);

  // console.log('[TypographyPresetControl] presetModeValue', presetModeValue)

  return (
    <ActionWrapper>
      <WindowPopover
        placement='left-start'
        offset={17}
        flip={true}
        shift={true}
        closeOnSelect={false}
      >
        <WindowTrigger width='fill'>
          <EPreset
            uiView='binding'
            preset={boundPreset}
          />
        </WindowTrigger>
        <Window position='left' offset={{ top: 0, left: -261 }}>
          <WindowBody>
            <FieldList gap={1}>
              <FontFamilyField
                value={fontFamily}
                onChange={handleUpdateFontFamily}
              />
              <WeightField
                value={fontWeight}
                onChange={handleUpdateFontWeight}
              />
              <SizeField
                value={fontSize}
                onChange={handleUpdateFontSize}
              />
              <LineField
                value={lineHeight}
                onChange={handleUpdateLineHeight}
              />
              <LetterField
                value={letterSpacing}
                onChange={handleUpdateLetterSpacing}
              />
              <AlignField
                value={textAlign}
                onChange={handleUpdateTextAlign}
              />
            </FieldList>
          </WindowBody>
        </Window>
      </WindowPopover>
      <RightAction onClick={onRemovePreset}>
        <MinusIcon />
      </RightAction>
    </ActionWrapper>
  );
};
