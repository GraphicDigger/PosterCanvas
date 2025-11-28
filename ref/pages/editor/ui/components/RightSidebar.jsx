import React, { useMemo } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useFocusEntity } from '../../../../entities/uiFocus';
import { useDesignMode } from '../../../../entities/mode/editorMode';
import { useGlobalModes } from '../../../../entities/mode/editorMode';
import { ScreenSidebar } from '../../../../widgets/screenSidebar';
import { ComponentSidebar } from '../../../../widgets/componentSidebar';
import { ElementSidebar } from '../../../../widgets/elementSidebar';
import { InstanceSidebar } from '../../../../widgets/componentInstanceSidebar';
import { useElement, ELEMENT_TAGS } from '../../../../entities/uiElement';
import { useInstances } from '../../../../entities/uiInstance';
import { CommentsSidebar } from '../../../../features/commentControl';

export const RightSidebar = () => {
  const {
    isCanvasFocused,
    isElementFocused,
    isInstanceFocused
  } = useFocusEntity();
  const {
    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
    isCommentsInDesignMode,
  } = useDesignMode();

  const { isCodebaseModeGlobal } = useGlobalModes();

  return useMemo(() => {

    if (isCommentsInDesignMode) {
      return <CommentsSidebar />;
    }

    if (isScreenCanvasInDesignMode && !isCommentsInDesignMode) {

      if (isCanvasFocused) {
        return <ScreenSidebar />;
      }
      if (!isCanvasFocused && !isInstanceFocused && !isCodebaseModeGlobal) {
        return <ElementSidebar />;
      }
      if (isInstanceFocused && !isCodebaseModeGlobal) {
        return <InstanceSidebar />;
      }
    }

    if (isComponentCanvasInDesignMode) {

      if (!isElementFocused && !isInstanceFocused && !isCodebaseModeGlobal) {
        return <ComponentSidebar />;
      }
      if (isElementFocused && !isInstanceFocused && !isCodebaseModeGlobal) {
        return <ElementSidebar />;
      }
      if (isInstanceFocused && !isCodebaseModeGlobal) {
        return <InstanceSidebar />;
      }
    }

    return null;
  }, [
    isCanvasFocused,
    isElementFocused,
    isInstanceFocused,

    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
    isCodebaseModeGlobal,
    isCommentsInDesignMode,
  ]);
};
