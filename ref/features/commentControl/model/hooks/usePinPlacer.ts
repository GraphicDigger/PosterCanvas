import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { useDesignMode } from '@/entities/mode/editorMode';
import { getElementInfo } from '../../lib';
// import { usePinPosition } from '../context/pinPositionContext';
import { useCommentStates } from '@/entities/comment';
import {
  selectAbsolutePinPosition,
  selectRelativePinPosition,
  setAbsolutePinPosition,
  setRelativePinPosition,
} from '../store';

export const usePinPlacer = () => {
  const dispatch = useDispatch();

  const { handleSelect: selectComment } = useCommentStates();
  const { isCommentsInDesignMode } = useDesignMode();
  const [, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const absolutePinPosition = useSelector(selectAbsolutePinPosition);
  const relativePinPosition = useSelector(selectRelativePinPosition);

  const handleSetAbsolutePinPosition = useCallback((position: { x: number, y: number }) => {
    dispatch(setAbsolutePinPosition(position));
  }, [dispatch]);

  const handleSetRelativePinPosition = useCallback((position: { targetId: string, relativeX: number, relativeY: number }) => {
    dispatch(setRelativePinPosition(position));
  }, [dispatch]);


  useEffect(() => {
    if (!isCommentsInDesignMode) {
      handleSetAbsolutePinPosition(null);
    }
  }, [isCommentsInDesignMode]);


  const handleAddPin = useCallback((event: React.MouseEvent) => {
    if (!isCommentsInDesignMode) {return;}

    const elementInfo = getElementInfo(event);
    if (!elementInfo) {return;}

    const absoluteX = elementInfo.absoluteX;
    const absoluteY = elementInfo.absoluteY;
    const relativeX = elementInfo.relativeX;
    const relativeY = elementInfo.relativeY;

    handleSetAbsolutePinPosition({ x: absoluteX, y: absoluteY });
    handleSetRelativePinPosition({
      targetId: elementInfo.dataset.uiId,
      relativeX: relativeX,
      relativeY: relativeY,
    });
  }, [isCommentsInDesignMode]);

  return {
    absolutePinPosition,
    relativePinPosition,
    setAbsolutePinPosition: handleSetAbsolutePinPosition,
    setRelativePinPosition: handleSetRelativePinPosition,

    selectComment,
    setWindowSize,
    addPin: handleAddPin,

  };
};
