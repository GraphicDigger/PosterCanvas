// ===================================================================
// Unit Tests for Document Slice
// CRITICAL BUSINESS LOGIC - Document State Management
// Phase 1, Day 10 - Part 2 (30 tests) - 60.8% Coverage!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { DocumentState } from '../../types';

// Mock the adapter
vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    createEntityAdapter: () => ({
      getInitialState: () => ({ ids: [], entities: {} }),
      addOne: (state: any, entity: any) => {
        state.entities[entity.id] = entity;
        if (!state.ids.includes(entity.id)) {
          state.ids.push(entity.id);
        }
      },
      updateOne: (state: any, update: any) => {
        if (state.entities[update.id]) {
          state.entities[update.id] = { ...state.entities[update.id], ...update.changes };
        }
      },
      removeOne: (state: any, id: any) => {
        delete state.entities[id];
        state.ids = state.ids.filter((existingId: any) => existingId !== id);
      },
      setAll: (state: any, entities: any[]) => {
        state.ids = entities.map((e) => e.id);
        state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
      },
    }),
  };
});

import documentEntitySlice, {
  setDocuments,
  setHoveredDocumentId,
  setFocusedDocumentId,
  setSelectedDocumentId,
  resetSelectedDocument,
  addDocument,
  updateDocument,
  removeDocument,
} from './slice';

describe('Document Slice', () => {
  let initialState: DocumentState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered document ID', () => {
      const state = documentEntitySlice(initialState, setHoveredDocumentId({ id: 'doc-1' } as any));
      expect(state.hoveredId).toBe('doc-1');
    });

    it('should set focused document ID', () => {
      const state = documentEntitySlice(initialState, setFocusedDocumentId({ id: 'doc-2' } as any));
      expect(state.focusedId).toBe('doc-2');
    });

    it('should set selected document ID', () => {
      const state = documentEntitySlice(initialState, setSelectedDocumentId({ id: 'doc-3' } as any));
      expect(state.selectedId).toBe('doc-3');
    });

    it('should reset selected document', () => {
      initialState.selectedId = 'doc-1';
      const state = documentEntitySlice(initialState, resetSelectedDocument());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Documents (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set Documents (Bulk Load)', () => {
    it('should set documents (replace all)', () => {
      const documents = [
        { id: 'doc-1', title: 'Requirements', type: 'spec', authorId: 'user-1' },
        { id: 'doc-2', title: 'Architecture', type: 'design', authorId: 'user-2' },
      ];

      const state = documentEntitySlice(initialState, setDocuments(documents));

      expect(state.ids).toEqual(['doc-1', 'doc-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing documents when setting new ones', () => {
      initialState.entities['doc-old'] = { id: 'doc-old', title: 'Old Doc' } as any;
      initialState.ids.push('doc-old');

      const documents = [{ id: 'doc-new', title: 'New Doc', type: 'note' }];
      const state = documentEntitySlice(initialState, setDocuments(documents));

      expect(state.entities['doc-old']).toBeUndefined();
      expect(state.entities['doc-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['doc-1'] = { id: 'doc-1', title: 'Doc' } as any;
      initialState.ids.push('doc-1');

      const state = documentEntitySlice(initialState, setDocuments([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting documents', () => {
      initialState.selectedId = 'doc-selected';

      const documents = [{ id: 'doc-1', title: 'Doc', type: 'note' }];
      const state = documentEntitySlice(initialState, setDocuments(documents));

      expect(state.selectedId).toBe('doc-selected');
    });

    it('should handle large number of documents', () => {
      const documents = Array.from({ length: 50 }, (_, i) => ({
        id: `doc-${i}`,
        title: `Document ${i}`,
        type: 'note',
      }));

      const state = documentEntitySlice(initialState, setDocuments(documents));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });

    it('should set documents with various properties', () => {
      const documents = [
        {
          id: 'doc-1',
          title: 'Project Requirements',
          content: 'Detailed requirements document',
          type: 'spec',
          authorId: 'user-1',
          createdAt: '2025-01-01',
          tags: ['important', 'review'],
        },
      ];

      const state = documentEntitySlice(initialState, setDocuments(documents));

      expect(state.entities['doc-1']).toEqual(documents[0]);
    });
  });

  // ===================================================================
  // PART 3: Add Document (7 tests)
  // ===================================================================

  describe('Add Document', () => {
    it('should add document', () => {
      const document = {
        id: 'doc-1',
        title: 'Requirements',
        type: 'spec',
      };

      const state = documentEntitySlice(initialState, addDocument(document));

      expect(state.ids).toContain('doc-1');
      expect(state.entities['doc-1']).toEqual(document);
    });

    it('should not add duplicate document', () => {
      initialState.entities['doc-1'] = { id: 'doc-1', title: 'Existing' } as any;
      initialState.ids.push('doc-1');

      const document = { id: 'doc-1', title: 'Duplicate' };
      const state = documentEntitySlice(initialState, addDocument(document));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing documents when adding new one', () => {
      initialState.entities['doc-existing'] = {
        id: 'doc-existing',
        title: 'Existing Doc',
      } as any;
      initialState.ids.push('doc-existing');

      const document = { id: 'doc-new', title: 'New Doc' };
      const state = documentEntitySlice(initialState, addDocument(document));

      expect(state.entities['doc-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding document', () => {
      initialState.selectedId = 'doc-selected';

      const document = { id: 'doc-1', title: 'Doc' };
      const state = documentEntitySlice(initialState, addDocument(document));

      expect(state.selectedId).toBe('doc-selected');
    });

    it('should add document with minimal properties', () => {
      const document = { id: 'doc-1' };
      const state = documentEntitySlice(initialState, addDocument(document as any));

      expect(state.entities['doc-1']).toEqual(document);
    });

    it('should add document with full properties', () => {
      const document = {
        id: 'doc-1',
        title: 'API Documentation',
        content: 'Complete API reference guide',
        type: 'documentation',
        authorId: 'user-1',
        version: '1.0.0',
        tags: ['api', 'reference'],
        lastModified: '2025-10-15',
      };

      const state = documentEntitySlice(initialState, addDocument(document as any));

      expect(state.entities['doc-1']).toEqual(document);
    });

    it('should maintain insertion order', () => {
      let state = documentEntitySlice(initialState, addDocument({ id: 'doc-3', title: 'Third' } as any));
      state = documentEntitySlice(state, addDocument({ id: 'doc-1', title: 'First' } as any));
      state = documentEntitySlice(state, addDocument({ id: 'doc-2', title: 'Second' } as any));

      expect(state.ids).toEqual(['doc-3', 'doc-1', 'doc-2']);
    });
  });

  // ===================================================================
  // PART 4: Update Document (6 tests)
  // ===================================================================

  describe('Update Document', () => {
    beforeEach(() => {
      initialState.entities['doc-1'] = {
        id: 'doc-1',
        title: 'Requirements',
        type: 'spec',
        authorId: 'user-1',
      } as any;
      initialState.ids.push('doc-1');
    });

    it('should update document properties', () => {
      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'doc-1',
          title: 'Updated Requirements',
          type: 'spec',
          authorId: 'user-2',
        } as any),
      );

      expect(state.entities['doc-1'].title).toBe('Updated Requirements');
      expect(state.entities['doc-1'].authorId).toBe('user-2');
    });

    it('should handle updating non-existent document', () => {
      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'non-existent',
          title: 'Ghost',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update document content', () => {
      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'doc-1',
          title: 'Requirements',
          type: 'spec',
          content: 'New detailed requirements',
          authorId: 'user-1',
        } as any),
      );

      expect(state.entities['doc-1'].content).toBe('New detailed requirements');
    });

    it('should not affect other documents when updating one', () => {
      initialState.entities['doc-2'] = {
        id: 'doc-2',
        title: 'Other Doc',
      } as any;
      initialState.ids.push('doc-2');

      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'doc-1',
          title: 'Updated',
          type: 'spec',
          authorId: 'user-1',
        } as any),
      );

      expect(state.entities['doc-2']).toEqual({
        id: 'doc-2',
        title: 'Other Doc',
      });
    });

    it('should not affect UI state when updating document', () => {
      initialState.selectedId = 'doc-1';

      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'doc-1',
          title: 'Updated',
          type: 'spec',
          authorId: 'user-1',
        } as any),
      );

      expect(state.selectedId).toBe('doc-1');
    });

    it('should handle document versioning', () => {
      const state = documentEntitySlice(
        initialState,
        updateDocument({
          id: 'doc-1',
          title: 'Requirements',
          type: 'spec',
          authorId: 'user-1',
          version: '2.0.0',
        } as any),
      );

      expect(state.entities['doc-1'].version).toBe('2.0.0');
    });
  });

  // ===================================================================
  // PART 5: Remove Document (3 tests)
  // ===================================================================

  describe('Remove Document', () => {
    beforeEach(() => {
      initialState.entities = {
        'doc-1': { id: 'doc-1', title: 'Doc 1' } as any,
        'doc-2': { id: 'doc-2', title: 'Doc 2' } as any,
      };
      initialState.ids = ['doc-1', 'doc-2'];
    });

    it('should remove document', () => {
      const state = documentEntitySlice(initialState, removeDocument('doc-1'));

      expect(state.ids).not.toContain('doc-1');
      expect(state.entities['doc-1']).toBeUndefined();
      expect(state.entities['doc-2']).toBeDefined();
    });

    it('should handle removing non-existent document', () => {
      const state = documentEntitySlice(initialState, removeDocument('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other documents', () => {
      const state = documentEntitySlice(initialState, removeDocument('doc-1'));

      expect(state.ids).toContain('doc-2');
      expect(state.entities['doc-2']).toEqual({
        id: 'doc-2',
        title: 'Doc 2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete document lifecycle', () => {
      let state = documentEntitySlice(
        initialState,
        addDocument({
          id: 'doc-1',
          title: 'Requirements',
          type: 'spec',
          authorId: 'user-1',
          version: '1.0.0',
        } as any),
      );
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Updated Requirements',
          type: 'spec',
          authorId: 'user-1',
          version: '1.1.0',
        } as any),
      );
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Final Requirements',
          type: 'spec',
          authorId: 'user-1',
          version: '2.0.0',
        } as any),
      );
      state = documentEntitySlice(state, setSelectedDocumentId({ id: 'doc-1' } as any));
      state = documentEntitySlice(state, removeDocument('doc-1'));

      expect(state.ids).not.toContain('doc-1');
      expect(state.selectedId).toBe('doc-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const documents = [
        { id: 'doc-1', title: 'Doc 1', type: 'note' },
        { id: 'doc-2', title: 'Doc 2', type: 'spec' },
      ];

      let state = documentEntitySlice(initialState, setDocuments(documents));
      state = documentEntitySlice(state, addDocument({ id: 'doc-3', title: 'Doc 3', type: 'design' } as any));
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Updated Doc 1',
          type: 'note',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['doc-1'].title).toBe('Updated Doc 1');
      expect(state.entities['doc-3']).toBeDefined();
    });

    it('should handle UI state changes with document operations', () => {
      let state = documentEntitySlice(
        initialState,
        addDocument({ id: 'doc-1', title: 'Doc', type: 'note' } as any),
      );
      state = documentEntitySlice(state, setHoveredDocumentId({ id: 'doc-1' } as any));
      state = documentEntitySlice(state, setFocusedDocumentId({ id: 'doc-1' } as any));
      state = documentEntitySlice(state, setSelectedDocumentId({ id: 'doc-1' } as any));
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Updated',
          type: 'spec',
        } as any),
      );

      expect(state.hoveredId).toBe('doc-1');
      expect(state.focusedId).toBe('doc-1');
      expect(state.selectedId).toBe('doc-1');
      expect(state.entities['doc-1'].title).toBe('Updated');
      expect(state.entities['doc-1'].type).toBe('spec');
    });

    it('should handle document collaboration workflow', () => {
      let state = documentEntitySlice(
        initialState,
        addDocument({
          id: 'doc-1',
          title: 'Shared Doc',
          type: 'collaborative',
          authorId: 'user-1',
        } as any),
      );

      // User 2 makes edits
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Shared Doc',
          type: 'collaborative',
          authorId: 'user-2',
          lastModifiedBy: 'user-2',
        } as any),
      );
      expect(state.entities['doc-1'].lastModifiedBy).toBe('user-2');

      // User 3 makes final review
      state = documentEntitySlice(
        state,
        updateDocument({
          id: 'doc-1',
          title: 'Shared Doc - Final',
          type: 'collaborative',
          authorId: 'user-2',
          lastModifiedBy: 'user-3',
        } as any),
      );
      expect(state.entities['doc-1'].title).toBe('Shared Doc - Final');
      expect(state.entities['doc-1'].lastModifiedBy).toBe('user-3');
    });
  });
});

