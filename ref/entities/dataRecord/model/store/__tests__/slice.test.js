// ===================================================================
// Unit Tests for dataRecord Redux Slice
// Coverage Target: 100%
// Phase 2 - Push to 50% Coverage (34 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setRecords,
  setHoveredRecordId,
  setFocusedRecordId,
  setSelectedRecordId,
  addDataRecord,
  updateRecord,
  removeDataRecord,
} from '../slice';

describe('dataRecord Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredRecordId: null,
        focusedRecordId: null,
        selectedRecordId: null,
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ui.hoveredRecordId).toBeNull();
      expect(state.ui.focusedRecordId).toBeNull();
      expect(state.ui.selectedRecordId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredRecordId', () => {
      it('should set hovered record ID', () => {
        const state = reducer(initialState, setHoveredRecordId('rec-1'));

        expect(state.ui.hoveredRecordId).toBe('rec-1');
      });

      it('should update hovered record ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredRecordId: 'rec-1' },
        };

        const state = reducer(stateWithHovered, setHoveredRecordId('rec-2'));

        expect(state.ui.hoveredRecordId).toBe('rec-2');
      });

      it('should clear hovered record ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredRecordId: 'rec-1' },
        };

        const state = reducer(stateWithHovered, setHoveredRecordId(null));

        expect(state.ui.hoveredRecordId).toBeNull();
      });
    });

    describe('setFocusedRecordId', () => {
      it('should set focused record ID', () => {
        const state = reducer(initialState, setFocusedRecordId('rec-1'));

        expect(state.ui.focusedRecordId).toBe('rec-1');
      });

      it('should update focused record ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedRecordId: 'rec-1' },
        };

        const state = reducer(stateWithFocused, setFocusedRecordId('rec-2'));

        expect(state.ui.focusedRecordId).toBe('rec-2');
      });

      it('should clear focused record ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedRecordId: 'rec-1' },
        };

        const state = reducer(stateWithFocused, setFocusedRecordId(null));

        expect(state.ui.focusedRecordId).toBeNull();
      });
    });

    describe('setSelectedRecordId', () => {
      it('should set selected record ID', () => {
        const state = reducer(initialState, setSelectedRecordId('rec-1'));

        expect(state.ui.selectedRecordId).toBe('rec-1');
      });

      it('should update selected record ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedRecordId: 'rec-1' },
        };

        const state = reducer(stateWithSelected, setSelectedRecordId('rec-2'));

        expect(state.ui.selectedRecordId).toBe('rec-2');
      });

      it('should clear selected record ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedRecordId: 'rec-1' },
        };

        const state = reducer(stateWithSelected, setSelectedRecordId(null));

        expect(state.ui.selectedRecordId).toBeNull();
      });
    });
  });

  describe('Query Actions', () => {
    describe('setRecords', () => {
      it('should set records from array', () => {
        const records = [
          { id: 'rec-1', name: 'Record 1', modelId: 'model-1' },
          { id: 'rec-2', name: 'Record 2', modelId: 'model-1' },
        ];

        const state = reducer(initialState, setRecords(records));

        expect(state.ids).toEqual(['rec-1', 'rec-2']);
        expect(state.entities['rec-1']).toEqual(records[0]);
        expect(state.entities['rec-2']).toEqual(records[1]);
      });

      it('should replace existing records', () => {
        const stateWithRecords = {
          ...initialState,
          ids: ['rec-old'],
          entities: { 'rec-old': { id: 'rec-old', name: 'Old' } },
        };

        const newRecords = [
          { id: 'rec-1', name: 'Record 1' },
        ];

        const state = reducer(stateWithRecords, setRecords(newRecords));

        expect(state.ids).toEqual(['rec-1']);
        expect(state.entities['rec-old']).toBeUndefined();
        expect(state.entities['rec-1']).toEqual(newRecords[0]);
      });

      it('should handle empty array', () => {
        const stateWithRecords = {
          ...initialState,
          ids: ['rec-1'],
          entities: { 'rec-1': { id: 'rec-1', name: 'Record 1' } },
        };

        const state = reducer(stateWithRecords, setRecords([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addDataRecord', () => {
      it('should add new data record', () => {
        const state = reducer(initialState, addDataRecord({
          recordId: 'rec-1',
          modelId: 'model-1',
        }));

        expect(state.ids).toContain('rec-1');
        expect(state.entities['rec-1']).toBeDefined();
        expect(state.entities['rec-1'].id).toBe('rec-1');
        expect(state.entities['rec-1'].modelId).toBe('model-1');
        expect(state.entities['rec-1'].kind).toBe('data-record');
      });

      it('should add multiple data records', () => {
        let state = initialState;

        state = reducer(state, addDataRecord({ recordId: 'rec-1', modelId: 'model-1' }));
        state = reducer(state, addDataRecord({ recordId: 'rec-2', modelId: 'model-1' }));

        expect(state.ids).toEqual(['rec-1', 'rec-2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should set default properties for new record', () => {
        const state = reducer(initialState, addDataRecord({
          recordId: 'rec-1',
          modelId: 'model-1',
        }));

        expect(state.entities['rec-1'].name).toBe('New record');
        expect(state.entities['rec-1'].slug).toBe('record-rec-1');
      });
    });

    describe('updateRecord', () => {
      it('should update existing record', () => {
        const stateWithRecord = {
          ...initialState,
          ids: ['rec-1'],
          entities: { 'rec-1': { id: 'rec-1', name: 'Original', modelId: 'model-1' } },
        };

        const state = reducer(stateWithRecord, updateRecord({
          id: 'rec-1',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['rec-1'].name).toBe('Updated');
        expect(state.entities['rec-1'].modelId).toBe('model-1');
      });

      it('should partially update record', () => {
        const stateWithRecord = {
          ...initialState,
          ids: ['rec-1'],
          entities: {
            'rec-1': {
              id: 'rec-1',
              name: 'Record 1',
              modelId: 'model-1',
              data: { field1: 'value1' },
            },
          },
        };

        const state = reducer(stateWithRecord, updateRecord({
          id: 'rec-1',
          changes: { data: { field1: 'updated', field2: 'new' } },
        }));

        expect(state.entities['rec-1'].name).toBe('Record 1');
        expect(state.entities['rec-1'].data.field1).toBe('updated');
        expect(state.entities['rec-1'].data.field2).toBe('new');
      });

      it('should handle updating non-existent record', () => {
        const state = reducer(initialState, updateRecord({
          id: 'non-existent',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should handle update with no id', () => {
        const stateWithRecord = {
          ...initialState,
          ids: ['rec-1'],
          entities: { 'rec-1': { id: 'rec-1', name: 'Original' } },
        };

        const state = reducer(stateWithRecord, updateRecord({
          changes: { name: 'Updated' },
        }));

        expect(state.entities['rec-1'].name).toBe('Original');
      });
    });

    describe('removeDataRecord', () => {
      it('should remove data record', () => {
        const stateWithRecords = {
          ...initialState,
          ids: ['rec-1', 'rec-2'],
          entities: {
            'rec-1': { id: 'rec-1', name: 'Record 1' },
            'rec-2': { id: 'rec-2', name: 'Record 2' },
          },
        };

        const state = reducer(stateWithRecords, removeDataRecord('rec-1'));

        expect(state.ids).toEqual(['rec-2']);
        expect(state.entities['rec-1']).toBeUndefined();
        expect(state.entities['rec-2']).toBeDefined();
      });

      it('should handle removing non-existent record', () => {
        const stateWithRecord = {
          ...initialState,
          ids: ['rec-1'],
          entities: { 'rec-1': { id: 'rec-1', name: 'Record 1' } },
        };

        const state = reducer(stateWithRecord, removeDataRecord('non-existent'));

        expect(state.ids).toEqual(['rec-1']);
        expect(state.entities['rec-1']).toBeDefined();
      });

      it('should remove last record', () => {
        const stateWithRecord = {
          ...initialState,
          ids: ['rec-1'],
          entities: { 'rec-1': { id: 'rec-1', name: 'Record 1' } },
        };

        const state = reducer(stateWithRecord, removeDataRecord('rec-1'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full record lifecycle', () => {
      let state = initialState;

      // Add record
      state = reducer(state, addDataRecord({ recordId: 'rec-1', modelId: 'model-1' }));
      expect(state.ids).toContain('rec-1');

      // Select record
      state = reducer(state, setSelectedRecordId('rec-1'));
      expect(state.ui.selectedRecordId).toBe('rec-1');

      // Update record
      state = reducer(state, updateRecord({ id: 'rec-1', changes: { name: 'Updated Record' } }));
      expect(state.entities['rec-1'].name).toBe('Updated Record');

      // Remove record
      state = reducer(state, removeDataRecord('rec-1'));
      expect(state.ids).not.toContain('rec-1');
    });

    it('should handle multiple records with UI state', () => {
      let state = initialState;

      // Add multiple records
      state = reducer(state, addDataRecord({ recordId: 'rec-1', modelId: 'model-1' }));
      state = reducer(state, addDataRecord({ recordId: 'rec-2', modelId: 'model-1' }));
      state = reducer(state, addDataRecord({ recordId: 'rec-3', modelId: 'model-2' }));

      // Set different UI states
      state = reducer(state, setHoveredRecordId('rec-1'));
      state = reducer(state, setFocusedRecordId('rec-2'));
      state = reducer(state, setSelectedRecordId('rec-3'));

      expect(state.ids).toHaveLength(3);
      expect(state.ui.hoveredRecordId).toBe('rec-1');
      expect(state.ui.focusedRecordId).toBe('rec-2');
      expect(state.ui.selectedRecordId).toBe('rec-3');
    });

    it('should handle batch operations', () => {
      let state = initialState;

      // Batch add
      const records = [
        { id: 'rec-1', name: 'Record 1', modelId: 'model-1' },
        { id: 'rec-2', name: 'Record 2', modelId: 'model-1' },
        { id: 'rec-3', name: 'Record 3', modelId: 'model-2' },
      ];

      state = reducer(state, setRecords(records));
      expect(state.ids).toHaveLength(3);

      // Batch update (simulated)
      state = reducer(state, updateRecord({ id: 'rec-1', changes: { status: 'active' } }));
      state = reducer(state, updateRecord({ id: 'rec-2', changes: { status: 'active' } }));
      state = reducer(state, updateRecord({ id: 'rec-3', changes: { status: 'inactive' } }));

      expect(state.entities['rec-1'].status).toBe('active');
      expect(state.entities['rec-2'].status).toBe('active');
      expect(state.entities['rec-3'].status).toBe('inactive');
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
      expect(state.ui).toHaveProperty('hoveredRecordId');
      expect(state.ui).toHaveProperty('focusedRecordId');
      expect(state.ui).toHaveProperty('selectedRecordId');
    });

    it('should handle complex record data', () => {
      const state = reducer(initialState, addDataRecord({
        recordId: 'rec-1',
        modelId: 'model-1',
      }));

      expect(state.entities['rec-1']).toHaveProperty('id');
      expect(state.entities['rec-1']).toHaveProperty('kind');
      expect(state.entities['rec-1']).toHaveProperty('modelId');
      expect(state.entities['rec-1']).toHaveProperty('name');
      expect(state.entities['rec-1']).toHaveProperty('slug');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid UI state changes', () => {
      let state = initialState;

      state = reducer(state, setHoveredRecordId('rec-1'));
      state = reducer(state, setHoveredRecordId('rec-2'));
      state = reducer(state, setHoveredRecordId('rec-3'));
      state = reducer(state, setHoveredRecordId(null));

      expect(state.ui.hoveredRecordId).toBeNull();
    });

    it('should handle updating then immediately removing record', () => {
      let state = {
        ...initialState,
        ids: ['rec-1'],
        entities: { 'rec-1': { id: 'rec-1', name: 'Original' } },
      };

      state = reducer(state, updateRecord({ id: 'rec-1', changes: { name: 'Updated' } }));
      expect(state.entities['rec-1'].name).toBe('Updated');

      state = reducer(state, removeDataRecord('rec-1'));
      expect(state.entities['rec-1']).toBeUndefined();
    });

    it('should handle removing all records one by one', () => {
      let state = {
        ...initialState,
        ids: ['rec-1', 'rec-2', 'rec-3'],
        entities: {
          'rec-1': { id: 'rec-1', name: 'Record 1' },
          'rec-2': { id: 'rec-2', name: 'Record 2' },
          'rec-3': { id: 'rec-3', name: 'Record 3' },
        },
      };

      state = reducer(state, removeDataRecord('rec-1'));
      expect(state.ids).toHaveLength(2);

      state = reducer(state, removeDataRecord('rec-2'));
      expect(state.ids).toHaveLength(1);

      state = reducer(state, removeDataRecord('rec-3'));
      expect(state.ids).toHaveLength(0);
      expect(state.entities).toEqual({});
    });
  });
});

