/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { Stack } from '../../../../shared/uiKit/Stack';
import { ButtonToolMultiToggle, ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { ScreenSizeDesktopIcon, ScreenSizeTabletVerticalIcon, ScreenSizePhoneIcon } from '../../../../shared/assets/icons';
import { VisibleIcon, InvisibleIcon } from '../../../../shared/assets/icons';
import { useVisibiltyControl } from '../model';
import { PROPERTY_TYPES, STYLE_PROPERTIES } from '../../../../entities/uiElement';
import { BindVariableToPropertyPicker } from '../../../../entities/binding';

export const VisibilityControl = () => {

  const { isVisible, toggleVisibility, displayValue } = useVisibiltyControl();

  const handleToggleVisibility = () => {
    toggleVisibility();
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Visibility</SectionPanelName>
        <Stack direction="row" gap={1} width="fit">
          {isVisible && (
            <ButtonToolMultiToggle>
              <ButtonTool value="desktop">
                <ScreenSizeDesktopIcon />
              </ButtonTool>
              <ButtonTool value="tablet">
                <ScreenSizeTabletVerticalIcon />
              </ButtonTool>
              <ButtonTool value="phone">
                <ScreenSizePhoneIcon />
              </ButtonTool>
            </ButtonToolMultiToggle>
          )}
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.display}
            propertyValue={displayValue}
            width='fill'
            window={{
              offset: 206,
            }}
          >
            <ButtonTool onClick={handleToggleVisibility}>
              {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
            </ButtonTool>
          </BindVariableToPropertyPicker>
        </Stack>
      </SectionPanelHeader>
    </SectionPanel >
  );
};

