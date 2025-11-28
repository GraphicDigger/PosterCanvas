// ===================================================================
// Unit Tests for extractAllElementsFromTree Helper
// Coverage Target: 100%
// Phase 1 - Business Logic Helpers
// Risk: LOW (pure function, recursive tree traversal)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { extractAllElementsFromTree } from '../extractAllElementsFromTree';
import { ENTITY_KINDS } from '@/shared/constants';

describe('extractAllElementsFromTree Helper', () => {
  describe('Basic Functionality', () => {
    it('should extract single element from flat tree', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' });
    });

    it('should extract multiple elements from flat tree', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
        { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
        { id: 'el-3', kind: ENTITY_KINDS.ELEMENT, tag: 'button' },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
      expect(result[2].id).toBe('el-3');
    });

    it('should extract elements from nested tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
            { id: 'el-3', kind: ENTITY_KINDS.ELEMENT, tag: 'button' },
          ],
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
      expect(result[2].id).toBe('el-3');
    });

    it('should extract elements from deeply nested tree', () => {
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
                    { id: 'el-4', kind: ENTITY_KINDS.ELEMENT, tag: 'p' },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(4);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4']);
    });
  });

  describe('Filtering Non-Element Nodes', () => {
    it('should exclude non-element nodes (components)', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
        { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Button' },
        { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
    });

    it('should exclude non-element nodes (instances)', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div' },
        { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
        { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
    });

    it('should exclude non-element nodes in nested tree', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Button' },
            { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
            { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
          ],
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for empty tree', () => {
      const result = extractAllElementsFromTree([]);

      expect(result).toEqual([]);
    });

    it('should return empty array for null tree', () => {
      const result = extractAllElementsFromTree(null);

      expect(result).toEqual([]);
    });

    it('should return empty array for undefined tree', () => {
      const result = extractAllElementsFromTree(undefined);

      expect(result).toEqual([]);
    });

    it('should handle tree with no elements (only components)', () => {
      const tree = [
        { id: 'comp-1', kind: ENTITY_KINDS.COMPONENT, name: 'Button' },
        { id: 'comp-2', kind: ENTITY_KINDS.COMPONENT, name: 'Input' },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toEqual([]);
    });

    it('should handle nodes with empty children array', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div', children: [] },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('el-1');
    });

    it('should handle nodes with null children', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div', children: null },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('el-1');
    });

    it('should handle nodes with undefined children', () => {
      const tree = [
        { id: 'el-1', kind: ENTITY_KINDS.ELEMENT, tag: 'div', children: undefined },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('el-1');
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
                { id: 'el-3', kind: ENTITY_KINDS.ELEMENT, tag: 'article' },
                { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE, componentId: 'comp-1' },
              ],
            },
            { id: 'el-4', kind: ENTITY_KINDS.ELEMENT, tag: 'footer' },
          ],
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(4);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4']);
    });

    it('should handle multiple root nodes', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [
            { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
          ],
        },
        {
          id: 'el-3',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'section',
          children: [
            { id: 'el-4', kind: ENTITY_KINDS.ELEMENT, tag: 'p' },
          ],
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(4);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4']);
    });

    it('should handle very deep nesting (10 levels)', () => {
      let currentNode = { id: 'el-10', kind: ENTITY_KINDS.ELEMENT, tag: 'span' };

      for (let i = 9; i >= 1; i--) {
        currentNode = {
          id: `el-${i}`,
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          children: [currentNode],
        };
      }

      const tree = [currentNode];
      const result = extractAllElementsFromTree(tree);

      expect(result).toHaveLength(10);
      expect(result.map(el => el.id)).toEqual([
        'el-1', 'el-2', 'el-3', 'el-4', 'el-5',
        'el-6', 'el-7', 'el-8', 'el-9', 'el-10',
      ]);
    });
  });

  describe('Element Properties Preservation', () => {
    it('should preserve all element properties', () => {
      const tree = [
        {
          id: 'el-1',
          kind: ENTITY_KINDS.ELEMENT,
          tag: 'div',
          props: { className: 'container' },
          styles: { width: '100%' },
          metadata: { created: '2024-01-01' },
        },
      ];

      const result = extractAllElementsFromTree(tree);

      expect(result[0]).toEqual({
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        tag: 'div',
        props: { className: 'container' },
        styles: { width: '100%' },
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
            { id: 'el-2', kind: ENTITY_KINDS.ELEMENT, tag: 'span' },
          ],
        },
      ];

      const originalTree = JSON.parse(JSON.stringify(tree));

      extractAllElementsFromTree(tree);

      expect(tree).toEqual(originalTree);
    });
  });
});

