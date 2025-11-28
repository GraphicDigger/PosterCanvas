import React from 'react';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { ArrowWithLegLeftIcon, CommentIcon } from '../../../../shared/assets/icons';
import { Divider } from '../../../../shared/uiKit/Divider';
import { SectionPanel, SectionPanelHeader } from '../../../../shared/uiKit/SectionPanel';
import { useGlobalModes, usePreviewModes } from '../../../../entities/mode/editorMode';


export const ListHeader = () => {

  const { resetGlobalMode } = useGlobalModes();
  const { toggleCommentsMode, isCommentsInPreviewMode } = usePreviewModes();

  const handleResetGlobalMode = () => {
    resetGlobalMode();
  };

  const handleToggleCommentsMode = () => {
    toggleCommentsMode();
  };

  return (

    <SectionPanel dividerBottom>
      <SectionPanelHeader paddingVertical={8}>
        <ButtonTool onClick={handleResetGlobalMode}>
          <ArrowWithLegLeftIcon />
        </ButtonTool>
        <ButtonTool onClick={handleToggleCommentsMode}>
          <CommentIcon />
        </ButtonTool>
      </SectionPanelHeader>
    </SectionPanel>

  );
};

