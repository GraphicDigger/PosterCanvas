// ===================================================================
// Unit Tests for flattenElementWithChildren Helper
// Coverage Target: 100%
// Phase 1 - Business Logic Helpers
// Risk: LOW (pure function, recursive tree flattening)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { flattenElementWithChildren } from '../flattenElementWithChildren';

describe('flattenElementWithChildren Helper', () => {
  describe('Basic Functionality', () => {
    it('should return single element when no children', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        props: {},
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(element);
    });

    it('should flatten element with one child', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          { id: 'el-2', tag: 'span' },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('el-1');
      expect(result[1].id).toBe('el-2');
    });

    it('should flatten element with multiple children', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          { id: 'el-2', tag: 'span' },
          { id: 'el-3', tag: 'button' },
          { id: 'el-4', tag: 'input' },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(4);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4']);
    });

    it('should flatten nested hierarchy (2 levels)', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          {
            id: 'el-2',
            tag: 'section',
            childrens: [
              { id: 'el-3', tag: 'p' },
              { id: 'el-4', tag: 'span' },
            ],
          },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(4);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4']);
    });

    it('should flatten deeply nested hierarchy (5 levels)', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          {
            id: 'el-2',
            tag: 'section',
            childrens: [
              {
                id: 'el-3',
                tag: 'article',
                childrens: [
                  {
                    id: 'el-4',
                    tag: 'header',
                    childrens: [
                      { id: 'el-5', tag: 'h1' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(5);
      expect(result.map(el => el.id)).toEqual(['el-1', 'el-2', 'el-3', 'el-4', 'el-5']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle element with empty childrens array', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(element);
    });

    it('should handle element with null childrens', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: null,
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(element);
    });

    it('should handle element with undefined childrens', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: undefined,
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(element);
    });

    it('should handle element without childrens property', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(element);
    });
  });

  describe('Complex Hierarchies', () => {
    it('should flatten mixed depth hierarchy', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          {
            id: 'el-2',
            tag: 'section',
            childrens: [
              { id: 'el-3', tag: 'p' },
            ],
          },
          { id: 'el-4', tag: 'span' },
          {
            id: 'el-5',
            tag: 'article',
            childrens: [
              {
                id: 'el-6',
                tag: 'header',
                childrens: [
                  { id: 'el-7', tag: 'h1' },
                ],
              },
            ],
          },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(7);
      expect(result.map(el => el.id)).toEqual([
        'el-1', 'el-2', 'el-3', 'el-4', 'el-5', 'el-6', 'el-7',
      ]);
    });

    it('should flatten wide hierarchy (many siblings)', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          { id: 'el-2', tag: 'span' },
          { id: 'el-3', tag: 'button' },
          { id: 'el-4', tag: 'input' },
          { id: 'el-5', tag: 'label' },
          { id: 'el-6', tag: 'select' },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result).toHaveLength(6);
      expect(result.map(el => el.id)).toEqual([
        'el-1', 'el-2', 'el-3', 'el-4', 'el-5', 'el-6',
      ]);
    });

    it('should handle very deep nesting (10 levels)', () => {
      let currentElement = { id: 'el-10', tag: 'span' };

      for (let i = 9; i >= 1; i--) {
        currentElement = {
          id: `el-${i}`,
          tag: 'div',
          childrens: [currentElement],
        };
      }

      const result = flattenElementWithChildren(currentElement);

      expect(result).toHaveLength(10);
      expect(result.map(el => el.id)).toEqual([
        'el-1', 'el-2', 'el-3', 'el-4', 'el-5',
        'el-6', 'el-7', 'el-8', 'el-9', 'el-10',
      ]);
    });
  });

  describe('Order Preservation', () => {
    it('should maintain correct order (parent before children)', () => {
      const element = {
        id: 'parent',
        tag: 'div',
        childrens: [
          { id: 'child-1', tag: 'span' },
          { id: 'child-2', tag: 'button' },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result[0].id).toBe('parent');
      expect(result[1].id).toBe('child-1');
      expect(result[2].id).toBe('child-2');
    });

    it('should maintain correct order in nested structure', () => {
      const element = {
        id: 'root',
        tag: 'div',
        childrens: [
          {
            id: 'level-1-a',
            tag: 'section',
            childrens: [
              { id: 'level-2-a', tag: 'p' },
            ],
          },
          {
            id: 'level-1-b',
            tag: 'article',
            childrens: [
              { id: 'level-2-b', tag: 'span' },
            ],
          },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result.map(el => el.id)).toEqual([
        'root',
        'level-1-a',
        'level-2-a',
        'level-1-b',
        'level-2-b',
      ]);
    });
  });

  describe('Property Preservation', () => {
    it('should preserve all element properties', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        props: { className: 'container' },
        styles: { width: '100%' },
        metadata: { created: '2024-01-01' },
        childrens: [
          {
            id: 'el-2',
            tag: 'span',
            props: { text: 'Hello' },
          },
        ],
      };

      const result = flattenElementWithChildren(element);

      expect(result[0].props).toEqual({ className: 'container' });
      expect(result[0].styles).toEqual({ width: '100%' });
      expect(result[0].metadata).toEqual({ created: '2024-01-01' });
      expect(result[1].props).toEqual({ text: 'Hello' });
    });
  });

  describe('Immutability', () => {
    it('should not mutate original element', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          { id: 'el-2', tag: 'span' },
        ],
      };

      const originalElement = JSON.parse(JSON.stringify(element));

      flattenElementWithChildren(element);

      expect(element).toEqual(originalElement);
    });

    it('should not mutate nested children', () => {
      const element = {
        id: 'el-1',
        tag: 'div',
        childrens: [
          {
            id: 'el-2',
            tag: 'section',
            childrens: [
              { id: 'el-3', tag: 'p' },
            ],
          },
        ],
      };

      const originalElement = JSON.parse(JSON.stringify(element));

      flattenElementWithChildren(element);

      expect(element).toEqual(originalElement);
    });
  });

  describe('Performance', () => {
    it('should handle large hierarchy efficiently', () => {
      // Create a hierarchy with 100 elements
      const elements = [];
      for (let i = 1; i <= 100; i++) {
        elements.push({ id: `el-${i}`, tag: 'div' });
      }

      const element = {
        id: 'root',
        tag: 'div',
        childrens: elements,
      };

      const start = Date.now();
      const result = flattenElementWithChildren(element);
      const duration = Date.now() - start;

      expect(result).toHaveLength(101);
      expect(duration).toBeLessThan(100); // Should complete in < 100ms
    });
  });
});

