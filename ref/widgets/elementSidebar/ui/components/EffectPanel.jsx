/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '../../../../app/providers';
import { lineColors } from '../../../../shared/styles';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { PlusIcon } from '../../../../shared/assets/icons';
import { Divider } from '../../../../shared/uiKit/Divider';
import { useElement } from '../../../../entities/uiElement';
import { EffectControl, AddEffectButton } from '../../../../features/uiControls';

export const EffectPanel = () => {
  const { focusedElement } = useElement();

  // console.log('focusedElement', JSON.stringify(focusedElement, null, 2))

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Effect</SectionPanelName>
        <AddEffectButton />
      </SectionPanelHeader>
      <SectionPanelBody>
        <EffectControl />
      </SectionPanelBody>
    </SectionPanel>
  );
};

