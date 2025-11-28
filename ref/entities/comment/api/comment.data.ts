import { ENTITY_KINDS } from '../../../shared/constants';
import { CommentModel } from '../type';

export const comments: CommentModel[] = [
  {
    id: 'id-comment-01',
    kind: ENTITY_KINDS.COMMENT,
    parentId: null,
    targetId: 'element-01-form',
    targetType: ENTITY_KINDS.ELEMENT,
    text: 'Great design! I especially like how the interface details are worked out.',
    memberId: 'id-user-1-member-1-workspace-1',
    createdAt: 'Apr 15, 2024',
    likes: 5,
    pin: {
      x: 0.1,
      y: 0.1,
    },
  },
  {
    id: 'id-comment-02',
    kind: ENTITY_KINDS.COMMENT,
    parentId: null,
    targetId: 'body-screen-01',
    targetType: ENTITY_KINDS.ELEMENT,
    text: 'We need to add more contrast to the action buttons.',
    memberId: 'id-user-2-member-1-workspace-2',
    createdAt: 'Apr 16, 2024',
    likes: 3,
    pin: {
      x: 0.1,
      y: 0.1,
    },
  },

  {
    id: 'id-comment-02-reply-01',
    kind: ENTITY_KINDS.COMMENT,
    parentId: 'id-comment-02',
    targetId: null,
    targetType: null,
    text: 'Agreed, already working on it.',
    memberId: 'id-user-3-member-1-workspace-3',
    createdAt: 'Apr 16, 2024',
    likes: 1,
  },

  // {
  //     id: 'id-comment-03',
  //     kind: ENTITY_KINDS.COMMENT,
  //     parentId: null,
  //     targetId: null,
  //     targetType: null,
  //     text: "Let's discuss this point in the next call.",
  //     memberId: 'id-member-03',
  //     createdAt: 'Apr 17, 2024',
  //     likes: 2,
  //     pin: {
  //         x: 0.8,
  //         y: 0.8
  //     },
  // },
  // {
  //     id: 4,
  //     kind: ENTITY_KINDS.COMMENT,
  //     text: 'The animations turned out very smooth!',
  //     memberId: 4,
  //     createdAt: 'Apr 18, 2024',
  //     likes: 7,
  //     replies: [
  //         {
  //             id: 7,
  //             text: 'Thanks! I used CSS transitions to achieve this effect.',
  //             memberId: 5,
  //             createdAt: 'Apr 19, 2024',
  //             likes: 2
  //         }
  //     ]
  // },
  // {
  //     id: 5,
  //     kind: ENTITY_KINDS.COMMENT,
  //     text: 'Found a small bug when scaling on mobile devices.',
  //     memberId: 5,
  //     createdAt: 'Apr 19, 2024',
  //     likes: 4,
  //     replies: [
  //         {
  //             id: 8,
  //             text: 'Can you describe the steps to reproduce?',
  //             memberId: 2,
  //             createdAt: 'Apr 20, 2024',
  //             likes: 1
  //         },
  //         {
  //             id: 9,
  //             text: 'Already created a Jira ticket for this issue.',
  //             memberId: 3,
  //             createdAt: 'Apr 21, 2024',
  //             likes: 3
  //         },
  //         {
  //             id: 10,
  //             text: 'I think we should use a more consistent color palette.',
  //             memberId: 4,
  //             createdAt: 'Apr 21, 2024',
  //             likes: 3
  //         },
  //         {
  //             id: 11,
  //             text: 'I agree with the color palette suggestion.',
  //             memberId: 5,
  //             createdAt: 'Apr 21, 2024',
  //             likes: 3
  //         }

  //     ]
  // }
];
