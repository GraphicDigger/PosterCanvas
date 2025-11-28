// ===================================================================
// Unit Tests for extractAllInstancesFromTree Helper
// Coverage Target: 100%
// Phase 1 - Business Logic Helpers
// Risk: LOW (pure function, recursive tree traversal)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { extractAllInstancesFromTree } from '../extractAllInstancesFromTree';
import { ENTITY_KINDS } from '@/shared/constants';

describe('extractAllInstancesFromTree Helper', () => {
  describe('Basic Functionality', () => {
    it('should extract single instance from flat tree', () => {
      const tree = [
        { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' });
    });

    it('should extract multiple instances from flat tree', () => {
      const tree = [
        { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
        { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
        { id: 'inst-3', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-3' },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('inst-1');
      expect(result[1].id).toBe('inst-2');
      expect(result[2].id).toBe('inst-3');
    });

    it('should extract instances from nested tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
            { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('inst-1');
      expect(result[1].id).toBe('inst-2');
    });

    it('should extract instances from deeply nested tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            {
              id: 'el-2',
              kind: ENTITY_KINDS.ELEMENT,
              tag: 'section',
              children: [
                {
                  id: 'el-3',
                  kind: ENTITY_KINDS.ELEMENT,
                  tag: 'article',
                  children: [
                    { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });
  });

  describe('Filtering Non-Instance Nodes', () => {
    it('should exclude elements', () => {
      const tree = [
        { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
        { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('inst-1');
      expect(result[1].id).toBe('inst-2');
    });

    it('should exclude components', () => {
      const tree = [
        { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
        { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Button' },
        { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('inst-1');
      expect(result[1].id).toBe('inst-2');
    });

    it('should exclude non-instance nodes in nested tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Button' },
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
            { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for empty tree', () => {
      const result = extractAllInstancesFromTree([]);

      expect(result).toEqual([]);
    });

    it('should return empty array for null tree', () => {
      const result = extractAllInstancesFromTree(null);

      expect(result).toEqual([]);
    });

    it('should return empty array for undefined tree', () => {
      const result = extractAllInstancesFromTree(undefined);

      expect(result).toEqual([]);
    });

    it('should handle tree with no instances (only elements)', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
        { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toEqual([]);
    });

    it('should handle nodes with empty children array', () => {
      const tree = [
        {
          id: 'inst-1',
          kind: ENTITY_KINDS.INSTANCE,
          componentId: 'comp-1',
          children: [],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });

    it('should handle nodes with null children', () => {
      const tree = [
        {
          id: 'inst-1',
          kind: ENTITY_KINDS.INSTANCE,
          componentId: 'comp-1',
          children: null,
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });

    it('should handle nodes with undefined children', () => {
      const tree = [
        {
          id: 'inst-1',
          kind: ENTITY_KINDS.INSTANCE,
          componentId: 'comp-1',
          children: undefined,
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });
  });

  describe('Complex Tree Structures', () => {
    it('should handle mixed nested structure', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Header' },
            {
              id: 'el-2',
              kind: ENTITY_KINDS.ELEMENT,
              tag: 'main',
              children: [
                { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
                { id: 'el-3', kind: ENTITY_KINDS.ELEMENT, tag: 'article' },
              ],
            },
            { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result.map(inst => inst.id)).toEqual(['inst-1', 'inst-2']);
    });

    it('should handle multiple root nodes', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
          ],
        },
        {
          id: 'el-2',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'section',
          children: [
            { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result.map(inst => inst.id)).toEqual(['inst-1', 'inst-2']);
    });

    it('should handle very deep nesting (10 levels)', () => {
      let currentNode = { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' };

      for (let i = 9; i >= 1; i--) {
        currentNode = {
          id: `el-${i}`,
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [currentNode],
        };
      }

      const tree = [currentNode];
      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inst-1');
    });

    it('should handle multiple instances at different levels', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
            {
              id: 'el-2',
              kind: ENTITY_KINDS.ELEMENT,
              tag: 'section',
              children: [
                { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-2' },
                {
                  id: 'el-3',
                  kind: ENTITY_KINDS.ELEMENT,
                  tag: 'article',
                  children: [
                    { id: 'inst-3', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-3' },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result).toHaveLength(3);
      expect(result.map(inst => inst.id)).toEqual(['inst-1', 'inst-2', 'inst-3']);
    });
  });

  describe('Instance Properties Preservation', () => {
    it('should preserve all instance properties', () => {
      const tree = [
        {
          id: 'inst-1',
          kind: ENTITY_KINDS.INSTANCE,
          componentId: 'comp-1',
          props: { text: 'Click me' },
          overrides: { color: 'blue' },
          metadata: { created: '2024-01-01' },
        },
      ];

      const result = extractAllInstancesFromTree(tree);

      expect(result[0]).toEqual({
        id: 'inst-1',
        kind: ENTITY_KINDS.INSTANCE,
        componentId: 'comp-1',
        props: { text: 'Click me' },
        overrides: { color: 'blue' },
        metadata: { created: '2024-01-01' },
      });
    });
  });

  describe('Immutability', () => {
    it('should not mutate original tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
          ],
        },
      ];

      const originalTree = JSON.parse(JSON.stringify(tree));

      extractAllInstancesFromTree(tree);

      expect(tree).toEqual(originalTree);
    });
  });
});

