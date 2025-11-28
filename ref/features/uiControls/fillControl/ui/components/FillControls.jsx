/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { PlusIcon } from '@/shared/assets/icons';
import { List } from '@/shared/uiKit/List';
import { TextField } from '@/shared/uiKit/Fields';
import { PROPERTY_TYPES, STYLE_PROPERTIES } from '@/entities/uiElement';
import { BindVariableToPropertyPicker } from '@/entities/binding';
import { Stack } from '@/shared/uiKit/Stack';
import { HEXColorInput } from '@/shared/uiKit/Color';
import { ColorPreview } from '@/shared/uiKit/ColorPreview';
import { FillPicker } from '@/shared/uiKit/FillPicker';
import { useFill } from '../../model';

export const FillControl = () => {

  const {
    backgroundColorValue,
    displayColor,
    currentFormat,
    colorHexValue,
    opacity,
    updateBackgroundColor,
    updateColorFormat,
  } = useFill();


  const handleUpdateBackgroundColor = (color) => {
    updateBackgroundColor(color);
  };

  const content = useMemo(() => {
    if (backgroundColorValue) {
      return (
        <BindVariableToPropertyPicker
          propertyType={PROPERTY_TYPES.STYLE}
          propertyName={STYLE_PROPERTIES.backgroundColor}
          propertyValue={backgroundColorValue}
          window={{ offset: 16 }}
        >
          <HEXColorInput
            value={colorHexValue}
            onChange={handleUpdateBackgroundColor}
            opacity={opacity}
          >
            <FillPicker
              window={{ offset: 24 }}
              value={displayColor} // color value
              onChangeValue={handleUpdateBackgroundColor}
              format={currentFormat} // color format
              onChangeFormat={updateColorFormat}
              opacity={opacity} // opacity
              onChangeOpacity={() => { }}
            >
              <ColorPreview color={backgroundColorValue.value} />
            </FillPicker>
          </HEXColorInput>
        </BindVariableToPropertyPicker>
      );
    }
    // if (backgroundImageValue) {
    //     return (
    //         <PropertyBinder
    //             propertyType={PROPERTY_TYPES.STYLE}
    //             propertyName={STYLE_PROPERTIES.backgroundImage}
    //             propertyValue={backgroundImageValue.value}
    //             width='fill'
    //         >
    //             <TextField
    //                 value={backgroundImageValue.value}
    //                 onChange={handleUpdateFill}
    //             />
    //         </PropertyBinder>
    //     )
    // }
    return null;
  }, [backgroundColorValue]);

  return content;
};

