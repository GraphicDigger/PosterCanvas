import React from 'react';
import { SearchIcon, ArrowWithLegLeftIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { SlotBar, LeftSlot, RightSlot, CenterSlot } from '@/shared/uiKit/SlotBar';
import { useComment, CommentCard } from '@/entities/comment';


export const ReplyList = () => {

  const { selectedComment, allCompositeComments } = useComment();

  return (
    <>
      <CommentCard
        key={selectedComment.id}
        member={selectedComment.member}
        comment={selectedComment}
      />
      {selectedComment?.replies?.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            member={comment.member}
            comment={comment}
          />
        );
      })}
    </>

  );
};
