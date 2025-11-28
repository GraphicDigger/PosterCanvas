// ===================================================================
// Unit Tests for normalizePropList - Component Props Normalization
// Coverage Target: 100%
// Phase 5 - Final Push: Feature Utilities (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import { normalizePropList, createBasicElements, createComponentVariants } from './normalizePropList';
import { ENTITY_KINDS } from '../../../shared/constants';

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-1234',
}));

describe('normalizePropList', () => {
  it('should return empty arrays for null component', () => {
    const result = normalizePropList(null);

    expect(result).toEqual({
      normalizedProps: [],
      normalizedPropValues: [],
      propIds: [],
    });
  });

  it('should return empty arrays for undefined component', () => {
    const result = normalizePropList(undefined);

    expect(result).toEqual({
      normalizedProps: [],
      normalizedPropValues: [],
      propIds: [],
    });
  });

  it('should return empty arrays when component has no props', () => {
    const component = { id: 'comp-1' };
    const result = normalizePropList(component);

    expect(result).toEqual({
      normalizedProps: [],
      normalizedPropValues: [],
      propIds: [],
    });
  });

  it('should normalize a single prop', () => {
    const component = {
      id: 'comp-1',
      props: [
        {
          name: 'variant',
          type: { name: 'string' },
          description: 'Button variant',
          defaultValue: 'primary',
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedProps).toHaveLength(1);
    expect(result.normalizedProps[0]).toEqual({
      id: 'comp-1_variant_mock-uuid-1234',
      name: 'variant',
      kind: ENTITY_KINDS.PROP,
      type: 'string',
      description: 'Button variant',
      defaultValue: 'primary',
      componentId: 'comp-1',
    });
  });

  it('should normalize multiple props', () => {
    const component = {
      id: 'comp-2',
      props: [
        {
          name: 'size',
          type: { name: 'string' },
          description: 'Size',
          defaultValue: 'medium',
        },
        {
          name: 'disabled',
          type: { name: 'boolean' },
          description: 'Disabled state',
          defaultValue: false,
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedProps).toHaveLength(2);
    expect(result.normalizedProps[0].name).toBe('size');
    expect(result.normalizedProps[1].name).toBe('disabled');
  });

  it('should create prop values when prop has values array', () => {
    const component = {
      id: 'comp-3',
      props: [
        {
          name: 'variant',
          type: { name: 'enum' },
          description: 'Variant',
          defaultValue: 'primary',
          values: ['primary', 'secondary', 'tertiary'],
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedPropValues).toHaveLength(3);
    expect(result.normalizedPropValues[0]).toMatchObject({
      name: 'primary',
      value: 'primary',
      kind: ENTITY_KINDS.PROP_VALUE,
    });
  });

  it('should link prop values to parent prop', () => {
    const component = {
      id: 'comp-4',
      props: [
        {
          name: 'size',
          type: { name: 'enum' },
          description: 'Size',
          values: ['small', 'large'],
        },
      ],
    };

    const result = normalizePropList(component);

    const propId = result.normalizedProps[0].id;
    expect(result.normalizedPropValues[0].propId).toBe(propId);
    expect(result.normalizedPropValues[1].propId).toBe(propId);
  });

  it('should handle empty values array', () => {
    const component = {
      id: 'comp-5',
      props: [
        {
          name: 'variant',
          type: { name: 'string' },
          values: [],
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedPropValues).toHaveLength(0);
  });

  it('should handle prop without values', () => {
    const component = {
      id: 'comp-6',
      props: [
        {
          name: 'label',
          type: { name: 'string' },
          description: 'Label text',
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedPropValues).toHaveLength(0);
  });

  it('should handle props with non-array values', () => {
    const component = {
      id: 'comp-7',
      props: [
        {
          name: 'config',
          type: { name: 'object' },
          values: 'not-an-array',
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedPropValues).toHaveLength(0);
  });

  it('should include component ID in prop ID', () => {
    const component = {
      id: 'my-component',
      props: [
        {
          name: 'propName',
          type: { name: 'string' },
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedProps[0].id).toContain('my-component');
    expect(result.normalizedProps[0].id).toContain('propName');
  });

  it('should handle prop with no type', () => {
    const component = {
      id: 'comp-8',
      props: [
        {
          name: 'propName',
          type: {},
        },
      ],
    };

    const result = normalizePropList(component);

    expect(result.normalizedProps[0].type).toBeUndefined();
  });
});

describe('createBasicElements', () => {
  it('should create a root element ID', () => {
    const component = { id: 'comp-1' };
    const result = createBasicElements(component);

    expect(result).toHaveLength(1);
    expect(result[0]).toContain('comp-1');
    expect(result[0]).toContain('element-root');
  });

  it('should include component ID in element ID', () => {
    const component = { id: 'my-component' };
    const result = createBasicElements(component);

    expect(result[0]).toContain('my-component');
  });

  it('should handle different component IDs', () => {
    const comp1 = { id: 'button' };
    const comp2 = { id: 'input' };

    const result1 = createBasicElements(comp1);
    const result2 = createBasicElements(comp2);

    expect(result1[0]).toContain('button');
    expect(result2[0]).toContain('input');
  });
});

describe('createComponentVariants', () => {
  it('should create default variant when no props', () => {
    const component = { id: 'comp-1' };
    const normalizedProps = [];

    const result = createComponentVariants(component, normalizedProps);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: 'Default',
      propValues: {},
    });
  });

  it('should create default variant when no enum props', () => {
    const component = { id: 'comp-2' };
    const normalizedProps = [
      { id: 'prop-1', name: 'label', type: 'string' },
      { id: 'prop-2', name: 'disabled', type: 'boolean' },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Default');
  });

  it('should create variants for enum props', () => {
    const component = { id: 'comp-3' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'variant',
        type: 'ENUM',
        values: ['primary', 'secondary', 'tertiary'],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('primary');
    expect(result[1].name).toBe('secondary');
    expect(result[2].name).toBe('tertiary');
  });

  it('should set prop values in variants', () => {
    const component = { id: 'comp-4' };
    const normalizedProps = [
      {
        id: 'prop-size',
        name: 'size',
        type: 'ENUM',
        values: ['small', 'large'],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result[0].propValues).toEqual({ 'prop-size': 'small' });
    expect(result[1].propValues).toEqual({ 'prop-size': 'large' });
  });

  it('should handle empty values array in enum prop', () => {
    const component = { id: 'comp-5' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'variant',
        type: 'ENUM',
        values: [],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Default');
  });

  it('should handle prop with non-array values', () => {
    const component = { id: 'comp-6' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'variant',
        type: 'ENUM',
        values: 'not-an-array',
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Default');
  });

  it('should use first enum prop when multiple exist', () => {
    const component = { id: 'comp-7' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'variant',
        type: 'ENUM',
        values: ['primary', 'secondary'],
      },
      {
        id: 'prop-2',
        name: 'size',
        type: 'ENUM',
        values: ['small', 'large'],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    // Should only create variants for first enum prop
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('primary');
    expect(result[1].name).toBe('secondary');
  });

  it('should include component ID in variant IDs', () => {
    const component = { id: 'my-component' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'variant',
        type: 'ENUM',
        values: ['primary'],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    expect(result[0].id).toContain('my-component');
  });

  it('should handle props with values but non-ENUM type', () => {
    const component = { id: 'comp-8' };
    const normalizedProps = [
      {
        id: 'prop-1',
        name: 'config',
        type: 'string',
        values: ['a', 'b'],
      },
    ];

    const result = createComponentVariants(component, normalizedProps);

    // Should create variants if values array exists, even if not ENUM type
    expect(result).toHaveLength(2);
  });
});

