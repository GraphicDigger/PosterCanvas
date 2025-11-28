import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../shared/uiKit/Surface';
import { useComponents } from '../../../entities/uiComponent';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { CodeIcon } from '../../../shared/assets/icons';
import { PropControl } from '../../../features/uiControls/propInstanceControl';
import { VariantsControl } from '../../../features/uiControls';
import { PropPanel } from './components/PropPanel';

export const ComponentSidebar = () => {
  const { selectedComponent } = useComponents();

  return (
    <ResizableWrapper side='left'>
      <Surface>
        <SectionPanel dividerBottom>
          <SectionPanelHeader>
            <SectionPanelName>{selectedComponent?.name}</SectionPanelName>
            <ButtonTool>
              <CodeIcon />
            </ButtonTool>
          </SectionPanelHeader>
        </SectionPanel>
        <VariantsControl />
        <PropPanel />
      </Surface>
    </ResizableWrapper>
  );
};
