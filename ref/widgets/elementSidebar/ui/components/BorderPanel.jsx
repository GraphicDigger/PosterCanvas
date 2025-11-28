/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ButtonToolGroup } from '../../../../shared/uiKit/ButtonTool';
import {
  BorderControl,
  AddBorderButton,
  useBorder,
  useBorderRadius,
  AddBorderRadiusButton,
} from '../../../../features/uiControls';
import { useElement } from '../../../../entities/uiElement';
import { Box } from '../../../../shared/uiKit/Box';


export const BorderPanel = () => {

  const { hasBorder } = useBorder();
  const { hasBorderRadius } = useBorderRadius();


  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader height={48}>
        <SectionPanelName>Border</SectionPanelName>
        <Box height={14} />
        <ButtonToolGroup fill={false}>
          {!hasBorderRadius && <AddBorderRadiusButton />}
          {!hasBorder && <AddBorderButton />}
        </ButtonToolGroup>

      </SectionPanelHeader>
      {(hasBorder || hasBorderRadius) && (
        <SectionPanelBody>
          <BorderControl />
        </SectionPanelBody>
      )}
    </SectionPanel>
  );
};

