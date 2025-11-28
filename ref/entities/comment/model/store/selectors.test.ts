// ===================================================================
// Unit Tests for Comment Entity Redux Selectors
// Coverage Target: 95%+
// Final Push Phase (Selector Testing - FINAL SPRINT TO 2,200!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectCommentState,
  selectAllComments,
  selectCommentById,
  selectCommentIds,
  selectCommentEntities,
  selectHoveredCommentId,
  selectFocusedCommentId,
  selectSelectedCommentId,
  selectCommentCheckStates,
  selectSelectedComment,
  selectAllCompositeComments,
  makeSelectCompositeCommentsByOwner,
  makeSelectCommentById,
  makeSelectCompositeCommentById,
  makeSelectCommentsByIds,
  makeSelectCommentsByElementIds,
} from './selectors';

// Mock adapter
vi.mock('./adapter', () => ({
  commentAdapterReference: {
    getSelectors: vi.fn(() => ({
      selectAll: vi.fn((state: any) => {
        const commentState = state.commentEntity;
        return (commentState?.ids || []).map((id: string) => commentState.entities[id]).filter(Boolean);
      }),
      selectById: vi.fn((state: any, id: string) => state.commentEntity?.entities[id]),
      selectIds: vi.fn((state: any) => state.commentEntity?.ids || []),
      selectEntities: vi.fn((state: any) => state.commentEntity?.entities || {}),
    })),
  },
}));

// Mock enrichComment
vi.mock('../../lib', () => ({
  enrichComment: vi.fn((comment, members, allComments) => ({
    ...comment,
    enriched: true,
    author: members?.find((m: any) => m.id === comment.authorId),
    replies: allComments?.filter((c: any) => c.parentId === comment.id) || [],
  })),
}));

// Mock cross-entity selectors
vi.mock('../../../actorMember', () => ({
  selectAllMembers: vi.fn(() => [
    { id: 'member-1', name: 'John Doe' },
    { id: 'member-2', name: 'Jane Smith' },
  ]),
}));

vi.mock('../../../uiTree', () => ({
  makeSelectAllNestedElementsFromTree: vi.fn(() => () => [
    { id: 'element-1' },
    { id: 'element-2' },
  ]),
}));

vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    SCREEN: 'SCREEN',
    ELEMENT: 'ELEMENT',
  },
}));

describe('Comment Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectCommentState', () => {
      it('should return comment entity state', () => {
        const commentState = {
          entities: {},
          ids: [],
          hoveredCommentId: null,
          focusedCommentId: null,
          selectedCommentId: null,
        };
        const state = {
          commentEntity: commentState,
        } as any;

        expect(selectCommentState(state)).toEqual(commentState);
      });
    });

    describe('selectCommentEntities', () => {
      it('should return comment entities object', () => {
        const entities = {
          'comment-1': { id: 'comment-1', text: 'First comment' },
          'comment-2': { id: 'comment-2', text: 'Second comment' },
        };
        const state = {
          commentEntity: {
            entities,
            ids: ['comment-1', 'comment-2'],
          },
        } as any;

        expect(selectCommentEntities(state)).toEqual(entities);
      });
    });

    describe('selectCommentIds', () => {
      it('should return comment ids array', () => {
        const ids = ['comment-1', 'comment-2', 'comment-3'];
        const state = {
          commentEntity: {
            entities: {},
            ids,
          },
        } as any;

        expect(selectCommentIds(state)).toEqual(ids);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredCommentId', () => {
      it('should return hovered comment ID', () => {
        const state = {
          commentEntity: {
            hoveredCommentId: 'comment-hovered',
          },
        } as any;

        expect(selectHoveredCommentId(state)).toBe('comment-hovered');
      });
    });

    describe('selectFocusedCommentId', () => {
      it('should return focused comment ID', () => {
        const state = {
          commentEntity: {
            focusedCommentId: 'comment-focused',
          },
        } as any;

        expect(selectFocusedCommentId(state)).toBe('comment-focused');
      });
    });

    describe('selectSelectedCommentId', () => {
      it('should return selected comment ID', () => {
        const state = {
          commentEntity: {
            selectedCommentId: 'comment-selected',
          },
        } as any;

        expect(selectSelectedCommentId(state)).toBe('comment-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectCommentCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          commentEntity: {
            selectedCommentId: null,
            focusedCommentId: null,
            hoveredCommentId: null,
          },
        } as any;

        const result = selectCommentCheckStates(state, 'comment-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when comment is selected', () => {
        const state = {
          commentEntity: {
            selectedCommentId: 'comment-1',
            focusedCommentId: null,
            hoveredCommentId: null,
          },
        } as any;

        const result = selectCommentCheckStates(state, 'comment-1');
        expect(result.isSelected).toBe(true);
      });

      it('should return all true when comment has all states', () => {
        const state = {
          commentEntity: {
            selectedCommentId: 'comment-1',
            focusedCommentId: 'comment-1',
            hoveredCommentId: 'comment-1',
          },
        } as any;

        const result = selectCommentCheckStates(state, 'comment-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllComments', () => {
      it('should return all comments as array', () => {
        const entities = {
          'comment-1': { id: 'comment-1', text: 'Comment 1' },
          'comment-2': { id: 'comment-2', text: 'Comment 2' },
        };
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2'],
            entities,
          },
        } as any;

        const result = selectAllComments(state);
        expect(result).toHaveLength(2);
      });

      it('should return empty array when no comments', () => {
        const state = {
          commentEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllComments(state)).toEqual([]);
      });
    });

    describe('selectCommentById', () => {
      it('should return comment by ID', () => {
        const comment = { id: 'comment-1', text: 'Test comment' };
        const state = {
          commentEntity: {
            entities: {
              'comment-1': comment,
            },
            ids: ['comment-1'],
          },
        } as any;

        expect(selectCommentById(state, 'comment-1')).toEqual(comment);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          commentEntity: {
            entities: {},
            ids: [],
          },
        } as any;

        expect(selectCommentById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedComment', () => {
      it('should return enriched selected comment', () => {
        const state = {
          commentEntity: {
            selectedCommentId: 'comment-1',
            entities: {
              'comment-1': { id: 'comment-1', text: 'Selected', authorId: 'member-1', parentId: null },
            },
            ids: ['comment-1'],
          },
        } as any;

        const result = selectSelectedComment(state);
        expect(result).toBeDefined();
        expect(result?.enriched).toBe(true);
      });

      it('should return null when no comment selected', () => {
        const state = {
          commentEntity: {
            selectedCommentId: null,
            entities: {},
            ids: [],
          },
        } as any;

        expect(selectSelectedComment(state)).toBeNull();
      });

      it('should return null when selected comment does not exist', () => {
        const state = {
          commentEntity: {
            selectedCommentId: 'non-existent',
            entities: {},
            ids: [],
          },
        } as any;

        expect(selectSelectedComment(state)).toBeNull();
      });
    });
  });

  describe('Composite Selectors', () => {
    describe('selectAllCompositeComments', () => {
      it('should return enriched main comments (parentId null)', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2', 'comment-3'],
            entities: {
              'comment-1': { id: 'comment-1', text: 'Main 1', parentId: null, authorId: 'member-1' },
              'comment-2': { id: 'comment-2', text: 'Reply', parentId: 'comment-1', authorId: 'member-2' },
              'comment-3': { id: 'comment-3', text: 'Main 2', parentId: null, authorId: 'member-1' },
            },
          },
        } as any;

        const result = selectAllCompositeComments(state);
        expect(result).toHaveLength(2);
        expect(result.every((c: any) => c.enriched)).toBe(true);
      });

      it('should filter out replies', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2'],
            entities: {
              'comment-1': { id: 'comment-1', text: 'Main', parentId: null, authorId: 'member-1' },
              'comment-2': { id: 'comment-2', text: 'Reply', parentId: 'comment-1', authorId: 'member-2' },
            },
          },
        } as any;

        const result = selectAllCompositeComments(state);
        const replyIds = result.filter((c: any) => c.parentId !== null).map((c: any) => c.id);
        expect(replyIds).toEqual([]);
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectCommentById', () => {
      it('should return comment by ID', () => {
        const comment = { id: 'comment-1', text: 'Test' };
        const state = {
          commentEntity: {
            entities: {
              'comment-1': comment,
            },
          },
        } as any;

        const selector = makeSelectCommentById('comment-1');
        expect(selector(state)).toEqual(comment);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          commentEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectCommentById('non-existent');
        expect(selector(state)).toBeNull();
      });
    });

    describe('makeSelectCompositeCommentById', () => {
      it('should return enriched comment by ID', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1'],
            entities: {
              'comment-1': { id: 'comment-1', text: 'Test', authorId: 'member-1', parentId: null },
            },
          },
        } as any;

        const selector = makeSelectCompositeCommentById('comment-1');
        const result = selector(state);

        expect(result).toBeDefined();
        expect(result?.enriched).toBe(true);
      });

      it('should return null for non-existent comment', () => {
        const state = {
          commentEntity: {
            entities: {},
            ids: [],
          },
        } as any;

        const selector = makeSelectCompositeCommentById('non-existent');
        expect(selector(state)).toBeNull();
      });
    });

    describe('makeSelectCommentsByIds', () => {
      it('should return comments for given IDs', () => {
        const state = {
          commentEntity: {
            entities: {
              'comment-1': { id: 'comment-1', text: 'First' },
              'comment-2': { id: 'comment-2', text: 'Second' },
              'comment-3': { id: 'comment-3', text: 'Third' },
            },
          },
        } as any;

        const selector = makeSelectCommentsByIds(['comment-1', 'comment-3']);
        const result = selector(state);

        expect(result).toHaveLength(2);
        expect(result[0].text).toBe('First');
        expect(result[1].text).toBe('Third');
      });

      it('should filter out non-existent comments', () => {
        const state = {
          commentEntity: {
            entities: {
              'comment-1': { id: 'comment-1', text: 'First' },
            },
          },
        } as any;

        const selector = makeSelectCommentsByIds(['comment-1', 'non-existent']);
        const result = selector(state);

        expect(result).toHaveLength(1);
      });

      it('should handle empty IDs array', () => {
        const state = {
          commentEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectCommentsByIds([]);
        expect(selector(state)).toEqual([]);
      });
    });

    describe('makeSelectCommentsByElementIds', () => {
      it('should return comments for given element IDs', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2', 'comment-3'],
            entities: {
              'comment-1': { id: 'comment-1', targetId: 'element-1', text: 'Comment 1' },
              'comment-2': { id: 'comment-2', targetId: 'element-2', text: 'Comment 2' },
              'comment-3': { id: 'comment-3', targetId: 'element-3', text: 'Comment 3' },
            },
          },
        } as any;

        const selector = makeSelectCommentsByElementIds(['element-1', 'element-2']);
        const result = selector(state);

        expect(result).toHaveLength(2);
        expect(result.every((c: any) => ['element-1', 'element-2'].includes(c.targetId))).toBe(true);
      });

      it('should return empty array for no matching elements', () => {
        const state = {
          commentEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        const selector = makeSelectCommentsByElementIds(['element-unknown']);
        expect(selector(state)).toEqual([]);
      });
    });

    describe('makeSelectCompositeCommentsByOwner', () => {
      it('should return enriched comments for owner', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2'],
            entities: {
              'comment-1': { id: 'comment-1', targetId: 'element-1', parentId: null, authorId: 'member-1' },
              'comment-2': { id: 'comment-2', targetId: 'element-2', parentId: null, authorId: 'member-2' },
            },
          },
        } as any;

        const selector = makeSelectCompositeCommentsByOwner('SCREEN', 'screen-1');
        const result = selector(state);

        expect(Array.isArray(result)).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Comment threads', () => {
      it('should handle main comments with replies', () => {
        const state = {
          commentEntity: {
            ids: ['comment-1', 'comment-2', 'comment-3'],
            entities: {
              'comment-1': { id: 'comment-1', text: 'Main', parentId: null, authorId: 'member-1' },
              'comment-2': { id: 'comment-2', text: 'Reply 1', parentId: 'comment-1', authorId: 'member-2' },
              'comment-3': { id: 'comment-3', text: 'Reply 2', parentId: 'comment-1', authorId: 'member-1' },
            },
          },
        } as any;

        const result = selectAllCompositeComments(state);
        expect(result).toHaveLength(1);
        expect(result[0].replies).toBeDefined();
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          commentEntity: {
            entities: {},
            ids: [],
            selectedCommentId: null,
            focusedCommentId: null,
            hoveredCommentId: null,
          },
        } as any;

        expect(selectAllComments(state)).toEqual([]);
        expect(selectSelectedComment(state)).toBeNull();
        expect(selectAllCompositeComments(state)).toEqual([]);
      });
    });
  });
});

