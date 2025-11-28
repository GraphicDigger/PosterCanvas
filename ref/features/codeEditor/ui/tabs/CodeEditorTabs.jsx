/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { CrossIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { Tabs } from '../../../../shared/uiKit/Tabs';
import { Divider } from '../../../../shared/uiKit/Divider';
import { useDesignMode } from '../../../../entities/mode/editorMode';
import { DESIGN_MODES } from '../../../../entities/mode/editorMode';
import { useCodeEditor } from '../../model';


export const CodeEditorTabs = () => {
  const theme = useTheme();

  const { resetSpecificModeInDesignModes } = useDesignMode();
  const {
    codeTabs,
    activeCode,
    handleTabChange,
  } = useCodeEditor();

  const activeTabId = activeCode?.id || '';

  const handleCloseEditor = () => {
    resetSpecificModeInDesignModes(DESIGN_MODES.CODE);
  };

  return (
    <StyledHeader>
      <Tabs
        tabs={codeTabs.map(code => code.id)}
        selectedTab={activeTabId}
        onChange={handleTabChange}
        variant="filled"
      />
      <ButtonTool onClick={handleCloseEditor}>
        <CrossIcon />
      </ButtonTool>
      <Divider bottom left zIndex={1000} color={theme.sys.color.outline.default} />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
    width: 100%;
    position: relative;
    padding: 0 16px;
`;
