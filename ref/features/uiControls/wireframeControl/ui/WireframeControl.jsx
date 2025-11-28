/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { AddWireframeBlockButton } from './components/AddWireframeBlockButton';
import { ToggleLinkBlockButton } from './components/ToggleLinkBlockButton';
import { useWireframeBlocks } from '@/entities/wireframeBlock';
import { WireframeBlockList } from './components/WireframeBlockList';
import { useScreens } from '@/entities/uiScreen';
import { useFocusEntity } from '@/entities/uiFocus';

export const WireframeControl = () => {

  const { hasWireframeBlocks } = useWireframeBlocks();
  const { isCanvasFocused } = useFocusEntity();

  return (
    <SectionPanel>
      <SectionPanelHeader>
        <SectionPanelName>Wireframe blocks</SectionPanelName>
        {isCanvasFocused
          ? <AddWireframeBlockButton />
          : <ToggleLinkBlockButton />
        }
      </SectionPanelHeader>
      {hasWireframeBlocks &&
        <SectionPanelBody>
          <WireframeBlockList />
        </SectionPanelBody>
      }
    </SectionPanel>
  );
};

