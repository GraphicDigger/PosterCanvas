import React from 'react';
import { useTheme } from '@emotion/react';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Surface } from '@/shared/uiKit/Surface';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { usePreviewModes } from '@/entities/mode/editorMode';
import { SectionPanel, SectionPanelHeader } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { ArrowWithLegLeftIcon, CommentIcon } from '@/shared/assets/icons';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { PreviewCardList } from '@/shared/uiKit/PreviewCard';
import { ScreenPreviewCard, useScreens } from '@/entities/uiScreen';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';

export const PreviewModeSidebar = () => {
  const theme = useTheme();

  const { allScreens } = useScreens();
  const { resetGlobalMode } = useGlobalModes();
  const { toggleCommentsMode, isCommentsInPreviewMode } = usePreviewModes();

  const handleResetGlobalMode = () => {
    resetGlobalMode();
  };

  const handleToggleCommentsMode = () => {
    toggleCommentsMode();
  };

  return (
    <ResizableWrapper >
      <Surface>
        <SlotBar>
          <LeftSlot>
            <ButtonTool onClick={handleResetGlobalMode}>
              <ArrowWithLegLeftIcon />
            </ButtonTool>
          </LeftSlot>
          <RightSlot>
            <ButtonTool onClick={handleToggleCommentsMode}>
              <CommentIcon />
            </ButtonTool>
          </RightSlot>
        </SlotBar>
        <Scrollbar>
          <SectionPanel >
            <PreviewCardList columns={1}>
              {allScreens.map((screen) => (
                <ScreenPreviewCard
                  key={screen.id}
                  screen={screen}
                />
              ))}
            </PreviewCardList>
          </SectionPanel>
        </Scrollbar>
      </Surface>
    </ResizableWrapper>
  );
};
