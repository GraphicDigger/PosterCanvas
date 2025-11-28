import React, { useMemo } from 'react';
import { FeatureNavigation } from '@/features/featureNavigation';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { ArrowWithLegLeftIcon, DataSchemaIcon, DataTableIcon } from '@/shared/assets/icons';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { ScreenPanel } from './components/ScreenPanel';
import { useWireframeSidebar } from '../model';
import { WireframeControl } from '@/features/uiControls';


export const WireframeSidebar = () => {

  const {
    setGlobalWireframeMode,
    setGlobalDesignMode,
    toggleBlockAndPreviewMode,
    isBlocksMode,
    isPreviewMode,
    isBlockDetailMode,
  } = useWireframeSidebar();

  const handleToggleBlocksPreviewClick = () => {
    toggleBlockAndPreviewMode();
  };

  const toggleIcon = useMemo(() => {
    if (isBlocksMode) { return <DataTableIcon />; }
    if (isPreviewMode) { return <DataSchemaIcon />; }
    return null;
  }, [isBlocksMode, isPreviewMode]);

  return (
    <FeatureNavigation footer={false} header={false}>
      <SlotBar divider>
        <LeftSlot>
          <ButtonTool onClick={setGlobalDesignMode}>
            <ArrowWithLegLeftIcon />
          </ButtonTool>
        </LeftSlot>
        <RightSlot>
          <ButtonTool onClick={handleToggleBlocksPreviewClick} >
            {toggleIcon}
          </ButtonTool>
        </RightSlot>
      </SlotBar>
      <ScreenPanel />
      <WireframeControl />
    </FeatureNavigation>

  );
};

