import React from 'react';
import { PresetPreview, PresetListItem, PresetList, PresetBindingButton } from './components';

export const EPreset = ({ uiView = 'tableRow', ...props }) => {

  return (
    <>
      {uiView === 'listItem' && (<PresetListItem {...props} />)}
      {uiView === 'list' && (<PresetList {...props} />)}
      {uiView === 'preview' && (<PresetPreview {...props} />)}
      {uiView === 'binding' && (<PresetBindingButton {...props} />)}
    </>
  );
};

