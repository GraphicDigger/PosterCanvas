// ude-frontend-vite-ts/src/features/uiRender/ui/UIRenderWrapper.jsx
import React, { useState } from 'react';
import { useUITree } from '../../../entities/uiTree';
import { UIRender } from './archive/UIRender';
import { IFrame } from './IFrame';

const RENDER_MODES = {
  IFRAME: 'iframe',
  RECURSIVE: 'recursive',
  VIRTUALIZED: 'virtualized',
  PATH_BASED: 'path_based',
};

export const UIRenderStrategy = ({ ownershipType, ownerId }) => {

  const [renderMode, setRenderMode] = useState(RENDER_MODES.IFRAME);
  const { uiTree, uiTreeElements } = useUITree({ ownershipType, ownerId });


  return (
    <>
      {renderMode === RENDER_MODES.RECURSIVE && uiTree && uiTree.length > 0 && (
        <> {uiTree.map(ui => (<UIRender key={ui.id} ui={ui} />))} </>
      )}

      {renderMode === RENDER_MODES.IFRAME && (
        <IFrame uiTree={uiTree} />
      )}

      {renderMode === RENDER_MODES.VIRTUALIZED && (
        <></>
      )}

      {renderMode === RENDER_MODES.PATH_BASED && (
        <></>
      )}
    </>

  );
};
