// ===================================================================
// Unit Tests for dataRecordEditor Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (MEDIUM IMPACT - 41 lines, self-contained)
// Risk: LOW (Redux Toolkit, draft record editing state)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import editorReducer, {
  updateDraftField,
  clearDraft,
} from '../slice';

describe('dataRecordEditor Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      draft: {
        recordId: null,
        changes: {},
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = editorReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have null recordId', () => {
      const result = editorReducer(undefined, { type: '@@INIT' });

      expect(result.draft.recordId).toBeNull();
    });

    it('should have empty changes object', () => {
      const result = editorReducer(undefined, { type: '@@INIT' });

      expect(result.draft.changes).toEqual({});
    });
  });

  describe('updateDraftField', () => {
    describe('First Field Update (recordId is null)', () => {
      it('should set recordId and add first field change', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'field-1',
          value: 'John Doe',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['field-1']).toBe('John Doe');
      });

      it('should handle numeric value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'age',
          value: 25,
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['age']).toBe(25);
      });

      it('should handle boolean value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'isActive',
          value: true,
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['isActive']).toBe(true);
      });

      it('should handle object value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'metadata',
          value: { key: 'value', nested: { data: 123 } },
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['metadata']).toEqual({ key: 'value', nested: { data: 123 } });
      });

      it('should handle array value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'tags',
          value: ['tag1', 'tag2', 'tag3'],
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['tags']).toEqual(['tag1', 'tag2', 'tag3']);
      });

      it('should handle null value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'field-1',
          value: null,
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['field-1']).toBeNull();
      });

      it('should handle undefined value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'field-1',
          value: undefined,
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['field-1']).toBeUndefined();
      });

      it('should handle empty string value', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'field-1',
          value: '',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBe('record-1');
        expect(result.draft.changes['field-1']).toBe('');
      });
    });

    describe('Subsequent Field Updates (recordId is set)', () => {
      it('should add multiple fields to same record', () => {
        let state = initialState;

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John Doe',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'email',
          value: 'john@example.com',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'age',
          value: 30,
        }));

        expect(state.draft.recordId).toBe('record-1');
        expect(state.draft.changes['name']).toBe('John Doe');
        expect(state.draft.changes['email']).toBe('john@example.com');
        expect(state.draft.changes['age']).toBe(30);
      });

      it('should update existing field value', () => {
        let state = initialState;

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John Doe',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'Jane Smith',
        }));

        expect(state.draft.recordId).toBe('record-1');
        expect(state.draft.changes['name']).toBe('Jane Smith');
      });

      it('should ignore updates for different recordId', () => {
        let state = initialState;

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John Doe',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-2',
          modelFieldId: 'email',
          value: 'jane@example.com',
        }));

        expect(state.draft.recordId).toBe('record-1');
        expect(state.draft.changes['name']).toBe('John Doe');
        expect(state.draft.changes['email']).toBeUndefined();
      });

      it('should not change recordId after it is set', () => {
        let state = initialState;

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John Doe',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-2',
          modelFieldId: 'email',
          value: 'jane@example.com',
        }));

        expect(state.draft.recordId).toBe('record-1');
      });
    });

    describe('Edge Cases - Missing recordId', () => {
      it('should update changes even when recordId is null (state.recordId === payload.recordId)', () => {
        const payload = {
          recordId: null,
          modelFieldId: 'field-1',
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBeNull();
        // When both state and payload recordId are null, the condition (state.draft.recordId === recordId) is true
        expect(result.draft.changes['field-1']).toBe('value');
      });

      it('should not update when recordId is undefined in payload', () => {
        const payload = {
          recordId: undefined,
          modelFieldId: 'field-1',
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBeNull();
        expect(result.draft.changes['field-1']).toBeUndefined();
      });

      it('should not update when recordId is empty string in payload', () => {
        const payload = {
          recordId: '',
          modelFieldId: 'field-1',
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.recordId).toBeNull();
        expect(result.draft.changes['field-1']).toBeUndefined();
      });
    });

    describe('Edge Cases - Field IDs', () => {
      it('should handle field ID with special characters', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 'field-@#$%',
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.changes['field-@#$%']).toBe('value');
      });

      it('should handle numeric field ID', () => {
        const payload = {
          recordId: 'record-1',
          modelFieldId: 123,
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.changes[123]).toBe('value');
      });

      it('should handle very long field ID', () => {
        const longFieldId = 'field-' + 'a'.repeat(1000);
        const payload = {
          recordId: 'record-1',
          modelFieldId: longFieldId,
          value: 'value',
        };

        const result = editorReducer(initialState, updateDraftField(payload));

        expect(result.draft.changes[longFieldId]).toBe('value');
      });
    });

    describe('Complex Workflows', () => {
      it('should handle editing multiple fields and updating them', () => {
        let state = initialState;

        // Initial edits
        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John',
        }));

        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'email',
          value: 'john@example.com',
        }));

        // Update name
        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'name',
          value: 'John Doe',
        }));

        // Add age
        state = editorReducer(state, updateDraftField({
          recordId: 'record-1',
          modelFieldId: 'age',
          value: 30,
        }));

        expect(state.draft.recordId).toBe('record-1');
        expect(state.draft.changes).toEqual({
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
        });
      });

      it('should handle large number of field changes', () => {
        let state = initialState;

        for (let i = 0; i < 100; i++) {
          state = editorReducer(state, updateDraftField({
            recordId: 'record-1',
            modelFieldId: `field-${i}`,
            value: `value-${i}`,
          }));
        }

        expect(state.draft.recordId).toBe('record-1');
        expect(Object.keys(state.draft.changes)).toHaveLength(100);
        expect(state.draft.changes['field-0']).toBe('value-0');
        expect(state.draft.changes['field-99']).toBe('value-99');
      });
    });
  });

  describe('clearDraft', () => {
    it('should clear draft when no changes exist', () => {
      const result = editorReducer(initialState, clearDraft());

      expect(result.draft).toEqual(initialState.draft);
    });

    it('should clear draft with single field change', () => {
      let state = initialState;

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      state = editorReducer(state, clearDraft());

      expect(state.draft.recordId).toBeNull();
      expect(state.draft.changes).toEqual({});
    });

    it('should clear draft with multiple field changes', () => {
      let state = initialState;

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'email',
        value: 'john@example.com',
      }));

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'age',
        value: 30,
      }));

      state = editorReducer(state, clearDraft());

      expect(state.draft.recordId).toBeNull();
      expect(state.draft.changes).toEqual({});
    });

    it('should be idempotent', () => {
      let state = initialState;

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      state = editorReducer(state, clearDraft());
      state = editorReducer(state, clearDraft());

      expect(state.draft.recordId).toBeNull();
      expect(state.draft.changes).toEqual({});
    });

    it('should allow starting new draft after clearing', () => {
      let state = initialState;

      // First draft
      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      // Clear
      state = editorReducer(state, clearDraft());

      // New draft
      state = editorReducer(state, updateDraftField({
        recordId: 'record-2',
        modelFieldId: 'email',
        value: 'jane@example.com',
      }));

      expect(state.draft.recordId).toBe('record-2');
      expect(state.draft.changes).toEqual({
        email: 'jane@example.com',
      });
    });
  });

  describe('Complete Edit Workflow', () => {
    it('should handle complete edit and save workflow', () => {
      let state = initialState;

      // Start editing
      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'email',
        value: 'john@example.com',
      }));

      expect(state.draft.recordId).toBe('record-1');
      expect(Object.keys(state.draft.changes)).toHaveLength(2);

      // Clear after save
      state = editorReducer(state, clearDraft());

      expect(state.draft.recordId).toBeNull();
      expect(state.draft.changes).toEqual({});
    });

    it('should handle edit, clear, and re-edit workflow', () => {
      let state = initialState;

      // First edit
      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      // Clear (cancel)
      state = editorReducer(state, clearDraft());

      // Edit again
      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'Jane Smith',
      }));

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'email',
        value: 'jane@example.com',
      }));

      expect(state.draft.recordId).toBe('record-1');
      expect(state.draft.changes).toEqual({
        name: 'Jane Smith',
        email: 'jane@example.com',
      });
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when updating field', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when clearing draft', () => {
      let state = initialState;

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      const originalState = JSON.parse(JSON.stringify(state));

      editorReducer(state, clearDraft());

      expect(state).toEqual(originalState);
    });

    it('should not share changes object reference after clear', () => {
      let state = initialState;

      state = editorReducer(state, updateDraftField({
        recordId: 'record-1',
        modelFieldId: 'name',
        value: 'John Doe',
      }));

      const changesBeforeClear = state.draft.changes;

      state = editorReducer(state, clearDraft());

      expect(state.draft.changes).not.toBe(changesBeforeClear);
      expect(state.draft.changes).toEqual({});
    });
  });
});

