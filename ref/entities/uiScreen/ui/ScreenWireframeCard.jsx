import React, { useMemo, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@/shared/lib';
import { Window, WindowHead, WindowBody, WindowTitle } from '@/shared/uiKit/Window';
import { Connector } from '@/shared/uiKit/Connector';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { ArrowUpDownIcon, EditIcon, PlusIcon } from '@/shared/assets/icons';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Image } from '@/shared/uiKit/Image';
import { List } from '@/shared/uiKit/List';
import { LibraryIcon } from '@/shared/assets/icons';
import { ENTITY_KINDS } from '@/shared/constants';
import { Button } from '@/shared/uiKit/Button';
import { useWireframeMode } from '@/entities/mode/editorMode';
import { useScreens, useScreenStates } from '@/entities/uiScreen/model';
import { WireframeBlockListItem, useWireframeBlockStates } from '@/entities/wireframeBlock';
import { useWireframeBlockMutations, useWireframeBlocks } from '../../wireframeBlock';
import { ViewerTrigger } from '@/shared/uiKit/Viewer';

export const ScreenWireframeCard = ({
  screen,
  slotAddBlock,
}) => {
  const theme = useTheme();

  const [cardHeightAuto, setCardHeightAuto] = useState(true);
  const { handleSelect: selectScreen } = useScreenStates();
  const { screenWireframeBlocks } = useWireframeBlocks({ screenId: screen.id });
  const { isPreviewMode, setBlockDetailMode } = useWireframeMode();

  const handleToggleHeight = () => {
    setCardHeightAuto(!cardHeightAuto);
  };

  const handleSelectScreen = useCallback(() => {
    selectScreen(screen.id);
  }, [selectScreen, screen.id]);

  const content = useMemo(() => {
    if (isPreviewMode) {
      return (
        <StyledImage autoHeight={cardHeightAuto}>
          <Image src={screen.preview} alt={screen.name} objectPosition='top' autoFit />
        </StyledImage>
      );
    }
    if (screenWireframeBlocks && screenWireframeBlocks.length > 0) {
      return (
        <List gap={1}>
          {screenWireframeBlocks.map(block => {
            const unlinked = block.targetType === ENTITY_KINDS.SCREEN;
            return (
              <ViewerTrigger step={1} groupId="wireframeBlockDetail">
                <WireframeBlockListItem
                  key={block.id}
                  block={block}
                />
              </ViewerTrigger>
            );
          })}
        </List>
      );
    }

    return <Button color="default" > Templates </Button>;

  }, [screen, isPreviewMode, cardHeightAuto, screenWireframeBlocks]);

  return (
    <Connector >
      <ResizableWrapper initialWidth={300} minWidth={300} maxWidth={500}>
        <Window
          backgroundColor={theme.sys.color.surfaceContainer.lowest}
          width={300}
          onClick={handleSelectScreen}
        >
          <WindowHead noPadding>
            <SlotBar paddingVertical={0} paddingHorizontal={0}>
              <LeftSlot>
                <WindowTitle>
                  {screen.name}
                </WindowTitle>
              </LeftSlot>
              <RightSlot>
                <ButtonToolGroup fill={false}>
                  {isPreviewMode
                    ? (
                      <ButtonTool onClick={() => setCardHeightAuto(!cardHeightAuto)}>
                        <ArrowUpDownIcon />
                      </ButtonTool>
                    ) : slotAddBlock}
                </ButtonToolGroup>
              </RightSlot>
            </SlotBar>
          </WindowHead>
          <WindowBody padding={isPreviewMode ? 0 : 4}>
            {content}
          </WindowBody>
        </Window>
      </ResizableWrapper>
    </Connector>
  );
};

const StyledImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    aspect-ratio: ${({ autoHeight }) => autoHeight ? 4 / 5 : 'auto'};
    overflow: hidden;
`;
