import { useMemo } from 'react';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useComment } from '@/entities/comment';

export const useCommentControl = () => {
  const {
    isCommentsInDesignMode,
    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
  } = useDesignMode();

  const {
    compositeCommentsBySelectedScreen,
    compositeCommentsBySelectedComponent,
    selectedCommentId,
    selectedComment,
  } = useComment();

  const controlIsActive = isCommentsInDesignMode && (isScreenCanvasInDesignMode || isComponentCanvasInDesignMode);

  const comments = useMemo(() => {
    if (isCommentsInDesignMode) {
      if (isScreenCanvasInDesignMode) {return compositeCommentsBySelectedScreen;}
      if (isComponentCanvasInDesignMode) {return compositeCommentsBySelectedComponent;}
    }
    return null;
  }, [compositeCommentsBySelectedScreen, isCommentsInDesignMode]);

  return {
    controlIsActive,
    comments,
    selectedCommentId,
    selectedComment,
  };
};
