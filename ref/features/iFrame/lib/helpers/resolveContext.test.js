// ===================================================================
// Unit Tests for resolveContext
// CRITICAL BUSINESS LOGIC - UI Rendering Context Resolution
// Week 2, Day 3 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';

// Mock ENTITY_KINDS
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    INSTANCE: 'instance',
    COMPONENT: 'component',
    ELEMENT: 'element',
    SCREEN: 'screen',
  },
}));

import { resolveContext } from './resolveContext';
import { ENTITY_KINDS } from '../../../../shared/constants';

describe('resolveContext - UI Rendering Context Resolution', () => {
  // ===================================================================
  // PART 1: Instance Context Resolution (5 tests)
  // ===================================================================

  describe('Instance Context Resolution', () => {
    it('should resolve instance context', () => {
      const context = {
        id: 'inst-1',
        kind: ENTITY_KINDS.INSTANCE,
        name: 'Button Instance',
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toEqual(context);
      expect(result.contextComponent).toBeNull();
    });

    it('should extract instance from complex context', () => {
      const context = {
        id: 'inst-1',
        kind: ENTITY_KINDS.INSTANCE,
        name: 'Card Instance',
        properties: { width: '300px' },
        children: [],
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toBe(context);
      expect(result.contextComponent).toBeNull();
    });

    it('should handle instance with all properties', () => {
      const context = {
        id: 'inst-1',
        kind: ENTITY_KINDS.INSTANCE,
        name: 'Dialog Instance',
        componentId: 'comp-1',
        properties: {},
        override: {},
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toEqual(context);
      expect(result.contextInstance.id).toBe('inst-1');
      expect(result.contextInstance.componentId).toBe('comp-1');
    });

    it('should return null component for instance context', () => {
      const context = { kind: ENTITY_KINDS.INSTANCE };

      const result = resolveContext(context);

      expect(result.contextComponent).toBeNull();
    });

    it('should preserve entire instance object', () => {
      const context = {
        id: 'inst-1',
        kind: ENTITY_KINDS.INSTANCE,
        metadata: { created: '2024-01-01' },
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toStrictEqual(context);
      expect(result.contextInstance.metadata).toEqual({ created: '2024-01-01' });
    });
  });

  // ===================================================================
  // PART 2: Component Context Resolution (5 tests)
  // ===================================================================

  describe('Component Context Resolution', () => {
    it('should resolve component context', () => {
      const context = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        name: 'Button Component',
      };

      const result = resolveContext(context);

      expect(result.contextComponent).toEqual(context);
      expect(result.contextInstance).toBeNull();
    });

    it('should extract component from complex context', () => {
      const context = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        name: 'Card Component',
        elements: [],
        variants: [],
      };

      const result = resolveContext(context);

      expect(result.contextComponent).toBe(context);
      expect(result.contextInstance).toBeNull();
    });

    it('should handle component with props', () => {
      const context = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        name: 'Input Component',
        props: ['label', 'value', 'onChange'],
      };

      const result = resolveContext(context);

      expect(result.contextComponent).toEqual(context);
      expect(result.contextComponent.props).toHaveLength(3);
    });

    it('should return null instance for component context', () => {
      const context = { kind: ENTITY_KINDS.COMPONENT };

      const result = resolveContext(context);

      expect(result.contextInstance).toBeNull();
    });

    it('should preserve entire component object', () => {
      const context = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        metadata: { version: '1.0.0' },
      };

      const result = resolveContext(context);

      expect(result.contextComponent).toStrictEqual(context);
      expect(result.contextComponent.metadata).toEqual({ version: '1.0.0' });
    });
  });

  // ===================================================================
  // PART 3: Other Entity Types (4 tests)
  // ===================================================================

  describe('Other Entity Types', () => {
    it('should return null for element context', () => {
      const context = {
        id: 'elem-1',
        kind: ENTITY_KINDS.ELEMENT,
        name: 'Div Element',
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should return null for screen context', () => {
      const context = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        name: 'Home Screen',
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should return null for unknown kind', () => {
      const context = {
        id: 'unknown-1',
        kind: 'unknown-type',
        name: 'Unknown',
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should handle context without kind property', () => {
      const context = {
        id: 'entity-1',
        name: 'Entity',
      };

      const result = resolveContext(context);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: Edge Cases (4 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle null context', () => {
      const result = resolveContext(null);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should handle undefined context', () => {
      const result = resolveContext(undefined);

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should handle empty object', () => {
      const result = resolveContext({});

      expect(result.contextInstance).toBeNull();
      expect(result.contextComponent).toBeNull();
    });

    it('should handle context with only kind', () => {
      const contextInstance = { kind: ENTITY_KINDS.INSTANCE };
      const contextComponent = { kind: ENTITY_KINDS.COMPONENT };

      const result1 = resolveContext(contextInstance);
      const result2 = resolveContext(contextComponent);

      expect(result1.contextInstance).toEqual(contextInstance);
      expect(result2.contextComponent).toEqual(contextComponent);
    });
  });

  // ===================================================================
  // PART 5: Type Safety & Return Structure (2 tests)
  // ===================================================================

  describe('Type Safety & Return Structure', () => {
    it('should always return object with both keys', () => {
      const contexts = [
        { kind: ENTITY_KINDS.INSTANCE },
        { kind: ENTITY_KINDS.COMPONENT },
        { kind: ENTITY_KINDS.ELEMENT },
        null,
        undefined,
      ];

      contexts.forEach((context) => {
        const result = resolveContext(context);
        expect(result).toHaveProperty('contextInstance');
        expect(result).toHaveProperty('contextComponent');
      });
    });

    it('should never return both instance and component simultaneously', () => {
      const contexts = [
        { kind: ENTITY_KINDS.INSTANCE, id: 'inst-1' },
        { kind: ENTITY_KINDS.COMPONENT, id: 'comp-1' },
        { kind: ENTITY_KINDS.ELEMENT, id: 'elem-1' },
        null,
      ];

      contexts.forEach((context) => {
        const result = resolveContext(context);
        const bothNull = result.contextInstance === null && result.contextComponent === null;
        const oneNull = (result.contextInstance === null) !== (result.contextComponent === null);
        expect(bothNull || oneNull).toBe(true);
      });
    });
  });
});

