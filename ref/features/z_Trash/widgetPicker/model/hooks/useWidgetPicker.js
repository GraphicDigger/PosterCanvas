import { useState } from 'react';
import { useUiDefaultEntity } from '@/features/uiControls/layerControl';

export const useWidgetPicker = () => {

  const { allDefaultWidgets } = useUiDefaultEntity();


  return {
    allDefaultWidgets,
  };
};
