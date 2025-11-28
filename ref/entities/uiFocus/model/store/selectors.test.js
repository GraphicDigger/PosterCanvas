import { describe, it, expect, vi, beforeEach } from 'vitest';
import { selectFocusedEntity, selectFocusSystemStates } from './selectors';

// Mock ENTITY_KINDS
vi.mock('@/shared/constants', () => ({
  ENTITY_KINDS: {
    SCREEN: 'screen',
    ELEMENT: 'element',
    INSTANCE: 'instance',
    COMPONENT: 'component',
  },
}));

describe('uiFocus Entity Selectors', () => {
  describe('selectFocusedEntity', () => {
    it('should select focused entity from state', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'screen-1',
            kind: 'screen',
          },
        },
      };

      const result = selectFocusedEntity(state);
      expect(result).toEqual({
        id: 'screen-1',
        kind: 'screen',
      });
    });

    it('should return undefined when focusEntity is not set', () => {
      const state = {
        focusSystem: {},
      };

      const result = selectFocusedEntity(state);
      expect(result).toBeUndefined();
    });

    it('should return null when focusEntity is null', () => {
      const state = {
        focusSystem: {
          focusEntity: null,
        },
      };

      const result = selectFocusedEntity(state);
      expect(result).toBeNull();
    });

    it('should select element focus entity', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'element-1',
            kind: 'element',
          },
        },
      };

      const result = selectFocusedEntity(state);
      expect(result).toEqual({
        id: 'element-1',
        kind: 'element',
      });
    });

    it('should select instance focus entity', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'instance-1',
            kind: 'instance',
          },
        },
      };

      const result = selectFocusedEntity(state);
      expect(result).toEqual({
        id: 'instance-1',
        kind: 'instance',
      });
    });
  });

  describe('selectFocusSystemStates', () => {
    it('should return focus states when screen is focused', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'screen-1',
            kind: 'screen',
          },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: {
          id: 'screen-1',
          kind: 'screen',
        },
        screenIsFocused: true,
        elementIsFocused: false,
        instanceIsFocused: false,
      });
    });

    it('should return focus states when element is focused', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'element-1',
            kind: 'element',
          },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: {
          id: 'element-1',
          kind: 'element',
        },
        screenIsFocused: false,
        elementIsFocused: true,
        instanceIsFocused: false,
      });
    });

    it('should return focus states when instance is focused', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'instance-1',
            kind: 'instance',
          },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: {
          id: 'instance-1',
          kind: 'instance',
        },
        screenIsFocused: false,
        elementIsFocused: false,
        instanceIsFocused: true,
      });
    });

    it('should return false for all states when component is focused', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'component-1',
            kind: 'component',
          },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: {
          id: 'component-1',
          kind: 'component',
        },
        screenIsFocused: false,
        elementIsFocused: false,
        instanceIsFocused: false,
      });
    });

    it('should handle empty focusEntity', () => {
      const state = {
        focusSystem: {
          focusEntity: {},
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: {},
        screenIsFocused: false,
        elementIsFocused: false,
        instanceIsFocused: false,
      });
    });

    it('should handle null focusEntity', () => {
      const state = {
        focusSystem: {
          focusEntity: null,
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: null,
        screenIsFocused: false,
        elementIsFocused: false,
        instanceIsFocused: false,
      });
    });

    it('should handle undefined focusEntity', () => {
      const state = {
        focusSystem: {
          focusEntity: undefined,
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result).toEqual({
        focusEntity: undefined,
        screenIsFocused: false,
        elementIsFocused: false,
        instanceIsFocused: false,
      });
    });
  });

  describe('focus state combinations', () => {
    it('should only have screenIsFocused true for screen kind', () => {
      const state = {
        focusSystem: {
          focusEntity: { kind: 'screen' },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result.screenIsFocused).toBe(true);
      expect(result.elementIsFocused).toBe(false);
      expect(result.instanceIsFocused).toBe(false);
    });

    it('should only have elementIsFocused true for element kind', () => {
      const state = {
        focusSystem: {
          focusEntity: { kind: 'element' },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result.screenIsFocused).toBe(false);
      expect(result.elementIsFocused).toBe(true);
      expect(result.instanceIsFocused).toBe(false);
    });

    it('should only have instanceIsFocused true for instance kind', () => {
      const state = {
        focusSystem: {
          focusEntity: { kind: 'instance' },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result.screenIsFocused).toBe(false);
      expect(result.elementIsFocused).toBe(false);
      expect(result.instanceIsFocused).toBe(true);
    });

    it('should have all false for unknown kind', () => {
      const state = {
        focusSystem: {
          focusEntity: { kind: 'unknown' },
        },
      };

      const result = selectFocusSystemStates(state);
      expect(result.screenIsFocused).toBe(false);
      expect(result.elementIsFocused).toBe(false);
      expect(result.instanceIsFocused).toBe(false);
    });
  });

  describe('memoization', () => {
    it('should return same reference when state hasnt changed', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'screen-1',
            kind: 'screen',
          },
        },
      };

      const result1 = selectFocusSystemStates(state);
      const result2 = selectFocusSystemStates(state);

      expect(result1).toBe(result2);
    });

    it('should return new reference when focusEntity changes', () => {
      const state1 = {
        focusSystem: {
          focusEntity: {
            id: 'screen-1',
            kind: 'screen',
          },
        },
      };

      const state2 = {
        focusSystem: {
          focusEntity: {
            id: 'element-1',
            kind: 'element',
          },
        },
      };

      const result1 = selectFocusSystemStates(state1);
      const result2 = selectFocusSystemStates(state2);

      expect(result1).not.toBe(result2);
      expect(result1).not.toEqual(result2);
    });
  });

  describe('integration', () => {
    it('should work with selectFocusedEntity to get complete focus info', () => {
      const state = {
        focusSystem: {
          focusEntity: {
            id: 'element-123',
            kind: 'element',
            name: 'Button',
            props: {},
          },
        },
      };

      const focusedEntity = selectFocusedEntity(state);
      const focusStates = selectFocusSystemStates(state);

      expect(focusedEntity.id).toBe('element-123');
      expect(focusedEntity.kind).toBe('element');
      expect(focusStates.elementIsFocused).toBe(true);
      expect(focusStates.focusEntity).toEqual(focusedEntity);
    });
  });
});

