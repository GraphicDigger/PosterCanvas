import React from 'react';
import { PreviewCard, PreviewCardBottomTitle, PreviewCardContent } from '@/shared/uiKit/PreviewCard';
import { Image } from '@/shared/uiKit/Image';
import { useUiDefaultEntity } from '../../../../../shared/uiEditorDefaults/elements/model';

export const UiDefaultEntityPreviewCard = ({
  uiEntity,
  onCreate,
}) => {


  return (
    <PreviewCard onClick={onCreate}>
      <PreviewCardContent fitWidth>
        <Image src={uiEntity.preview} />
      </PreviewCardContent>
      <PreviewCardBottomTitle align='center' >
        {uiEntity.name}
      </PreviewCardBottomTitle>
    </PreviewCard>
  );
};
