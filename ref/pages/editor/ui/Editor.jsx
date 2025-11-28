/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef } from 'react';
import { ThemeProvider } from '../../../app/providers';
import { FullScreenWrapper } from '../../../shared/uiKit/FullScreenWrapper';
import { Button } from '../../../shared/uiKit/Button';
import { Stack } from '../../../shared/uiKit/Stack';
import { Dialog, DialogTrigger, DialogWindow } from '../../../shared/uiKit/Dialog';
import { StackBlitz } from '../../../features/StackBlitzEditor';
import { ActionCanvas } from '../../../widgets/actionCanvas';
import { ImporterDialog, useImporter } from '../../../features/importer';
import { CodeEditor } from '../../../features/codeEditor';
import { WireframeCanvas } from '../../../widgets/screenWireframeCanvas';
import { ScreenCanvas } from '../../../widgets/screenCanvas';
import { TokenManager } from '../../../widgets/varTokenManager';
import { ComponentCanvas } from '../../../widgets/componentCanvas';
import { ComponentCode } from '../../../widgets/componentCode';
import { PresetManager } from '../../../widgets/varPresetManager';
import { DatabaseManager } from '../../../widgets/databaseManager';
import { ProjectExplorerSidebar, ProjectSettingDetail } from '../../../widgets/projectExplorerSidebar';
import { PreviewModeSidebar } from '../../../widgets/previewModeSidebar';
import { RightSidebar } from './components';
import { CommentsSidebar } from '../../../features/commentControl';
import { GlobalSearchResultDetail } from '../../../widgets/globalSearchResultDetail';
import { WireframeSidebar } from '../../../widgets/screenWireframeSidebar';
import { CodebaseSidebar } from '../../../widgets/sidebarCodebase';
import { useAIAssistant, useAIAssistantVisibility, AiAssistantSwitchButton, AiAssistant } from '../../../widgets/aiAssistant';
import { EntityContextManager } from '../../../widgets/entityContextManager';
// import { GlobalSearchSidebar } from '../../../widgets/sidebarExplorer/ui/globalSearch';
import { useGlobalModes, useDesignMode } from '../../../entities/mode/editorMode';
import { usePreviewModes } from '../../../entities/mode/editorMode';
import { useScreens } from '../../../entities/uiScreen';
import { useBodyFocused, useFocused } from '../../../entities/uiFocus';


export const Editor = () => {

  const screenCanvasRef = useRef(null);

  const { isImporterOpen } = useImporter();
  const { isAssistantOpen } = useAIAssistant();
  const { toggleAssistant } = useAIAssistantVisibility();
  const {
    isCodebaseModeGlobal,
    isDatabaseModeGlobal,
    isPreviewModeGlobal,
    isGlobalSearchMode,
    isWireframeModeGlobal,
  } = useGlobalModes();
  const {
    isCodeInDesignMode,
    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
    isTokenManagerInDesignMode,
    isPresetManagerInDesignMode,
    isActionCanvasInDesignMode,
    isCommentsInDesignMode,
    // isWireframeCanvasInDesignMode,
  } = useDesignMode();
  const { isCommentsInPreviewMode } = usePreviewModes();


  const content = useMemo(() => {

    if (isCodebaseModeGlobal) {
      return (
        <ThemeProvider forceDark>
          <CodebaseSidebar />
          <CodeEditor />
        </ThemeProvider>
      );
    }

    if (isCodeInDesignMode && !isComponentCanvasInDesignMode && !isScreenCanvasInDesignMode) {
      return (
        <>
          <ProjectExplorerSidebar />
          <ThemeProvider forceDark>
            <CodeEditor />
          </ThemeProvider>
        </>
      );
    }

    if (isScreenCanvasInDesignMode) {
      return (
        <>
          <ProjectExplorerSidebar />
          <Stack direction='row' align='flex-start' justify='flex-start' gap='0'>
            {isCodeInDesignMode &&
              <ThemeProvider forceDark>
                <CodeEditor />
              </ThemeProvider>
            }
            {isActionCanvasInDesignMode
              ? <ThemeProvider forceDark><ActionCanvas /></ThemeProvider>
              : <ScreenCanvas />
            }
            <RightSidebar />
            <ProjectSettingDetail />
          </Stack>
        </>
      );
    }

    if (isPreviewModeGlobal) {
      return (
        <>
          <ThemeProvider forceDark>
            <PreviewModeSidebar />
          </ThemeProvider>
          <ScreenCanvas />
          {isCommentsInPreviewMode && <CommentsSidebar />}
        </>
      );
    }

    if (isComponentCanvasInDesignMode) {
      return (
        <>
          <ProjectExplorerSidebar />
          {isCodeInDesignMode && <ComponentCode />}
          <ComponentCanvas />
          <RightSidebar />
        </>
      );
    }

    if (isTokenManagerInDesignMode) {
      return (
        <>
          <ProjectExplorerSidebar />
          <TokenManager />
        </>
      );
    }

    if (isPresetManagerInDesignMode) {
      return (
        <>
          <ProjectExplorerSidebar />
          <PresetManager />
        </>
      );
    }

    if (isDatabaseModeGlobal) {
      return (
        <Stack direction='row' align='flex-start' justify='flex-start'>
          <DatabaseManager />
        </Stack>
      );
    }

    if (isWireframeModeGlobal) {
      return (
        <>
          <WireframeSidebar />
          <Stack direction='row' align='flex-start' justify='flex-start'>
            <ThemeProvider forceDark>
              <WireframeCanvas />
            </ThemeProvider>
            <EntityContextManager />
          </Stack>
        </>
      );
    }

    return null;
  }, [
    isCodebaseModeGlobal,
    isCodeInDesignMode,
    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
    isTokenManagerInDesignMode,
    isPresetManagerInDesignMode,
    isPreviewModeGlobal,
    isDatabaseModeGlobal,
    isCommentsInPreviewMode,
    isActionCanvasInDesignMode,
    isWireframeModeGlobal,
    isImporterOpen,
    isCommentsInDesignMode,
  ]);

  return (
    <ThemeProvider>
      <FullScreenWrapper data-testid="main-editor">
        {content}
        {isAssistantOpen
          ? <ThemeProvider forceDark> <AiAssistant /> </ThemeProvider>
          : <AiAssistantSwitchButton />
        }
      </FullScreenWrapper>
    </ThemeProvider>
  );
};
