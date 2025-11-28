/** @jsxImportSource @emotion/react */
import React from 'react';
import { ENTITY_KINDS } from '@/shared/constants';
import { PreviewCardList } from '@/shared/uiKit/PreviewCard';
import { UiDefaultEntityPreviewCard } from '../components/UIDefaultEntityPreviewCard';
import { useDefaultWidgets } from '@/shared/uiEditorDefaults/widgets';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { useWireframeBlockMutations, useWireframeBlocks } from '@/entities/wireframeBlock';
import { UI_ENTITY_TYPE } from '../../../../shared/uiEditorDefaults/elements/model';

export const UiDefaultWidgetPreviewCardList = () => {

  const { allDefaultWidgets, addDefaultWidget } = useDefaultWidgets();
  const { isWireframeModeGlobal } = useGlobalModes();
  const { updateWireframeBlock } = useWireframeBlockMutations();
  const { selectedWireframeBlockId, selectedWireframeBlock } = useWireframeBlocks();

  if (allDefaultWidgets.length === 0) {return null;}

  const handleCreateWidget = (uiEntity) => {
    const createdWidget = addUiDefaultEntity(uiEntity);
    if (createdWidget && isWireframeModeGlobal) {
      updateWireframeBlock(selectedWireframeBlockId, {
        name: uiEntity.name + ' Block',
        targetType: ENTITY_KINDS.ELEMENT,
        targetId: createdWidget.id,
      });
    }
  };

  return (
    <>
      {allDefaultWidgets.map((uiEntity) => (
        <UiDefaultEntityPreviewCard
          uiEntity={uiEntity}
          key={uiEntity.id}
          onCreate={() => handleCreateWidget(uiEntity)}
        />
      ))}
    </>
  );
};
