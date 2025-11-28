import React, { useMemo } from 'react';
import { useScreens } from '@/entities/uiScreen';
import { List } from '@/shared/uiKit/List';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { LibraryIcon } from '@/shared/assets/icons';
import { ENTITY_KINDS } from '@/shared/constants';
import { useWireframeBlocks } from '@/entities/wireframeBlock/model';
import { WireframeBlockPicker } from './WireframeBlockPicker';
import { WireframeBlockListItem } from '@/entities/wireframeBlock/ui/WireframeBlockListItem';

export const WireframeBlockList = () => {

  const { wireframeBlocks } = useWireframeBlocks();

  if (!wireframeBlocks || wireframeBlocks.length === 0) {return null;}

  return (
    <List gap={1}>
      {wireframeBlocks.map(block => (
        <WireframeBlockPicker key={block.id}>
          <WireframeBlockListItem
            key={block.id}
            block={block}
          />
        </WireframeBlockPicker>
      ))}
    </List>
  );
};
