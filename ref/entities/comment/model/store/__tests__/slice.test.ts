// ===================================================================
// Unit Tests for comment Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 33 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setComments,
  addComment,
  setHoveredCommentId,
  setFocusedCommentId,
  setSelectedCommentId,
} from '../slice';

describe('comment Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredCommentId: null,
      focusedCommentId: null,
      selectedCommentId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredCommentId).toBeNull();
      expect(state.focusedCommentId).toBeNull();
      expect(state.selectedCommentId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredCommentId', () => {
      it('should set hovered comment ID', () => {
        const state = reducer(initialState, setHoveredCommentId('comment-1'));

        expect(state.hoveredCommentId).toBe('comment-1');
      });

      it('should update hovered comment ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredCommentId: 'comment-1',
        };

        const state = reducer(stateWithHover, setHoveredCommentId('comment-2'));

        expect(state.hoveredCommentId).toBe('comment-2');
      });

      it('should set hovered comment ID to null', () => {
        const stateWithHover = {
          ...initialState,
          hoveredCommentId: 'comment-1',
        };

        const state = reducer(stateWithHover, setHoveredCommentId(null));

        expect(state.hoveredCommentId).toBeNull();
      });
    });

    describe('setFocusedCommentId', () => {
      it('should set focused comment ID', () => {
        const state = reducer(initialState, setFocusedCommentId('comment-1'));

        expect(state.focusedCommentId).toBe('comment-1');
      });

      it('should update focused comment ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedCommentId: 'comment-1',
        };

        const state = reducer(stateWithFocus, setFocusedCommentId('comment-2'));

        expect(state.focusedCommentId).toBe('comment-2');
      });

      it('should set focused comment ID to null', () => {
        const stateWithFocus = {
          ...initialState,
          focusedCommentId: 'comment-1',
        };

        const state = reducer(stateWithFocus, setFocusedCommentId(null));

        expect(state.focusedCommentId).toBeNull();
      });
    });

    describe('setSelectedCommentId', () => {
      it('should set selected comment ID', () => {
        const state = reducer(initialState, setSelectedCommentId('comment-1'));

        expect(state.selectedCommentId).toBe('comment-1');
      });

      it('should update selected comment ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedCommentId: 'comment-1',
        };

        const state = reducer(stateWithSelection, setSelectedCommentId('comment-2'));

        expect(state.selectedCommentId).toBe('comment-2');
      });

      it('should set selected comment ID to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedCommentId: 'comment-1',
        };

        const state = reducer(stateWithSelection, setSelectedCommentId(null));

        expect(state.selectedCommentId).toBeNull();
      });
    });
  });

  describe('Query Actions', () => {
    describe('setComments', () => {
      it('should set comments from array', () => {
        const comments = [
          { id: 'c1', text: 'Comment 1', authorId: 'user1' },
          { id: 'c2', text: 'Comment 2', authorId: 'user2' },
        ];

        const state = reducer(initialState, setComments(comments));

        expect(state.ids).toEqual(['c1', 'c2']);
        expect(state.entities.c1).toEqual(comments[0]);
        expect(state.entities.c2).toEqual(comments[1]);
      });

      it('should replace existing comments', () => {
        const stateWithComments = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', text: 'Old' } },
        };

        const newComments = [
          { id: 'new1', text: 'New 1' },
          { id: 'new2', text: 'New 2' },
        ];

        const state = reducer(stateWithComments, setComments(newComments));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newComments[0]);
      });

      it('should handle empty array', () => {
        const stateWithComments = {
          ...initialState,
          ids: ['c1'],
          entities: { c1: { id: 'c1', text: 'Comment' } },
        };

        const state = reducer(stateWithComments, setComments([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should handle single comment', () => {
        const comments = [{ id: 'c1', text: 'Solo comment' }];

        const state = reducer(initialState, setComments(comments));

        expect(state.ids).toEqual(['c1']);
        expect(state.entities.c1).toEqual(comments[0]);
      });

      it('should preserve UI state when setting comments', () => {
        const stateWithUI = {
          ...initialState,
          hoveredCommentId: 'hover-1',
          focusedCommentId: 'focus-1',
          selectedCommentId: 'select-1',
        };

        const comments = [{ id: 'c1', text: 'Comment' }];

        const state = reducer(stateWithUI, setComments(comments));

        expect(state.hoveredCommentId).toBe('hover-1');
        expect(state.focusedCommentId).toBe('focus-1');
        expect(state.selectedCommentId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addComment', () => {
      it('should add new comment', () => {
        const comment = { id: 'c1', text: 'New comment', authorId: 'user1' };

        const state = reducer(initialState, addComment(comment));

        expect(state.ids).toContain('c1');
        expect(state.entities.c1).toEqual(comment);
      });

      it('should add multiple comments', () => {
        let state = initialState;

        state = reducer(state, addComment({ id: 'c1', text: 'Comment 1' }));
        state = reducer(state, addComment({ id: 'c2', text: 'Comment 2' }));

        expect(state.ids).toEqual(['c1', 'c2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate comment if ID already exists', () => {
        const stateWithComment = {
          ...initialState,
          ids: ['c1'],
          entities: { c1: { id: 'c1', text: 'Original' } },
        };

        const state = reducer(stateWithComment, addComment({ id: 'c1', text: 'Updated' }));

        expect(state.ids.filter((id: string) => id === 'c1')).toHaveLength(1);
      });

      it('should preserve UI state when adding comment', () => {
        const stateWithUI = {
          ...initialState,
          hoveredCommentId: 'hover-1',
          focusedCommentId: 'focus-1',
          selectedCommentId: 'select-1',
        };

        const comment = { id: 'c1', text: 'Comment' };

        const state = reducer(stateWithUI, addComment(comment));

        expect(state.hoveredCommentId).toBe('hover-1');
        expect(state.focusedCommentId).toBe('focus-1');
        expect(state.selectedCommentId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full comment lifecycle', () => {
      let state = initialState;

      // Add comment
      state = reducer(state, addComment({ id: 'c1', text: 'Comment 1' }));
      expect(state.ids).toContain('c1');

      // Select comment
      state = reducer(state, setSelectedCommentId('c1'));
      expect(state.selectedCommentId).toBe('c1');

      // Hover comment
      state = reducer(state, setHoveredCommentId('c1'));
      expect(state.hoveredCommentId).toBe('c1');

      // Add more comments
      state = reducer(state, addComment({ id: 'c2', text: 'Comment 2' }));
      expect(state.ids).toHaveLength(2);
    });

    it('should handle multiple comments with different UI states', () => {
      let state = initialState;

      state = reducer(state, setComments([
        { id: 'c1', text: 'Comment 1' },
        { id: 'c2', text: 'Comment 2' },
        { id: 'c3', text: 'Comment 3' },
      ]));

      state = reducer(state, setSelectedCommentId('c1'));
      state = reducer(state, setFocusedCommentId('c2'));
      state = reducer(state, setHoveredCommentId('c3'));

      expect(state.selectedCommentId).toBe('c1');
      expect(state.focusedCommentId).toBe('c2');
      expect(state.hoveredCommentId).toBe('c3');
    });

    it('should handle replacing comments while maintaining UI state', () => {
      let state = initialState;

      // Set initial comments and UI state
      state = reducer(state, setComments([{ id: 'c1', text: 'Old' }]));
      state = reducer(state, setSelectedCommentId('c1'));

      // Replace comments
      state = reducer(state, setComments([{ id: 'c2', text: 'New' }]));

      // UI state should be preserved even though comment was replaced
      expect(state.selectedCommentId).toBe('c1');
      expect(state.entities.c1).toBeUndefined();
      expect(state.entities.c2).toBeDefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const comments = [
        { id: 'c1', text: 'Comment 1' },
        { id: 'c2', text: 'Comment 2' },
      ];

      const state = reducer(initialState, setComments(comments));

      // Entity adapter creates normalized structure
      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const comment = { id: 'c1', text: 'Comment', data: { nested: 'value' } };

      const state = reducer(initialState, addComment(comment));

      expect(state.entities.c1).toEqual(comment);
      expect(state.entities.c1.data).toEqual({ nested: 'value' });
    });

    it('should handle comments with complex data', () => {
      const comment = {
        id: 'c1',
        text: 'Comment',
        authorId: 'user1',
        timestamp: '2024-01-01T00:00:00Z',
        metadata: {
          edited: false,
          likes: 5,
          replies: [],
        },
      };

      const state = reducer(initialState, addComment(comment));

      expect(state.entities.c1).toEqual(comment);
    });
  });
});

