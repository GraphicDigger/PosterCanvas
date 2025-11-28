// ===================================================================
// Unit Tests for Comment Slice
// CRITICAL BUSINESS LOGIC - Comment State Management
// Phase 1, Day 10 - Part 3 (30 tests) - 61.2% Coverage!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the custom adapter
vi.mock('./adapter', () => ({
  commentAdapterReference: {
    getInitialState: (extra: any) => ({
      ids: [],
      entities: {},
      ...extra,
    }),
    addOne: (state: any, entity: any) => {
      state.entities[entity.id] = entity;
      if (!state.ids.includes(entity.id)) {
        state.ids.push(entity.id);
      }
    },
    setAll: (state: any, entities: any[]) => {
      state.ids = entities.map((e) => e.id);
      state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
    },
  },
}));

import commentEntitySlice, {
  setComments,
  addComment,
  setHoveredCommentId,
  setFocusedCommentId,
  setSelectedCommentId,
} from './slice';

interface CommentState {
  ids: string[];
  entities: Record<string, any>;
  hoveredCommentId: string | null;
  focusedCommentId: string | null;
  selectedCommentId: string | null;
}

describe('Comment Slice', () => {
  let initialState: CommentState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredCommentId: null,
      focusedCommentId: null,
      selectedCommentId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered comment ID', () => {
      const state = commentEntitySlice(initialState, setHoveredCommentId('comment-1'));
      expect(state.hoveredCommentId).toBe('comment-1');
    });

    it('should set focused comment ID', () => {
      const state = commentEntitySlice(initialState, setFocusedCommentId('comment-2'));
      expect(state.focusedCommentId).toBe('comment-2');
    });

    it('should set selected comment ID', () => {
      const state = commentEntitySlice(initialState, setSelectedCommentId('comment-3'));
      expect(state.selectedCommentId).toBe('comment-3');
    });
  });

  // ===================================================================
  // PART 2: Set Comments (Bulk Load) (8 tests)
  // ===================================================================

  describe('Set Comments (Bulk Load)', () => {
    it('should set comments (replace all)', () => {
      const comments = [
        { id: 'comment-1', text: 'Great work!', authorId: 'user-1', targetId: 'screen-1' },
        { id: 'comment-2', text: 'Needs improvement', authorId: 'user-2', targetId: 'screen-1' },
      ];

      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.ids).toEqual(['comment-1', 'comment-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing comments when setting new ones', () => {
      initialState.entities['comment-old'] = { id: 'comment-old', text: 'Old' } as any;
      initialState.ids.push('comment-old');

      const comments = [{ id: 'comment-new', text: 'New comment' }];
      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.entities['comment-old']).toBeUndefined();
      expect(state.entities['comment-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['comment-1'] = { id: 'comment-1', text: 'Comment' } as any;
      initialState.ids.push('comment-1');

      const state = commentEntitySlice(initialState, setComments([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting comments', () => {
      initialState.selectedCommentId = 'comment-selected';

      const comments = [{ id: 'comment-1', text: 'Comment' }];
      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.selectedCommentId).toBe('comment-selected');
    });

    it('should handle large number of comments', () => {
      const comments = Array.from({ length: 100 }, (_, i) => ({
        id: `comment-${i}`,
        text: `Comment ${i}`,
        authorId: 'user-1',
      }));

      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });

    it('should set comments with various properties', () => {
      const comments = [
        {
          id: 'comment-1',
          text: 'Excellent design!',
          authorId: 'user-1',
          targetId: 'screen-1',
          pinPosition: { x: 100, y: 200 },
          createdAt: '2025-01-01',
        },
      ];

      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.entities['comment-1']).toEqual(comments[0]);
    });

    it('should preserve comment order from payload', () => {
      const comments = [
        { id: 'comment-3', text: 'Third' },
        { id: 'comment-1', text: 'First' },
        { id: 'comment-2', text: 'Second' },
      ];

      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.ids).toEqual(['comment-3', 'comment-1', 'comment-2']);
    });

    it('should handle comments with replies', () => {
      const comments = [
        {
          id: 'comment-1',
          text: 'Main comment',
          authorId: 'user-1',
          replies: ['reply-1', 'reply-2'],
        },
      ];

      const state = commentEntitySlice(initialState, setComments(comments));

      expect(state.entities['comment-1'].replies).toEqual(['reply-1', 'reply-2']);
    });
  });

  // ===================================================================
  // PART 3: Add Comment (10 tests)
  // ===================================================================

  describe('Add Comment', () => {
    it('should add comment', () => {
      const comment = {
        id: 'comment-1',
        text: 'Great work!',
        authorId: 'user-1',
      };

      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.ids).toContain('comment-1');
      expect(state.entities['comment-1']).toEqual(comment);
    });

    it('should not add duplicate comment', () => {
      initialState.entities['comment-1'] = { id: 'comment-1', text: 'Existing' } as any;
      initialState.ids.push('comment-1');

      const comment = { id: 'comment-1', text: 'Duplicate' };
      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing comments when adding new one', () => {
      initialState.entities['comment-existing'] = {
        id: 'comment-existing',
        text: 'Existing',
      } as any;
      initialState.ids.push('comment-existing');

      const comment = { id: 'comment-new', text: 'New' };
      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.entities['comment-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding comment', () => {
      initialState.selectedCommentId = 'comment-selected';

      const comment = { id: 'comment-1', text: 'Comment' };
      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.selectedCommentId).toBe('comment-selected');
    });

    it('should add comment with minimal properties', () => {
      const comment = { id: 'comment-1' };
      const state = commentEntitySlice(initialState, addComment(comment as any));

      expect(state.entities['comment-1']).toEqual(comment);
    });

    it('should add comment with full properties', () => {
      const comment = {
        id: 'comment-1',
        text: 'Detailed feedback on the design',
        authorId: 'user-1',
        targetId: 'screen-1',
        pinPosition: { x: 150, y: 250 },
        createdAt: '2025-10-15',
        resolved: false,
        tags: ['design', 'urgent'],
      };

      const state = commentEntitySlice(initialState, addComment(comment as any));

      expect(state.entities['comment-1']).toEqual(comment);
    });

    it('should maintain insertion order', () => {
      let state = commentEntitySlice(initialState, addComment({ id: 'comment-3', text: 'Third' } as any));
      state = commentEntitySlice(state, addComment({ id: 'comment-1', text: 'First' } as any));
      state = commentEntitySlice(state, addComment({ id: 'comment-2', text: 'Second' } as any));

      expect(state.ids).toEqual(['comment-3', 'comment-1', 'comment-2']);
    });

    it('should add comment with pin position', () => {
      const comment = {
        id: 'comment-1',
        text: 'Fix this button',
        authorId: 'user-1',
        targetId: 'element-1',
        pinPosition: { x: 100, y: 200 },
      };

      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.entities['comment-1'].pinPosition).toEqual({ x: 100, y: 200 });
    });

    it('should add comment with replies array', () => {
      const comment = {
        id: 'comment-1',
        text: 'Main comment',
        authorId: 'user-1',
        replies: [],
      };

      const state = commentEntitySlice(initialState, addComment(comment as any));

      expect(state.entities['comment-1'].replies).toEqual([]);
    });

    it('should add comment with resolved status', () => {
      const comment = {
        id: 'comment-1',
        text: 'Done!',
        authorId: 'user-1',
        resolved: true,
      };

      const state = commentEntitySlice(initialState, addComment(comment as any));

      expect(state.entities['comment-1'].resolved).toBe(true);
    });
  });

  // ===================================================================
  // PART 4: Integration Scenarios (9 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle comment lifecycle', () => {
      let state = commentEntitySlice(
        initialState,
        addComment({
          id: 'comment-1',
          text: 'Please review',
          authorId: 'user-1',
          targetId: 'screen-1',
          resolved: false,
        } as any),
      );
      state = commentEntitySlice(state, setSelectedCommentId('comment-1'));

      expect(state.ids).toContain('comment-1');
      expect(state.selectedCommentId).toBe('comment-1');
    });

    it('should maintain data integrity across operations', () => {
      const comments = [
        { id: 'comment-1', text: 'Comment 1', authorId: 'user-1' },
        { id: 'comment-2', text: 'Comment 2', authorId: 'user-2' },
      ];

      let state = commentEntitySlice(initialState, setComments(comments));
      state = commentEntitySlice(state, addComment({ id: 'comment-3', text: 'Comment 3', authorId: 'user-1' } as any));

      expect(state.ids).toHaveLength(3);
      expect(state.entities['comment-1'].text).toBe('Comment 1');
      expect(state.entities['comment-3']).toBeDefined();
    });

    it('should handle UI state changes with comment operations', () => {
      let state = commentEntitySlice(
        initialState,
        addComment({ id: 'comment-1', text: 'Comment', authorId: 'user-1' } as any),
      );
      state = commentEntitySlice(state, setHoveredCommentId('comment-1'));
      state = commentEntitySlice(state, setFocusedCommentId('comment-1'));
      state = commentEntitySlice(state, setSelectedCommentId('comment-1'));

      expect(state.hoveredCommentId).toBe('comment-1');
      expect(state.focusedCommentId).toBe('comment-1');
      expect(state.selectedCommentId).toBe('comment-1');
      expect(state.entities['comment-1'].text).toBe('Comment');
    });

    it('should handle batch comment additions', () => {
      let state = commentEntitySlice(initialState, addComment({ id: 'comment-1', text: 'First' } as any));
      state = commentEntitySlice(state, addComment({ id: 'comment-2', text: 'Second' } as any));
      state = commentEntitySlice(state, addComment({ id: 'comment-3', text: 'Third' } as any));

      expect(state.ids).toEqual(['comment-1', 'comment-2', 'comment-3']);
      expect(Object.keys(state.entities)).toHaveLength(3);
    });

    it('should handle comment thread workflow', () => {
      let state = commentEntitySlice(
        initialState,
        addComment({
          id: 'comment-1',
          text: 'Main thread',
          authorId: 'user-1',
          replies: [],
        } as any),
      );

      // Simulate adding replies
      state = commentEntitySlice(
        state,
        addComment({
          id: 'reply-1',
          text: 'Reply to main',
          authorId: 'user-2',
          parentId: 'comment-1',
        } as any),
      );

      expect(state.entities['comment-1']).toBeDefined();
      expect(state.entities['reply-1']).toBeDefined();
    });

    it('should handle comment with pin positioning', () => {
      const comment = {
        id: 'comment-1',
        text: 'Fix this area',
        authorId: 'user-1',
        targetId: 'screen-1',
        pinPosition: { x: 200, y: 300 },
      };

      const state = commentEntitySlice(initialState, addComment(comment));

      expect(state.entities['comment-1'].pinPosition).toEqual({ x: 200, y: 300 });
    });

    it('should handle multiple UI state changes', () => {
      let state = commentEntitySlice(
        initialState,
        addComment({ id: 'comment-1', text: 'First' } as any),
      );
      state = commentEntitySlice(state, addComment({ id: 'comment-2', text: 'Second' } as any));
      state = commentEntitySlice(state, setHoveredCommentId('comment-1'));
      state = commentEntitySlice(state, setFocusedCommentId('comment-2'));
      state = commentEntitySlice(state, setSelectedCommentId('comment-1'));

      expect(state.hoveredCommentId).toBe('comment-1');
      expect(state.focusedCommentId).toBe('comment-2');
      expect(state.selectedCommentId).toBe('comment-1');
    });

    it('should handle comment with metadata', () => {
      const comment = {
        id: 'comment-1',
        text: 'Design feedback',
        authorId: 'user-1',
        targetId: 'screen-1',
        resolved: false,
        createdAt: '2025-10-15',
        updatedAt: '2025-10-15',
        tags: ['design', 'feedback'],
      };

      const state = commentEntitySlice(initialState, addComment(comment as any));

      expect(state.entities['comment-1'].tags).toEqual(['design', 'feedback']);
      expect(state.entities['comment-1'].resolved).toBe(false);
    });

    it('should replace all comments and preserve UI state', () => {
      // Add initial comments
      let state = commentEntitySlice(initialState, addComment({ id: 'comment-1', text: 'First' } as any));
      state = commentEntitySlice(state, addComment({ id: 'comment-2', text: 'Second' } as any));
      state = commentEntitySlice(state, setSelectedCommentId('comment-1'));

      // Replace all comments
      const newComments = [
        { id: 'comment-3', text: 'Third' },
        { id: 'comment-4', text: 'Fourth' },
      ];
      state = commentEntitySlice(state, setComments(newComments));

      expect(state.ids).toEqual(['comment-3', 'comment-4']);
      expect(state.selectedCommentId).toBe('comment-1'); // UI state preserved
      expect(state.entities['comment-1']).toBeUndefined();
    });
  });
});

