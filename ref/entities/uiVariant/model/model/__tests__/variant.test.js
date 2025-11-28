// ===================================================================
// Unit Tests for Variant Class
// Coverage Target: 100%
// Phase 1 - Utilities (SMALL IMPACT - 21 lines, simple class)
// Risk: LOW (Simple constructor, no logic)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { Variant } from '../variant';

describe('Variant Class', () => {
  describe('Constructor', () => {
    it('should create variant with all properties', () => {
      const data = {
        id: 'variant-1',
        name: 'Default',
        kind: 'component',
        parentId: 'component-1',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-1');
      expect(variant.name).toBe('Default');
      expect(variant.kind).toBe('component');
      expect(variant.parentId).toBe('component-1');
    });

    it('should create variant with minimal data', () => {
      const data = {
        id: 'variant-1',
        name: 'Variant',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-1');
      expect(variant.name).toBe('Variant');
      expect(variant.kind).toBeUndefined();
      expect(variant.parentId).toBeUndefined();
    });

    it('should handle null values', () => {
      const data = {
        id: null,
        name: null,
        kind: null,
        parentId: null,
      };

      const variant = new Variant(data);

      expect(variant.id).toBeNull();
      expect(variant.name).toBeNull();
      expect(variant.kind).toBeNull();
      expect(variant.parentId).toBeNull();
    });

    it('should handle undefined values', () => {
      const data = {
        id: undefined,
        name: undefined,
        kind: undefined,
        parentId: undefined,
      };

      const variant = new Variant(data);

      expect(variant.id).toBeUndefined();
      expect(variant.name).toBeUndefined();
      expect(variant.kind).toBeUndefined();
      expect(variant.parentId).toBeUndefined();
    });

    it('should handle empty object', () => {
      const data = {};

      const variant = new Variant(data);

      expect(variant.id).toBeUndefined();
      expect(variant.name).toBeUndefined();
      expect(variant.kind).toBeUndefined();
      expect(variant.parentId).toBeUndefined();
    });
  });

  describe('Property Types', () => {
    it('should handle string properties', () => {
      const data = {
        id: 'variant-1',
        name: 'Hover State',
        kind: 'state',
        parentId: 'component-1',
      };

      const variant = new Variant(data);

      expect(typeof variant.id).toBe('string');
      expect(typeof variant.name).toBe('string');
      expect(typeof variant.kind).toBe('string');
      expect(typeof variant.parentId).toBe('string');
    });

    it('should handle numeric IDs', () => {
      const data = {
        id: 123,
        name: 'Variant',
        kind: 'component',
        parentId: 456,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe(123);
      expect(variant.parentId).toBe(456);
    });

    it('should handle special characters in strings', () => {
      const data = {
        id: 'variant-@#$%',
        name: 'Hover & Active State',
        kind: 'state/hover',
        parentId: 'component-@#$%',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-@#$%');
      expect(variant.name).toBe('Hover & Active State');
      expect(variant.kind).toBe('state/hover');
      expect(variant.parentId).toBe('component-@#$%');
    });

    it('should handle empty strings', () => {
      const data = {
        id: '',
        name: '',
        kind: '',
        parentId: '',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('');
      expect(variant.name).toBe('');
      expect(variant.kind).toBe('');
      expect(variant.parentId).toBe('');
    });
  });

  describe('Extra Properties', () => {
    it('should not copy extra properties', () => {
      const data = {
        id: 'variant-1',
        name: 'Default',
        kind: 'component',
        parentId: 'component-1',
        extraProp: 'should not be copied',
        anotherProp: 123,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-1');
      expect(variant.name).toBe('Default');
      expect(variant.kind).toBe('component');
      expect(variant.parentId).toBe('component-1');
      expect(variant.extraProp).toBeUndefined();
      expect(variant.anotherProp).toBeUndefined();
    });
  });

  describe('Multiple Instances', () => {
    it('should create independent instances', () => {
      const data1 = {
        id: 'variant-1',
        name: 'Default',
        kind: 'component',
        parentId: 'component-1',
      };

      const data2 = {
        id: 'variant-2',
        name: 'Hover',
        kind: 'state',
        parentId: 'component-1',
      };

      const variant1 = new Variant(data1);
      const variant2 = new Variant(data2);

      expect(variant1.id).toBe('variant-1');
      expect(variant2.id).toBe('variant-2');
      expect(variant1.name).toBe('Default');
      expect(variant2.name).toBe('Hover');
    });

    it('should not share references', () => {
      const data = {
        id: 'variant-1',
        name: 'Default',
        kind: 'component',
        parentId: 'component-1',
      };

      const variant1 = new Variant(data);
      const variant2 = new Variant(data);

      variant1.name = 'Modified';

      expect(variant1.name).toBe('Modified');
      expect(variant2.name).toBe('Default');
    });
  });

  describe('Real-World Examples', () => {
    it('should create default variant', () => {
      const data = {
        id: 'variant-default',
        name: 'Default',
        kind: 'component',
        parentId: 'button-component',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-default');
      expect(variant.name).toBe('Default');
      expect(variant.kind).toBe('component');
      expect(variant.parentId).toBe('button-component');
    });

    it('should create hover state variant', () => {
      const data = {
        id: 'variant-hover',
        name: 'Hover',
        kind: 'state',
        parentId: 'button-component',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-hover');
      expect(variant.name).toBe('Hover');
      expect(variant.kind).toBe('state');
      expect(variant.parentId).toBe('button-component');
    });

    it('should create active state variant', () => {
      const data = {
        id: 'variant-active',
        name: 'Active',
        kind: 'state',
        parentId: 'button-component',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-active');
      expect(variant.name).toBe('Active');
      expect(variant.kind).toBe('state');
      expect(variant.parentId).toBe('button-component');
    });

    it('should create disabled state variant', () => {
      const data = {
        id: 'variant-disabled',
        name: 'Disabled',
        kind: 'state',
        parentId: 'button-component',
      };

      const variant = new Variant(data);

      expect(variant.id).toBe('variant-disabled');
      expect(variant.name).toBe('Disabled');
      expect(variant.kind).toBe('state');
      expect(variant.parentId).toBe('button-component');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000);
      const data = {
        id: longString,
        name: longString,
        kind: longString,
        parentId: longString,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe(longString);
      expect(variant.name).toBe(longString);
      expect(variant.kind).toBe(longString);
      expect(variant.parentId).toBe(longString);
    });

    it('should handle boolean values', () => {
      const data = {
        id: true,
        name: false,
        kind: true,
        parentId: false,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe(true);
      expect(variant.name).toBe(false);
      expect(variant.kind).toBe(true);
      expect(variant.parentId).toBe(false);
    });

    it('should handle object values', () => {
      const obj = { nested: 'value' };
      const data = {
        id: obj,
        name: obj,
        kind: obj,
        parentId: obj,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe(obj);
      expect(variant.name).toBe(obj);
      expect(variant.kind).toBe(obj);
      expect(variant.parentId).toBe(obj);
    });

    it('should handle array values', () => {
      const arr = [1, 2, 3];
      const data = {
        id: arr,
        name: arr,
        kind: arr,
        parentId: arr,
      };

      const variant = new Variant(data);

      expect(variant.id).toBe(arr);
      expect(variant.name).toBe(arr);
      expect(variant.kind).toBe(arr);
      expect(variant.parentId).toBe(arr);
    });
  });

  describe('Instance Methods', () => {
    it('should be an instance of Variant', () => {
      const data = {
        id: 'variant-1',
        name: 'Default',
        kind: 'component',
        parentId: 'component-1',
      };

      const variant = new Variant(data);

      expect(variant).toBeInstanceOf(Variant);
    });

    it('should have constructor property', () => {
      const data = {
        id: 'variant-1',
        name: 'Default',
      };

      const variant = new Variant(data);

      expect(variant.constructor).toBe(Variant);
    });
  });
});

