/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from 'react';
import { LayersIcon, VariableIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { AddElementButtons } from '@/features/uiControls';
import { AddDataVariableButton } from '@/features/uiControls';
import { CONTROL_TYPES } from '@/entities/uiScreen/model';
import { ButtonToolToggle } from '@/shared/uiKit/ButtonTool';
import { UITree } from '@/entities/uiTree';
import { DataVariableControl } from '@/features/uiControls/dataVariableControl';


export const LayersAndVariablesPanel = () => {

  const [tab, setTab] = useState(CONTROL_TYPES.LAYERS);
  const isLayersTab = tab === CONTROL_TYPES.LAYERS;
  const isVariablesTab = tab === CONTROL_TYPES.VARIABLES;

  const handleTabChange = (value) => setTab(value);

  return (
    <SectionPanel>
      <SectionPanelHeader>
        <ButtonToolToggle value={tab} onChange={handleTabChange} >
          <ButtonTool value={CONTROL_TYPES.LAYERS} data-testid="tab-layers">
            <LayersIcon />
          </ButtonTool>
          <ButtonTool value={CONTROL_TYPES.VARIABLES} data-testid="tab-variables">
            <VariableIcon />
          </ButtonTool>
        </ButtonToolToggle>
        {isLayersTab && <AddElementButtons />}
        {isVariablesTab && <AddDataVariableButton />}
      </SectionPanelHeader>
      <SectionPanelBody>
        {isLayersTab && <UITree />}
        {isVariablesTab && <DataVariableControl />}
      </SectionPanelBody>
    </SectionPanel>
  );
};
