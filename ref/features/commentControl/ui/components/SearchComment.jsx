import React from 'react';
import { SearchIcon, ArrowWithLegLeftIcon } from '@/shared/assets/icons';
import { SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { SlotBar, LeftSlot, RightSlot, CenterSlot } from '@/shared/uiKit/SlotBar';
import { useComment } from '@/entities/comment';
import { Text } from '@/shared/uiKit/Text';
import { useCommentControl } from '../../model';


export const SearchComment = ({ isRepliesOpen, onCloseReplies }) => {

  const { comments, selectedComment } = useCommentControl();

  const handleBack = () => {
    onCloseReplies();
  };

  return (
    <>
      {isRepliesOpen
        ? (
          <SlotBar>
            <LeftSlot padding={0}>
              <ButtonTool onClick={handleBack}>
                <ArrowWithLegLeftIcon />
              </ButtonTool>
            </LeftSlot>
            <CenterSlot>
              <SectionPanelName>
                {selectedComment?.replies?.length} replies
              </SectionPanelName>
            </CenterSlot>
            <RightSlot padding={0}>
              <ButtonTool >
                <SearchIcon />
              </ButtonTool>
            </RightSlot>
          </SlotBar>
        )
        : (
          <SlotBar>
            <LeftSlot padding={2}>
              <Text weight='bold'>
                {comments?.length} comments
              </Text>
            </LeftSlot>
            <RightSlot padding={0}>
              <ButtonTool >
                <SearchIcon />
              </ButtonTool>
            </RightSlot>
          </SlotBar>
        )}
    </>
  );
};
