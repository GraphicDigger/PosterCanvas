// ===================================================================
// Unit Tests for document Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setDocuments,
  setHoveredDocumentId,
  setFocusedDocumentId,
  setSelectedDocumentId,
  resetSelectedDocument,
  addDocument,
  updateDocument,
  removeDocument,
} from '../slice';

describe('document Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredId).toBeNull();
      expect(state.focusedId).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredDocumentId', () => {
      it('should set hovered document ID', () => {
        const state = reducer(initialState, setHoveredDocumentId({ id: 'doc-1' }));

        expect(state.hoveredId).toBe('doc-1');
      });

      it('should update hovered document ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'doc-1',
        };

        const state = reducer(stateWithHover, setHoveredDocumentId({ id: 'doc-2' }));

        expect(state.hoveredId).toBe('doc-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'doc-1',
        };

        const state = reducer(stateWithHover, setHoveredDocumentId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedDocumentId', () => {
      it('should set focused document ID', () => {
        const state = reducer(initialState, setFocusedDocumentId({ id: 'doc-1' }));

        expect(state.focusedId).toBe('doc-1');
      });

      it('should update focused document ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'doc-1',
        };

        const state = reducer(stateWithFocus, setFocusedDocumentId({ id: 'doc-2' }));

        expect(state.focusedId).toBe('doc-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'doc-1',
        };

        const state = reducer(stateWithFocus, setFocusedDocumentId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedDocumentId', () => {
      it('should set selected document ID', () => {
        const state = reducer(initialState, setSelectedDocumentId({ id: 'doc-1' }));

        expect(state.selectedId).toBe('doc-1');
      });

      it('should update selected document ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'doc-1',
        };

        const state = reducer(stateWithSelection, setSelectedDocumentId({ id: 'doc-2' }));

        expect(state.selectedId).toBe('doc-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'doc-1',
        };

        const state = reducer(stateWithSelection, setSelectedDocumentId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedDocument', () => {
      it('should reset selected document to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'doc-1',
        };

        const state = reducer(stateWithSelection, resetSelectedDocument());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'doc-1',
          focusedId: 'doc-2',
          selectedId: 'doc-3',
        };

        const state = reducer(stateWithUI, resetSelectedDocument());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('doc-1');
        expect(state.focusedId).toBe('doc-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setDocuments', () => {
      it('should set documents from array', () => {
        const documents = [
          { id: 'd1', title: 'Document 1', content: 'Content 1' },
          { id: 'd2', title: 'Document 2', content: 'Content 2' },
        ];

        const state = reducer(initialState, setDocuments(documents));

        expect(state.ids).toEqual(['d1', 'd2']);
        expect(state.entities.d1).toEqual(documents[0]);
        expect(state.entities.d2).toEqual(documents[1]);
      });

      it('should replace existing documents', () => {
        const stateWithDocuments = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', title: 'Old' } },
        };

        const newDocuments = [
          { id: 'new1', title: 'New 1' },
          { id: 'new2', title: 'New 2' },
        ];

        const state = reducer(stateWithDocuments, setDocuments(newDocuments));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newDocuments[0]);
      });

      it('should handle empty array', () => {
        const stateWithDocuments = {
          ...initialState,
          ids: ['d1'],
          entities: { d1: { id: 'd1', title: 'Doc' } },
        };

        const state = reducer(stateWithDocuments, setDocuments([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting documents', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const documents = [{ id: 'd1', title: 'Document' }];

        const state = reducer(stateWithUI, setDocuments(documents));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addDocument', () => {
      it('should add new document', () => {
        const document = { id: 'd1', title: 'New Document', content: 'Content' };

        const state = reducer(initialState, addDocument(document));

        expect(state.ids).toContain('d1');
        expect(state.entities.d1).toEqual(document);
      });

      it('should add multiple documents', () => {
        let state = initialState;

        state = reducer(state, addDocument({ id: 'd1', title: 'Doc 1' }));
        state = reducer(state, addDocument({ id: 'd2', title: 'Doc 2' }));

        expect(state.ids).toEqual(['d1', 'd2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate document if ID already exists', () => {
        const stateWithDocument = {
          ...initialState,
          ids: ['d1'],
          entities: { d1: { id: 'd1', title: 'Original' } },
        };

        const state = reducer(stateWithDocument, addDocument({ id: 'd1', title: 'Updated' }));

        expect(state.ids.filter((id: string) => id === 'd1')).toHaveLength(1);
      });
    });

    describe('updateDocument', () => {
      it('should update existing document', () => {
        const stateWithDocument = {
          ...initialState,
          ids: ['d1'],
          entities: {
            d1: { id: 'd1', title: 'Old Title', content: 'Old Content' },
          },
        };

        const state = reducer(
          stateWithDocument,
          updateDocument({ id: 'd1', title: 'New Title', content: 'New Content' }),
        );

        expect(state.entities.d1.title).toBe('New Title');
        expect(state.entities.d1.content).toBe('New Content');
      });

      it('should not update non-existent document', () => {
        const state = reducer(
          initialState,
          updateDocument({ id: 'non-existent', title: 'Test' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithDocument = {
          ...initialState,
          ids: ['d1'],
          entities: {
            d1: { id: 'd1', title: 'Title', content: 'Content', author: 'user1' },
          },
        };

        const state = reducer(
          stateWithDocument,
          updateDocument({ id: 'd1', title: 'New Title' }),
        );

        expect(state.entities.d1.title).toBe('New Title');
        expect(state.entities.d1.content).toBe('Content');
        expect(state.entities.d1.author).toBe('user1');
      });
    });

    describe('removeDocument', () => {
      it('should remove document from entities and ids', () => {
        const stateWithDocuments = {
          ...initialState,
          ids: ['d1', 'd2'],
          entities: {
            d1: { id: 'd1', title: 'Doc 1' },
            d2: { id: 'd2', title: 'Doc 2' },
          },
        };

        const state = reducer(stateWithDocuments, removeDocument('d1'));

        expect(state.ids).toEqual(['d2']);
        expect(state.entities.d1).toBeUndefined();
        expect(state.entities.d2).toBeDefined();
      });

      it('should handle removing non-existent document', () => {
        const state = reducer(initialState, removeDocument('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other documents', () => {
        const stateWithDocuments = {
          ...initialState,
          ids: ['d1', 'd2', 'd3'],
          entities: {
            d1: { id: 'd1' },
            d2: { id: 'd2' },
            d3: { id: 'd3' },
          },
        };

        const state = reducer(stateWithDocuments, removeDocument('d2'));

        expect(state.ids).toEqual(['d1', 'd3']);
        expect(state.entities.d1).toBeDefined();
        expect(state.entities.d3).toBeDefined();
      });

      it('should preserve UI state when removing document', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['d1'],
          entities: { d1: { id: 'd1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeDocument('d1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full document lifecycle', () => {
      let state = initialState;

      // Add document
      state = reducer(state, addDocument({ id: 'd1', title: 'Document 1' }));
      expect(state.ids).toContain('d1');

      // Select document
      state = reducer(state, setSelectedDocumentId({ id: 'd1' }));
      expect(state.selectedId).toBe('d1');

      // Update document
      state = reducer(state, updateDocument({ id: 'd1', title: 'Updated Document' }));
      expect(state.entities.d1.title).toBe('Updated Document');

      // Remove document
      state = reducer(state, removeDocument('d1'));
      expect(state.entities.d1).toBeUndefined();
    });

    it('should handle multiple documents with different UI states', () => {
      let state = initialState;

      state = reducer(state, setDocuments([
        { id: 'd1', title: 'Doc 1' },
        { id: 'd2', title: 'Doc 2' },
        { id: 'd3', title: 'Doc 3' },
      ]));

      state = reducer(state, setSelectedDocumentId({ id: 'd1' }));
      state = reducer(state, setFocusedDocumentId({ id: 'd2' }));
      state = reducer(state, setHoveredDocumentId({ id: 'd3' }));

      expect(state.selectedId).toBe('d1');
      expect(state.focusedId).toBe('d2');
      expect(state.hoveredId).toBe('d3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addDocument({ id: 'd1', title: 'Doc 1' }));
      state = reducer(state, addDocument({ id: 'd2', title: 'Doc 2' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setDocuments)
      state = reducer(state, setDocuments([
        { id: 'd1', title: 'Doc 1 Updated' },
        { id: 'd2', title: 'Doc 2 Updated' },
        { id: 'd3', title: 'Doc 3' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateDocument({ id: 'd1', title: 'Doc 1 Final' }));
      expect(state.entities.d1.title).toBe('Doc 1 Final');

      // Delete
      state = reducer(state, removeDocument('d2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.d2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const documents = [
        { id: 'd1', title: 'Doc 1' },
        { id: 'd2', title: 'Doc 2' },
      ];

      const state = reducer(initialState, setDocuments(documents));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const document = {
        id: 'd1',
        title: 'Document',
        metadata: { created: '2024-01-01', tags: ['tag1', 'tag2'] },
      };

      const state = reducer(initialState, addDocument(document));

      expect(state.entities.d1).toEqual(document);
      expect(state.entities.d1.metadata).toEqual({ created: '2024-01-01', tags: ['tag1', 'tag2'] });
    });

    it('should handle documents with complex data', () => {
      const document = {
        id: 'd1',
        title: 'Complex Document',
        content: 'Long content...',
        author: { id: 'user1', name: 'John Doe' },
        metadata: {
          created: '2024-01-01T00:00:00Z',
          modified: '2024-01-02T00:00:00Z',
          tags: ['important', 'draft'],
          version: 1,
        },
      };

      const state = reducer(initialState, addDocument(document));

      expect(state.entities.d1).toEqual(document);
    });
  });
});

