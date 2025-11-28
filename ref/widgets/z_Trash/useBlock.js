import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTab, selectorScreenWireframeCanvas, resetTab } from '../store';
import { useWireframeMode } from '@/entities/mode/editorMode';
import { useWireframeBlockStates } from '@/entities/wireframeBlock';

export const useBlock = ({ ctx }) => {
  const dispatch = useDispatch();

  const { tabs, BLOCK_DETAIL_TABS, isOpenBlockDetail, isOpenWidgetPicker } = useSelector(selectorScreenWireframeCanvas);
  const { setBlockDetailMode, resetBlockDetailMode } = useWireframeMode();
  const { handleDeselectWireframeBlock } = useWireframeBlockStates();

  const handleOpenBlockDetailPanel = useCallback(() => {
    setBlockDetailMode();
    dispatch(setTab(BLOCK_DETAIL_TABS.DETAIL));
  }, [dispatch]);

  const handleOpenWidgetPickerPanel = useCallback(() => {
    setBlockDetailMode();
    dispatch(setTab(BLOCK_DETAIL_TABS.WIDGET_PICKER));
  }, [dispatch]);

  const handleCloseWidgetPickerPanel = useCallback(() => {
    dispatch(resetTab());
  }, [dispatch]);

  const handleCloseBlockDetailPanel = () => {
    handleDeselectWireframeBlock();
    resetBlockDetailMode();
    resetTab();
  };

  return {
    isOpenBlockDetail,
    isOpenWidgetPicker,
    tabs,
    openBlockDetailPanel: handleOpenBlockDetailPanel,
    openWidgetPickerPanel: handleOpenWidgetPickerPanel,
    closeBlockDetailPanel: handleCloseBlockDetailPanel,
    closeWidgetPickerPanel: handleCloseWidgetPickerPanel,

  };
};
