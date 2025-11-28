/** @jsxImportSource @emotion/react */
import React from 'react';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { PROPERTY_TYPES, STYLE_PROPERTIES } from '../../../../../entities/uiElement';
import { BindVariableToPropertyPicker } from '../../../../../entities/binding';
import { TextField } from '../../../../../shared/uiKit/Fields';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { useAbsoluteProperty } from '../../model';

export const Spacing = ({ children }) => {

  const {
    top,
    right,
    bottom,
    left,
    updateTopValue,
    updateRightValue,
    updateBottomValue,
    updateLeftValue,
  } = useAbsoluteProperty();

  const handleTop = (value) => updateTopValue(value);
  const handleBottom = (value) => updateBottomValue(value);
  const handleLeft = (value) => updateLeftValue(value);
  const handleRight = (value) => updateRightValue(value);

  return (
    <Stack justify='center' align='center'>
      <HorizontalSpacing left={left} right={right} handleLeft={handleLeft} handleRight={handleRight}>
        <VerticalSpacing top={top} bottom={bottom} handleTop={handleTop} handleBottom={handleBottom}>
          {children}
        </VerticalSpacing>
      </HorizontalSpacing>
    </Stack >
  );
};

const HorizontalSpacing = ({ left, right, handleLeft, handleRight, children }) => {
  return (
    <Stack direction='row' gap={1}>
      <BindVariableToPropertyPicker
        propertyType={PROPERTY_TYPES.STYLE}
        propertyName={STYLE_PROPERTIES.left}
        propertyValue={left.value}
        window={{ offset: 17 }}
      >
        <TextField
          value={left.displayValue}
          placeholder={left.placeholder}
          onChange={handleLeft}
          alignText='center'
        />
      </BindVariableToPropertyPicker>
      {children}
      <BindVariableToPropertyPicker
        propertyType={PROPERTY_TYPES.STYLE}
        propertyName={STYLE_PROPERTIES.right}
        propertyValue={right.value}
        window={{ offset: 160 }}
      >
        <TextField
          value={right.displayValue}
          placeholder={right.placeholder}
          onChange={handleRight}
          alignText='center'
        />
      </BindVariableToPropertyPicker>
    </Stack>
  );
};

const VerticalSpacing = ({ top, bottom, handleTop, handleBottom, children }) => {
  return (
    <Stack gap={1}>
      <BindVariableToPropertyPicker
        width={60}
        propertyType={PROPERTY_TYPES.STYLE}
        propertyName={STYLE_PROPERTIES.top}
        propertyValue={top.value}
        window={{ offset: 96 }}
      >
        <TextField
          value={top.displayValue}
          placeholder={top.placeholder}
          onChange={handleTop}
          alignText='center'
        />
      </BindVariableToPropertyPicker>
      {children}
      <BindVariableToPropertyPicker
        width={60}
        propertyType={PROPERTY_TYPES.STYLE}
        propertyName={STYLE_PROPERTIES.bottom}
        propertyValue={bottom.value}
        window={{ offset: 96 }}
      >
        <TextField
          value={bottom.displayValue}
          placeholder={bottom.placeholder}
          onChange={handleBottom}
          alignText='center'
        />
      </BindVariableToPropertyPicker>
    </Stack>
  );
};
