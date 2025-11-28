/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useTheme } from '../../../../app/providers';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { PlusIcon } from '../../../../shared/assets/icons';
import { ButtonToolGroup, ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody } from '../../../../shared/uiKit/Window';
import { SlotBar, RightSlot } from '../../../../shared/uiKit/SlotBar';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { usePresetMutation, usePresets, EPreset, PRESET_TYPES } from '../../../../entities/varPreset';
import { useTokenAndPresetControl, AddPresetButton, BindTypographyToPresetButton } from '../../../../features/TokenAndPresetControl';
import { TypographyControl, TypographyPresetControl } from '../../../../features/uiControls';
import { useBoundVariableValue } from '../../../../entities/binding';


export const TypographyPanel = () => {

  const { focusedElement, elementBoundTypographyPreset } = useElement();
  const { typographyCollectionPresets } = usePresets();
  const { styles } = useBoundVariableValue(focusedElement?.id);
  const { removePresetBindingFromTypography } = useTokenAndPresetControl({ element: focusedElement });

  const handleRemoveTypographyPreset = () => {
    removePresetBindingFromTypography();
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Text</SectionPanelName>
        <ButtonToolGroup fill={false}>
          <BindTypographyToPresetButton />
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </ButtonToolGroup>
      </SectionPanelHeader>
      <SectionPanelBody>
        {elementBoundTypographyPreset
          ? <TypographyPresetControl
            boundPreset={elementBoundTypographyPreset}
            onRemovePreset={handleRemoveTypographyPreset}
          />
          : <TypographyControl />
        }
      </SectionPanelBody>
    </SectionPanel>
  );
};

