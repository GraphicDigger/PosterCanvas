/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { Field, Label } from '../../../../shared/uiKit/Fields';
import { TextField, EndSlot } from '../../../../shared/uiKit/Fields';
import { ButtonTool, ButtonToolGroup } from '../../../../shared/uiKit/ButtonTool';
import { SizeFillWidthIcon, SizeFillHeightIcon, SizeFitWidthIcon, SizeFitHeightIcon } from '../../../../shared/assets/icons';
import { PROPERTY_TYPES, STYLE_PROPERTIES } from '../../../../entities/uiElement';
import { BindVariableToPropertyPicker } from '../../../../entities/binding';
import { useSizeControl } from '../model/useSizeControl';

export const SizeControl = () => {
  const {
    widthValue,
    heightValue,
    displayWidthValue,
    widthPlaceholder,
    displayHeightValue,
    heightPlaceholder,
    handleUpdateWidth,
    handleUpdateHeight,
    handleSetFitWidth,
    handleSetFitHeight,
    handleSetFillWidth,
    handleSetFillHeight,
  } = useSizeControl();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelBody marginTop>
        <Field>
          <Label data-testid="property-label-width">Width</Label>
          <BindVariableToPropertyPicker
            width={150}
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.width}
            propertyValue={widthValue}
            window={{ offset: 85 }}
          >
            <TextField
              data-testid="property-input-width"
              value={displayWidthValue}
              onChange={handleUpdateWidth}
              bufferOnBlur
              placeholder={widthPlaceholder}
            >
              <EndSlot>
                <ButtonToolGroup fill={false}>
                  <ButtonTool onClick={handleSetFitWidth}>
                    <SizeFitWidthIcon />
                  </ButtonTool>
                  <ButtonTool onClick={handleSetFillWidth}>
                    <SizeFillWidthIcon />
                  </ButtonTool>
                </ButtonToolGroup>
              </EndSlot>
            </TextField>
          </BindVariableToPropertyPicker>
        </Field>
        <Field>
          <Label data-testid="property-label-height">Height</Label>
          <BindVariableToPropertyPicker
            width={150}
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.height}
            propertyValue={heightValue}
            window={{
              offset: 85,
            }}
          >
            <TextField
              data-testid="property-input-height"
              value={displayHeightValue}
              onChange={handleUpdateHeight}
              bufferOnBlur
              placeholder={heightPlaceholder}
            >
              <EndSlot>
                <ButtonToolGroup fill={false}>
                  <ButtonTool onClick={handleSetFitHeight}>
                    <SizeFitHeightIcon />
                  </ButtonTool>
                  <ButtonTool onClick={handleSetFillHeight}>
                    <SizeFillHeightIcon />
                  </ButtonTool>
                </ButtonToolGroup>
              </EndSlot>
            </TextField>
          </BindVariableToPropertyPicker>
        </Field>
      </SectionPanelBody>
    </SectionPanel>
  );
};
