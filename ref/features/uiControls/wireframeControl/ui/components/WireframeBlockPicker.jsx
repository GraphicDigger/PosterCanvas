import React from 'react';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody, WindowTitle } from '@/shared/uiKit/Window';
import { List } from '@/shared/uiKit/List';
import { useWireframeBlockMutations, useWireframeBlocks } from '@/entities/wireframeBlock';
import { WireframeBlockListItem } from '@/entities/wireframeBlock';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon } from '@/shared/assets/icons';

export const WireframeBlockPicker = ({
  children,
  windowSettings = { offset: 17 },
}) => {

  const { screenWireframeBlocks } = useWireframeBlocks();
  const { linkWireframeBlockToUI, createWireframeBlock } = useWireframeBlockMutations();

  const handleLink = (blockId) => {
    linkWireframeBlockToUI(blockId);
  };

  const handleCreate = () => {
    createWireframeBlock();
  };

  // console.log('[WireframeBlockPicker] wireframeBlocks', screenWireframeBlocks)

  return (
    <WindowPopover
      // closeOnSelect={false}
      placement='left-start'
      offset={windowSettings.offset}
    >
      <WindowTrigger>
        {children}
      </WindowTrigger>
      <Window>
        <WindowHead>
          <WindowTitle>
            Screen Blocks
          </WindowTitle>
          <ButtonTool onClick={handleCreate}>
            <PlusIcon />
          </ButtonTool>
        </WindowHead>
        <WindowBody>
          <List>
            {screenWireframeBlocks.map(block => (
              <WireframeBlockListItem
                key={block.id}
                block={block}
                onClick={() => handleLink(block.id)}
              />
            ))}
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};
