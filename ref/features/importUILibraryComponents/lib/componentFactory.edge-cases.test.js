// ===================================================================
// EDGE CASE & ERROR HANDLING TESTS: Component Factory
// 🔴 CRITICAL-FIRST STRATEGY - Phase 2 🔴
// Error Handling, Complex Nesting, Validation, Metadata Edge Cases
// ===================================================================

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { componentFactory } from './componentFactory';
import { normalizeComponent } from './normalizeComponent';
import { dynamicComponentAnalyzer } from './componentDynamicAnalyzer';

// Mock dependencies
vi.mock('./normalizePropList', () => ({
  normalizePropList: vi.fn(),
  createBasicElements: vi.fn(),
  createComponentVariants: vi.fn(),
}));

vi.mock('./normalizeCode', () => ({
  normalizeCode: vi.fn(),
}));

vi.mock('./normalizeComponent', () => ({
  normalizeComponent: vi.fn(),
}));

vi.mock('./componentDynamicAnalyzer', () => ({
  dynamicComponentAnalyzer: vi.fn(),
}));

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-uuid-1234'),
}));

// Import mocked modules
import { normalizePropList, createBasicElements, createComponentVariants } from './normalizePropList';
import { normalizeCode } from './normalizeCode';

describe('Component Factory - Edge Cases & Error Handling', () => {

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default successful mocks
    dynamicComponentAnalyzer.mockResolvedValue({
      id: 'comp-1',
      name: 'Button',
      props: [],
      jsx: '<button>Click me</button>',
    });

    normalizeComponent.mockReturnValue({
      id: 'comp-1',
      name: 'Button',
      kind: 'component',
    });

    normalizeCode.mockReturnValue({
      id: 'code-1',
      content: 'const Button = () => <button>Click me</button>',
    });

    normalizePropList.mockReturnValue({
      normalizedProps: [],
      normalizedPropValues: [],
      propIds: [],
    });

    createBasicElements.mockReturnValue(['elem-1']);
    createComponentVariants.mockReturnValue([{ id: 'variant-1' }]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ===================================================================
  // Section 1: Error Handling & Validation (15 tests)
  // ===================================================================

  describe('Error Handling & Validation', () => {
    it('should handle dynamicComponentAnalyzer throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      dynamicComponentAnalyzer.mockRejectedValue(new Error('Analysis failed'));

      await expect(componentFactory(component)).rejects.toThrow('Analysis failed');
    });

    it('should handle normalizeComponent throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizeComponent.mockImplementation(() => {
        throw new Error('Normalization failed');
      });

      await expect(componentFactory(component)).rejects.toThrow('Normalization failed');
    });

    it('should handle normalizeCode throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizeCode.mockImplementation(() => {
        throw new Error('Code normalization failed');
      });

      await expect(componentFactory(component)).rejects.toThrow('Code normalization failed');
    });

    it('should handle normalizePropList throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizePropList.mockImplementation(() => {
        throw new Error('Prop normalization failed');
      });

      await expect(componentFactory(component)).rejects.toThrow('Prop normalization failed');
    });

    it('should handle createBasicElements throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockImplementation(() => {
        throw new Error('Element creation failed');
      });

      await expect(componentFactory(component)).rejects.toThrow('Element creation failed');
    });

    it('should handle createComponentVariants throwing an error', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createComponentVariants.mockImplementation(() => {
        throw new Error('Variant creation failed');
      });

      await expect(componentFactory(component)).rejects.toThrow('Variant creation failed');
    });

    it('should handle component with invalid type (array)', async () => {
      const result = await componentFactory([]);
      // Empty array is truthy, so it gets processed
      expect(result).toBeDefined();
    });

    it('should handle component with invalid type (string)', async () => {
      const result = await componentFactory('invalid');
      // String is truthy, so it gets processed
      expect(result).toBeDefined();
    });

    it('should handle component with invalid type (number)', async () => {
      const result = await componentFactory(123);
      // Number is truthy, so it gets processed
      expect(result).toBeDefined();
    });

    it('should handle component with empty object', async () => {
      const component = {};
      const result = await componentFactory(component);

      // Should process empty object and call all functions
      expect(dynamicComponentAnalyzer).toHaveBeenCalledWith(component);
      expect(result).toBeDefined();
    });

    it('should handle analyzed component with missing required fields', async () => {
      const component = { id: 'comp-1' };
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: '' });

      normalizeComponent.mockReturnValue({
        id: 'comp-1',
        name: '',
        kind: 'component',
      });

      const result = await componentFactory(component);

      // Should handle gracefully even with minimal data
      expect(result).toBeDefined();
      expect(result.component.id).toBe('comp-1');
    });

    it('should handle missing component ID', async () => {
      const component = { name: 'Button' };
      const result = await componentFactory(component);

      expect(dynamicComponentAnalyzer).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should handle missing component name', async () => {
      const component = { id: 'comp-1' };
      const result = await componentFactory(component);

      expect(dynamicComponentAnalyzer).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should handle component with circular references', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      component.self = component; // Circular reference

      const result = await componentFactory(component);

      // Should not cause stack overflow
      expect(dynamicComponentAnalyzer).toHaveBeenCalledWith(component);
    });

    it('should handle very long component name (1000+ characters)', async () => {
      const longName = 'A'.repeat(1000);
      const component = { id: 'comp-1', name: longName };

      const result = await componentFactory(component);

      expect(dynamicComponentAnalyzer).toHaveBeenCalledWith(component);
      expect(result).toBeDefined();
    });
  });

  // ===================================================================
  // Section 2: Complex Nesting & Props (10 tests)
  // ===================================================================

  describe('Complex Nesting & Props', () => {
    it('should handle component with deeply nested props', async () => {
      const component = {
        id: 'comp-1',
        name: 'ComplexButton',
        props: [
          {
            name: 'style',
            type: 'object',
            nested: {
              nested: {
                nested: {
                  value: 'deep',
                },
              },
            },
          },
        ],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [
          { id: 'prop-1', name: 'style', type: 'object' },
        ],
        normalizedPropValues: [],
        propIds: ['prop-1'],
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
      expect(result.props).toHaveLength(1);
    });

    it('should handle component with 100+ props', async () => {
      const manyProps = Array.from({ length: 100 }, (_, i) => ({
        name: `prop${i}`,
        type: 'string',
        value: `value${i}`,
      }));

      const component = {
        id: 'comp-1',
        name: 'ManyPropsComponent',
        props: manyProps,
      };

      normalizePropList.mockReturnValue({
        normalizedProps: manyProps.map((p, i) => ({ id: `prop-${i}`, ...p })),
        normalizedPropValues: [],
        propIds: manyProps.map((_, i) => `prop-${i}`),
      });

      const result = await componentFactory(component);

      expect(result.props).toHaveLength(100);
    });

    it('should handle component with duplicate prop names', async () => {
      const component = {
        id: 'comp-1',
        name: 'DuplicatePropsComponent',
        props: [
          { name: 'color', type: 'string', value: 'red' },
          { name: 'color', type: 'string', value: 'blue' }, // Duplicate!
        ],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [
          { id: 'prop-1', name: 'color', type: 'string' },
          { id: 'prop-2', name: 'color', type: 'string' },
        ],
        normalizedPropValues: [],
        propIds: ['prop-1', 'prop-2'],
      });

      const result = await componentFactory(component);

      expect(result.props).toHaveLength(2);
    });

    it('should handle component with props having special characters', async () => {
      const component = {
        id: 'comp-1',
        name: 'SpecialPropsComponent',
        props: [
          { name: 'data-test-id', type: 'string' },
          { name: 'aria-label', type: 'string' },
          { name: 'on:click', type: 'function' },
        ],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [
          { id: 'prop-1', name: 'data-test-id', type: 'string' },
          { id: 'prop-2', name: 'aria-label', type: 'string' },
          { id: 'prop-3', name: 'on:click', type: 'function' },
        ],
        normalizedPropValues: [],
        propIds: ['prop-1', 'prop-2', 'prop-3'],
      });

      const result = await componentFactory(component);

      expect(result.props).toHaveLength(3);
    });

    it('should handle component with empty props array', async () => {
      const component = {
        id: 'comp-1',
        name: 'NoPropsComponent',
        props: [],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });

      const result = await componentFactory(component);

      expect(result.props).toHaveLength(0);
    });

    it('should handle component with undefined props', async () => {
      const component = {
        id: 'comp-1',
        name: 'UndefinedPropsComponent',
        props: undefined,
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with null props', async () => {
      const component = {
        id: 'comp-1',
        name: 'NullPropsComponent',
        props: null,
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with props having circular references', async () => {
      const prop = { name: 'recursive', type: 'object' };
      prop.value = prop; // Circular

      const component = {
        id: 'comp-1',
        name: 'CircularPropsComponent',
        props: [prop],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [{ id: 'prop-1', name: 'recursive', type: 'object' }],
        normalizedPropValues: [],
        propIds: ['prop-1'],
      });

      const result = await componentFactory(component);

      // Should not cause stack overflow
      expect(result).toBeDefined();
    });

    it('should handle component with props having invalid types', async () => {
      const component = {
        id: 'comp-1',
        name: 'InvalidPropTypesComponent',
        props: [
          { name: 'prop1', type: 'unknown-type' },
          { name: 'prop2', type: null },
          { name: 'prop3', type: undefined },
        ],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [
          { id: 'prop-1', name: 'prop1', type: 'unknown-type' },
          { id: 'prop-2', name: 'prop2', type: null },
          { id: 'prop-3', name: 'prop3', type: undefined },
        ],
        normalizedPropValues: [],
        propIds: ['prop-1', 'prop-2', 'prop-3'],
      });

      const result = await componentFactory(component);

      expect(result.props).toHaveLength(3);
    });

    it('should handle component with very large prop values', async () => {
      const largeValue = 'x'.repeat(10000); // 10KB string

      const component = {
        id: 'comp-1',
        name: 'LargePropsComponent',
        props: [
          { name: 'bigProp', type: 'string', value: largeValue },
        ],
      };

      normalizePropList.mockReturnValue({
        normalizedProps: [{ id: 'prop-1', name: 'bigProp', type: 'string' }],
        normalizedPropValues: [{ id: 'val-1', value: largeValue }],
        propIds: ['prop-1'],
      });

      const result = await componentFactory(component);

      expect(result.propValues[0].value).toBe(largeValue);
    });
  });

  // ===================================================================
  // Section 3: Metadata & JSDoc Edge Cases (10 tests)
  // ===================================================================

  describe('Metadata & JSDoc Edge Cases', () => {
    it('should handle component with malformed JSDoc', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: {
          description: '/* Incomplete JSDoc',
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: component.docgen },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with empty JSDoc', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: {
          description: '',
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: component.docgen },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with null JSDoc', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: null,
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: null },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with extremely long JSDoc (10KB+)', async () => {
      const longDoc = 'A'.repeat(10000);

      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: {
          description: longDoc,
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: component.docgen },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with JSDoc containing special characters', async () => {
      const specialDoc = '©®™€£¥@#$%^&*(){}[]|\\:;"\'<>,.?/~`';

      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: {
          description: specialDoc,
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: component.docgen },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with JSDoc containing code blocks', async () => {
      const codeDoc = `
        /** 
         * Example usage:
         * \`\`\`jsx
         * <Button onClick={() => {}}>
         *   Click me
         * </Button>
         * \`\`\`
         */
      `;

      const component = {
        id: 'comp-1',
        name: 'Button',
        docgen: {
          description: codeDoc,
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: { docgen: component.docgen },
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with metadata containing circular references', async () => {
      const metadata = { type: 'meta' };
      metadata.self = metadata; // Circular

      const component = {
        id: 'comp-1',
        name: 'Button',
        metadata,
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata,
      });

      const result = await componentFactory(component);

      // Should not cause stack overflow
      expect(result).toBeDefined();
    });

    it('should handle component with missing metadata', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        metadata: undefined,
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: undefined,
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with null metadata', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        metadata: null,
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: null,
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with metadata containing functions', async () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        metadata: {
          onClick: () => console.log('clicked'),
          onHover: function() { return true; },
        },
      };

      dynamicComponentAnalyzer.mockResolvedValue({
        ...component,
        metadata: component.metadata,
      });

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });
  });

  // ===================================================================
  // Section 4: Element Creation Edge Cases (10 tests)
  // ===================================================================

  describe('Element Creation Edge Cases', () => {
    it('should handle createBasicElements returning empty array', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockReturnValue([]);

      const result = await componentFactory(component);

      // Empty array is truthy, so factory continues and returns result with empty elements
      expect(result).toBeDefined();
      expect(result.elements).toHaveLength(0);
    });

    it('should handle createBasicElements returning very large array (1000+ elements)', async () => {
      const component = { id: 'comp-1', name: 'MegaComponent' };
      const manyElements = Array.from({ length: 1000 }, (_, i) => `elem-${i}`);
      createBasicElements.mockReturnValue(manyElements);

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(1000);
    });

    it('should handle element IDs with special characters', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const specialIds = ['elem-@#$', 'elem-™©®', 'elem-中文'];
      createBasicElements.mockReturnValue(specialIds);

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(3);
      expect(result.elements[0].id).toBe('elem-@#$');
    });

    it('should handle duplicate element IDs', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockReturnValue(['elem-1', 'elem-1', 'elem-1']);

      const result = await componentFactory(component);

      // Should process all elements even if IDs are duplicate
      expect(result.elements).toHaveLength(3);
    });

    it('should handle element IDs as numbers', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockReturnValue([1, 2, 3]);

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(3);
      expect(result.elements[0].id).toBe(1);
    });

    it('should handle element IDs with very long strings', async () => {
      const longId = 'elem-' + 'a'.repeat(1000);
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockReturnValue([longId]);

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe(longId);
    });

    it('should set correct element kind (ELEMENT)', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createBasicElements.mockReturnValue(['elem-1', 'elem-2']);

      const result = await componentFactory(component);

      result.elements.forEach(elem => {
        expect(elem.kind).toBe('element');
      });
    });

    it('should set element componentId correctly for all elements', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizeComponent.mockReturnValue({
        id: 'normalized-comp-1',
        name: 'Button',
        kind: 'component',
      });
      createBasicElements.mockReturnValue(['elem-1', 'elem-2', 'elem-3']);

      const result = await componentFactory(component);

      result.elements.forEach(elem => {
        expect(elem.componentId).toBe('normalized-comp-1');
      });
    });

    it('should set element name with component name', async () => {
      const component = { id: 'comp-1', name: 'CustomButton' };
      createBasicElements.mockReturnValue(['elem-1']);

      const result = await componentFactory(component);

      expect(result.elements[0].name).toContain('CustomButton');
    });

    it('should handle component with empty string name for element naming', async () => {
      const component = { id: 'comp-1', name: '' };
      createBasicElements.mockReturnValue(['elem-1']);

      const result = await componentFactory(component);

      // Should still create element even with empty component name
      expect(result.elements[0]).toBeDefined();
      expect(result.elements[0].name).toBeDefined();
    });
  });

  // ===================================================================
  // Section 5: Variant Creation Edge Cases (10 tests)
  // ===================================================================

  describe('Variant Creation Edge Cases', () => {
    it('should handle createComponentVariants returning empty array', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      createComponentVariants.mockReturnValue([]);

      const result = await componentFactory(component);

      // Empty array is truthy, so factory continues and returns result
      expect(result).toBeDefined();
    });

    it('should handle 100+ variants', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const manyVariants = Array.from({ length: 100 }, (_, i) => ({
        id: `variant-${i}`,
        name: `Variant ${i}`,
      }));
      createComponentVariants.mockReturnValue(manyVariants);

      const result = await componentFactory(component);

      expect(result).toBeDefined();
      // Variants should be processed
      expect(createComponentVariants).toHaveBeenCalled();
    });

    it('should handle variant with duplicate IDs', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const variants = [
        { id: 'variant-1', name: 'Primary' },
        { id: 'variant-1', name: 'Primary Duplicate' },
      ];
      createComponentVariants.mockReturnValue(variants);

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle variant with missing ID', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const variants = [
        { name: 'Primary' }, // Missing ID
      ];
      createComponentVariants.mockReturnValue(variants);

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle variant with missing name', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const variants = [
        { id: 'variant-1' }, // Missing name
      ];
      createComponentVariants.mockReturnValue(variants);

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should pass normalized props to createComponentVariants', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const normalizedProps = [
        { id: 'prop-1', name: 'color', type: 'string' },
      ];

      normalizePropList.mockReturnValue({
        normalizedProps,
        normalizedPropValues: [],
        propIds: ['prop-1'],
      });

      await componentFactory(component);

      expect(createComponentVariants).toHaveBeenCalledWith(
        component,
        normalizedProps,
      );
    });

    it('should handle createComponentVariants with empty props', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });

      await componentFactory(component);

      expect(createComponentVariants).toHaveBeenCalledWith(component, []);
    });

    it('should handle createComponentVariants with null props', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      normalizePropList.mockReturnValue({
        normalizedProps: null,
        normalizedPropValues: [],
        propIds: [],
      });

      await componentFactory(component);

      expect(createComponentVariants).toHaveBeenCalledWith(component, null);
    });

    it('should handle variant with circular references', async () => {
      const variant = { id: 'variant-1', name: 'Primary' };
      variant.self = variant; // Circular

      const component = { id: 'comp-1', name: 'Button' };
      createComponentVariants.mockReturnValue([variant]);

      const result = await componentFactory(component);

      // Should not cause stack overflow
      expect(result).toBeDefined();
    });

    it('should handle variant with special characters in name', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const variants = [
        { id: 'variant-1', name: 'Primary™' },
        { id: 'variant-2', name: 'Secondary®' },
        { id: 'variant-3', name: '特殊変体' },
      ];
      createComponentVariants.mockReturnValue(variants);

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });
  });

  // ===================================================================
  // Section 6: Library Info Edge Cases (5 tests)
  // ===================================================================

  describe('Library Info Edge Cases', () => {
    it('should handle libraryInfo with invalid structure', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const invalidLibraryInfo = 'invalid-library-info';

      const result = await componentFactory(component, invalidLibraryInfo);

      expect(normalizeComponent).toHaveBeenCalledWith(
        expect.anything(),
        invalidLibraryInfo,
      );
      expect(result).toBeDefined();
    });

    it('should handle libraryInfo with missing fields', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const partialLibraryInfo = {
        name: 'MaterialUI',
        // Missing version, etc.
      };

      const result = await componentFactory(component, partialLibraryInfo);

      expect(result).toBeDefined();
    });

    it('should handle libraryInfo with null fields', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = {
        name: null,
        version: null,
        source: null,
      };

      const result = await componentFactory(component, libraryInfo);

      expect(result).toBeDefined();
    });

    it('should handle libraryInfo with very long values', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const longName = 'A'.repeat(1000);
      const libraryInfo = {
        name: longName,
        version: '1.0.0',
      };

      const result = await componentFactory(component, libraryInfo);

      expect(normalizeComponent).toHaveBeenCalledWith(
        expect.anything(),
        libraryInfo,
      );
    });

    it('should handle libraryInfo with special characters', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = {
        name: '@material-ui/core™',
        version: 'v5.0.0-beta.1',
      };

      const result = await componentFactory(component, libraryInfo);

      expect(result).toBeDefined();
    });
  });
});

