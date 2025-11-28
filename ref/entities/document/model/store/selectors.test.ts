// ===================================================================
// Unit Tests for Document Entity Redux Selectors
// Coverage Target: 95%+
// Beyond 2,200 Phase (Selector Testing - Toward 2,300!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectDocumentState,
  selectDocumentEntities,
  selectDocumentIds,
  selectHoveredDocumentId,
  selectFocusedDocumentId,
  selectSelectedDocumentId,
  selectDocumentCheckStates,
  selectAllDocuments,
  selectSelectedDocument,
  selectDocumentsByIds,
  selectDocumentById,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../@x/actorMember', () => ({
  selectMembersById: vi.fn((state: any, userId: string) => {
    if (userId === 'user-1') {return { id: 'member-1', name: 'John Doe', userId: 'user-1' };}
    if (userId === 'user-2') {return { id: 'member-2', name: 'Jane Smith', userId: 'user-2' };}
    return null;
  }),
}));

describe('Document Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectDocumentState', () => {
      it('should return document entity state', () => {
        const documentState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          documentEntity: documentState,
        } as any;

        expect(selectDocumentState(state)).toEqual(documentState);
      });
    });

    describe('selectDocumentEntities', () => {
      it('should return document entities object', () => {
        const entities = {
          'doc-1': { id: 'doc-1', title: 'Document 1', userId: 'user-1' },
          'doc-2': { id: 'doc-2', title: 'Document 2', userId: 'user-2' },
        };
        const state = {
          documentEntity: {
            entities,
          },
        } as any;

        expect(selectDocumentEntities(state)).toEqual(entities);
      });
    });

    describe('selectDocumentIds', () => {
      it('should return document ids array', () => {
        const ids = ['doc-1', 'doc-2', 'doc-3'];
        const state = {
          documentEntity: {
            ids,
          },
        } as any;

        expect(selectDocumentIds(state)).toEqual(ids);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredDocumentId', () => {
      it('should return hovered document ID', () => {
        const state = {
          documentEntity: {
            hoveredId: 'doc-hovered',
          },
        } as any;

        expect(selectHoveredDocumentId(state)).toBe('doc-hovered');
      });
    });

    describe('selectFocusedDocumentId', () => {
      it('should return focused document ID', () => {
        const state = {
          documentEntity: {
            focusedId: 'doc-focused',
          },
        } as any;

        expect(selectFocusedDocumentId(state)).toBe('doc-focused');
      });
    });

    describe('selectSelectedDocumentId', () => {
      it('should return selected document ID', () => {
        const state = {
          documentEntity: {
            selectedId: 'doc-selected',
          },
        } as any;

        expect(selectSelectedDocumentId(state)).toBe('doc-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectDocumentCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          documentEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectDocumentCheckStates(state, 'doc-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when document is selected', () => {
        const state = {
          documentEntity: {
            selectedId: 'doc-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectDocumentCheckStates(state, 'doc-1');
        expect(result.isSelected).toBe(true);
      });

      it('should return all true when document has all states', () => {
        const state = {
          documentEntity: {
            selectedId: 'doc-1',
            focusedId: 'doc-1',
            hoveredId: 'doc-1',
          },
        } as any;

        const result = selectDocumentCheckStates(state, 'doc-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllDocuments', () => {
      it('should return all documents with member data', () => {
        const entities = {
          'doc-1': { id: 'doc-1', title: 'Doc 1', userId: 'user-1' },
          'doc-2': { id: 'doc-2', title: 'Doc 2', userId: 'user-2' },
        };
        const state = {
          documentEntity: {
            ids: ['doc-1', 'doc-2'],
            entities,
          },
        } as any;

        const result = selectAllDocuments(state);
        expect(result).toHaveLength(2);
        expect(result[0].member).toBeDefined();
        expect(result[0].member?.name).toBe('John Doe');
      });

      it('should return empty array when no documents', () => {
        const state = {
          documentEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllDocuments(state)).toEqual([]);
      });

      it('should handle null ids', () => {
        const state = {
          documentEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllDocuments(state)).toEqual([]);
      });

      it('should set member to null when user not found', () => {
        const entities = {
          'doc-1': { id: 'doc-1', title: 'Doc 1', userId: 'user-unknown' },
        };
        const state = {
          documentEntity: {
            ids: ['doc-1'],
            entities,
          },
        } as any;

        const result = selectAllDocuments(state);
        expect(result[0].member).toBeNull();
      });
    });

    describe('selectSelectedDocument', () => {
      it('should return selected document', () => {
        const doc = { id: 'doc-selected', title: 'Selected', userId: 'user-1' };
        const state = {
          documentEntity: {
            selectedId: 'doc-selected',
            entities: {
              'doc-selected': doc,
            },
          },
        } as any;

        expect(selectSelectedDocument(state)).toEqual(doc);
      });

      it('should return null when no document selected', () => {
        const state = {
          documentEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedDocument(state)).toBeNull();
      });

      it('should return null when selected document does not exist', () => {
        const state = {
          documentEntity: {
            selectedId: 'doc-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedDocument(state)).toBeNull();
      });
    });

    describe('selectDocumentsByIds', () => {
      it('should return documents for given IDs', () => {
        const state = {
          documentEntity: {
            entities: {
              'doc-1': { id: 'doc-1', title: 'First' },
              'doc-2': { id: 'doc-2', title: 'Second' },
              'doc-3': { id: 'doc-3', title: 'Third' },
            },
          },
        } as any;

        const result = selectDocumentsByIds(state, ['doc-1', 'doc-3']);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('First');
        expect(result[1].title).toBe('Third');
      });

      it('should filter out non-existent documents', () => {
        const state = {
          documentEntity: {
            entities: {
              'doc-1': { id: 'doc-1', title: 'First' },
            },
          },
        } as any;

        const result = selectDocumentsByIds(state, ['doc-1', 'doc-missing']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          documentEntity: {
            entities: {},
          },
        } as any;

        const result = selectDocumentsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          documentEntity: {
            entities: {
              'doc-1': { id: 'doc-1', title: 'First' },
              'doc-2': { id: 'doc-2', title: 'Second' },
              'doc-3': { id: 'doc-3', title: 'Third' },
            },
          },
        } as any;

        const result = selectDocumentsByIds(state, ['doc-3', 'doc-1', 'doc-2']);
        expect(result[0].title).toBe('Third');
        expect(result[1].title).toBe('First');
        expect(result[2].title).toBe('Second');
      });
    });

    describe('selectDocumentById', () => {
      it('should return document by ID', () => {
        const doc = { id: 'doc-1', title: 'Test Document', userId: 'user-1' };
        const state = {
          documentEntity: {
            entities: {
              'doc-1': doc,
            },
          },
        } as any;

        expect(selectDocumentById(state, 'doc-1')).toEqual(doc);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          documentEntity: {
            entities: {},
          },
        } as any;

        expect(selectDocumentById(state, 'non-existent')).toBeNull();
      });

      it('should handle document with metadata', () => {
        const doc = {
          id: 'doc-1',
          title: 'Complex Document',
          userId: 'user-1',
          content: 'Document content',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          version: 2,
        };
        const state = {
          documentEntity: {
            entities: {
              'doc-1': doc,
            },
          },
        } as any;

        const result = selectDocumentById(state, 'doc-1');
        expect(result?.version).toBe(2);
        expect(result?.content).toBeDefined();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Document types', () => {
      it('should handle different document types', () => {
        const entities = {
          'doc-1': { id: 'doc-1', title: 'Text', type: 'text', userId: 'user-1' },
          'doc-2': { id: 'doc-2', title: 'Spreadsheet', type: 'spreadsheet', userId: 'user-2' },
          'doc-3': { id: 'doc-3', title: 'Presentation', type: 'presentation', userId: 'user-1' },
        };
        const state = {
          documentEntity: {
            ids: ['doc-1', 'doc-2', 'doc-3'],
            entities,
          },
        } as any;

        const result = selectAllDocuments(state);
        expect(result).toHaveLength(3);
        expect(result.map((d: any) => d.type)).toEqual(['text', 'spreadsheet', 'presentation']);
      });
    });

    describe('Document permissions', () => {
      it('should handle documents with permissions', () => {
        const doc = {
          id: 'doc-1',
          title: 'Shared Document',
          userId: 'user-1',
          permissions: {
            read: ['user-1', 'user-2'],
            write: ['user-1'],
            admin: ['user-1'],
          },
        };
        const state = {
          documentEntity: {
            entities: {
              'doc-1': doc,
            },
          },
        } as any;

        const result = selectDocumentById(state, 'doc-1');
        expect(result?.permissions?.read).toHaveLength(2);
        expect(result?.permissions?.write).toHaveLength(1);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          documentEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllDocuments(state)).toEqual([]);
        expect(selectSelectedDocument(state)).toBeNull();
        expect(selectDocumentsByIds(state, [])).toEqual([]);
      });
    });
  });
});

