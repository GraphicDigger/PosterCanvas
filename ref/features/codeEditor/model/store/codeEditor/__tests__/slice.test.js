// ===================================================================
// Unit Tests for codeEditor Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (SMALL IMPACT - 26 lines, self-contained)
// Risk: LOW (Redux Toolkit, code tabs management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import codeEditorReducer, {
  setCodeTabs,
  setActiveCodeId,
} from '../slice';

describe('codeEditor Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      codeTabs: [],
      activeCodeId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = codeEditorReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty codeTabs array by default', () => {
      const result = codeEditorReducer(undefined, { type: '@@INIT' });

      expect(result.codeTabs).toEqual([]);
    });

    it('should have null activeCodeId by default', () => {
      const result = codeEditorReducer(undefined, { type: '@@INIT' });

      expect(result.activeCodeId).toBeNull();
    });
  });

  describe('setCodeTabs', () => {
    describe('Basic Functionality', () => {
      it('should set single code tab', () => {
        const tabs = [
          { id: 'code-1', name: 'Component.js', content: 'const x = 1;' },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs).toEqual(tabs);
        expect(result.activeCodeId).toBe('code-1');
      });

      it('should set multiple code tabs', () => {
        const tabs = [
          { id: 'code-1', name: 'Component.js', content: 'const x = 1;' },
          { id: 'code-2', name: 'Utils.js', content: 'const y = 2;' },
          { id: 'code-3', name: 'Config.js', content: 'const z = 3;' },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs).toEqual(tabs);
        expect(result.activeCodeId).toBe('code-1');
      });

      it('should set activeCodeId to first tab ID', () => {
        const tabs = [
          { id: 'first-tab', name: 'First.js' },
          { id: 'second-tab', name: 'Second.js' },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.activeCodeId).toBe('first-tab');
      });

      it('should replace existing tabs', () => {
        const state = {
          codeTabs: [
            { id: 'old-1', name: 'Old.js' },
          ],
          activeCodeId: 'old-1',
        };

        const newTabs = [
          { id: 'new-1', name: 'New.js' },
        ];

        const result = codeEditorReducer(state, setCodeTabs(newTabs));

        expect(result.codeTabs).toEqual(newTabs);
        expect(result.activeCodeId).toBe('new-1');
      });
    });

    describe('Empty Array Handling', () => {
      it('should set empty array and null activeCodeId', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'Component.js' },
          ],
          activeCodeId: 'code-1',
        };

        const result = codeEditorReducer(state, setCodeTabs([]));

        expect(result.codeTabs).toEqual([]);
        expect(result.activeCodeId).toBeNull();
      });

      it('should handle empty array from initial state', () => {
        const result = codeEditorReducer(initialState, setCodeTabs([]));

        expect(result.codeTabs).toEqual([]);
        expect(result.activeCodeId).toBeNull();
      });
    });

    describe('Tab Properties', () => {
      it('should preserve all tab properties', () => {
        const tabs = [
          {
            id: 'code-1',
            name: 'Component.js',
            content: 'const x = 1;',
            language: 'javascript',
            modified: true,
            metadata: { created: '2024-01-01' },
          },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs[0]).toEqual(tabs[0]);
        expect(result.codeTabs[0].language).toBe('javascript');
        expect(result.codeTabs[0].modified).toBe(true);
        expect(result.codeTabs[0].metadata).toEqual({ created: '2024-01-01' });
      });

      it('should handle tabs with minimal properties', () => {
        const tabs = [
          { id: 'code-1' },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs).toEqual(tabs);
        expect(result.activeCodeId).toBe('code-1');
      });

      it('should handle tabs without id property', () => {
        const tabs = [
          { name: 'NoId.js', content: 'test' },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs).toEqual(tabs);
        expect(result.activeCodeId).toBeNull();
      });
    });

    describe('Large Datasets', () => {
      it('should handle large number of tabs', () => {
        const tabs = Array.from({ length: 100 }, (_, i) => ({
          id: `code-${i}`,
          name: `File${i}.js`,
          content: `const x${i} = ${i};`,
        }));

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs).toHaveLength(100);
        expect(result.activeCodeId).toBe('code-0');
      });

      it('should handle tabs with large content', () => {
        const largeContent = 'a'.repeat(10000);
        const tabs = [
          { id: 'code-1', name: 'Large.js', content: largeContent },
        ];

        const result = codeEditorReducer(initialState, setCodeTabs(tabs));

        expect(result.codeTabs[0].content).toBe(largeContent);
      });
    });
  });

  describe('setActiveCodeId', () => {
    describe('Basic Functionality', () => {
      it('should set active code ID', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'First.js' },
            { id: 'code-2', name: 'Second.js' },
          ],
          activeCodeId: 'code-1',
        };

        const result = codeEditorReducer(state, setActiveCodeId('code-2'));

        expect(result.activeCodeId).toBe('code-2');
        expect(result.codeTabs).toEqual(state.codeTabs);
      });

      it('should update active code ID', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'First.js' },
            { id: 'code-2', name: 'Second.js' },
            { id: 'code-3', name: 'Third.js' },
          ],
          activeCodeId: 'code-1',
        };

        let result = codeEditorReducer(state, setActiveCodeId('code-2'));
        expect(result.activeCodeId).toBe('code-2');

        result = codeEditorReducer(result, setActiveCodeId('code-3'));
        expect(result.activeCodeId).toBe('code-3');
      });

      it('should allow setting to null', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'First.js' },
          ],
          activeCodeId: 'code-1',
        };

        const result = codeEditorReducer(state, setActiveCodeId(null));

        expect(result.activeCodeId).toBeNull();
      });

      it('should not modify codeTabs', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'First.js' },
            { id: 'code-2', name: 'Second.js' },
          ],
          activeCodeId: 'code-1',
        };

        const result = codeEditorReducer(state, setActiveCodeId('code-2'));

        expect(result.codeTabs).toEqual(state.codeTabs);
      });
    });

    describe('Edge Cases', () => {
      it('should allow setting non-existent code ID', () => {
        const state = {
          codeTabs: [
            { id: 'code-1', name: 'First.js' },
          ],
          activeCodeId: 'code-1',
        };

        const result = codeEditorReducer(state, setActiveCodeId('code-999'));

        expect(result.activeCodeId).toBe('code-999');
      });

      it('should handle setting active ID when no tabs exist', () => {
        const result = codeEditorReducer(initialState, setActiveCodeId('code-1'));

        expect(result.activeCodeId).toBe('code-1');
        expect(result.codeTabs).toEqual([]);
      });

      it('should handle special characters in ID', () => {
        const result = codeEditorReducer(initialState, setActiveCodeId('code-@#$%'));

        expect(result.activeCodeId).toBe('code-@#$%');
      });

      it('should handle numeric ID', () => {
        const result = codeEditorReducer(initialState, setActiveCodeId(123));

        expect(result.activeCodeId).toBe(123);
      });

      it('should handle empty string ID', () => {
        const result = codeEditorReducer(initialState, setActiveCodeId(''));

        expect(result.activeCodeId).toBe('');
      });
    });
  });

  describe('Combined Actions', () => {
    it('should handle setCodeTabs and setActiveCodeId workflow', () => {
      let state = initialState;

      const tabs = [
        { id: 'code-1', name: 'First.js' },
        { id: 'code-2', name: 'Second.js' },
        { id: 'code-3', name: 'Third.js' },
      ];

      state = codeEditorReducer(state, setCodeTabs(tabs));
      expect(state.activeCodeId).toBe('code-1');

      state = codeEditorReducer(state, setActiveCodeId('code-2'));
      expect(state.activeCodeId).toBe('code-2');

      state = codeEditorReducer(state, setActiveCodeId('code-3'));
      expect(state.activeCodeId).toBe('code-3');
    });

    it('should handle replacing tabs while active ID is set', () => {
      let state = initialState;

      const tabs1 = [
        { id: 'code-1', name: 'First.js' },
        { id: 'code-2', name: 'Second.js' },
      ];

      state = codeEditorReducer(state, setCodeTabs(tabs1));
      state = codeEditorReducer(state, setActiveCodeId('code-2'));

      const tabs2 = [
        { id: 'code-3', name: 'Third.js' },
      ];

      state = codeEditorReducer(state, setCodeTabs(tabs2));

      expect(state.codeTabs).toEqual(tabs2);
      expect(state.activeCodeId).toBe('code-3');
    });

    it('should handle closing all tabs', () => {
      let state = initialState;

      const tabs = [
        { id: 'code-1', name: 'First.js' },
      ];

      state = codeEditorReducer(state, setCodeTabs(tabs));
      state = codeEditorReducer(state, setCodeTabs([]));

      expect(state.codeTabs).toEqual([]);
      expect(state.activeCodeId).toBeNull();
    });

    it('should handle switching between tabs multiple times', () => {
      let state = initialState;

      const tabs = [
        { id: 'code-1', name: 'First.js' },
        { id: 'code-2', name: 'Second.js' },
      ];

      state = codeEditorReducer(state, setCodeTabs(tabs));

      for (let i = 0; i < 10; i++) {
        state = codeEditorReducer(state, setActiveCodeId('code-1'));
        state = codeEditorReducer(state, setActiveCodeId('code-2'));
      }

      expect(state.activeCodeId).toBe('code-2');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when setting tabs', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      const tabs = [
        { id: 'code-1', name: 'First.js' },
      ];

      codeEditorReducer(state, setCodeTabs(tabs));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when setting active ID', () => {
      const state = {
        codeTabs: [
          { id: 'code-1', name: 'First.js' },
        ],
        activeCodeId: 'code-1',
      };

      const originalState = JSON.parse(JSON.stringify(state));

      codeEditorReducer(state, setActiveCodeId('code-2'));

      expect(state).toEqual(originalState);
    });

    it('should not mutate tabs array when setting active ID', () => {
      const tabs = [
        { id: 'code-1', name: 'First.js' },
      ];

      const state = {
        codeTabs: tabs,
        activeCodeId: 'code-1',
      };

      const result = codeEditorReducer(state, setActiveCodeId('code-2'));

      expect(result.codeTabs).toBe(tabs);
    });
  });

  describe('Action Creators', () => {
    it('should create setCodeTabs action', () => {
      const tabs = [
        { id: 'code-1', name: 'First.js' },
      ];

      const action = setCodeTabs(tabs);

      expect(action.type).toBe('codeEditor/setCodeTabs');
      expect(action.payload).toEqual(tabs);
    });

    it('should create setActiveCodeId action', () => {
      const action = setActiveCodeId('code-1');

      expect(action.type).toBe('codeEditor/setActiveCodeId');
      expect(action.payload).toBe('code-1');
    });
  });
});

