import React from 'react';
import { ComponentListItem } from '../ComponentListItem';
import { ComponentPreview } from '../ComponentPreview';

export const EComponent = ({ uiView = 'listItem', ...props }) => {

  return (
    <>
      {uiView === 'listItem' && ( <ComponentListItem {...props} />
      )}
      {uiView === 'preview' && ( <ComponentPreview {...props} />
      )}
    </>
  );
};
