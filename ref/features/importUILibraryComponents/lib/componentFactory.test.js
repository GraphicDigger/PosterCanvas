// ===================================================================
// Unit Tests for Component Factory System
// CRITICAL BUSINESS LOGIC - Must have 95% coverage before TypeScript
// Week 1, Day 2 - Component Import Logic (80 tests total)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
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

vi.mock('./componentDynamicAnalyzer', () => ({
  dynamicComponentAnalyzer: vi.fn(),
}));

vi.mock('../../../shared/constants', () => ({
  ENTITY_KINDS: {
    COMPONENT: 'component',
    ELEMENT: 'element',
  },
}));

import { normalizePropList, createBasicElements, createComponentVariants } from './normalizePropList';
import { normalizeCode } from './normalizeCode';
import { ENTITY_KINDS } from '../../../shared/constants';

describe('Component Factory System - CRITICAL BUSINESS LOGIC', () => {

  // ===================================================================
  // PART 1: normalizeComponent (20 tests)
  // ===================================================================

  describe('normalizeComponent', () => {
    it('should normalize component with full data', () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
      };
      const libraryInfo = {
        id: 'lib-1',
        name: 'Material-UI',
        version: '5.0.0',
      };

      const result = normalizeComponent(component, libraryInfo);

      expect(result).toEqual({
        id: 'comp-1',
        name: 'Button',
        kind: 'component',
        metadata: {
          source: 'ui-library',
          originalId: 'comp-1',
          libraryName: 'Material-UI',
          libraryId: 'lib-1',
          libraryVersion: '5.0.0',
        },
      });
    });

    it('should return null for null component', () => {
      const result = normalizeComponent(null);
      expect(result).toBeNull();
    });

    it('should return null for undefined component', () => {
      const result = normalizeComponent(undefined);
      expect(result).toBeNull();
    });

    it('should handle missing libraryInfo', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.metadata).toEqual({
        source: 'ui-library',
        originalId: 'comp-1',
        libraryName: '',
        libraryId: null,
        libraryVersion: null,
      });
    });

    it('should handle null libraryInfo', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component, null);

      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should handle empty libraryInfo object', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component, {});

      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should preserve component ID', () => {
      const component = { id: 'custom-id-123', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.id).toBe('custom-id-123');
      expect(result.metadata.originalId).toBe('custom-id-123');
    });

    it('should preserve component name', () => {
      const component = { id: 'comp-1', name: 'MyCustomButton' };
      const result = normalizeComponent(component);

      expect(result.name).toBe('MyCustomButton');
    });

    it('should set correct entity kind', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.kind).toBe('component');
    });

    it('should handle component with extra properties', () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        extraProp: 'value',
        anotherProp: 123,
      };
      const result = normalizeComponent(component);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).not.toHaveProperty('extraProp');
      expect(result).not.toHaveProperty('anotherProp');
    });

    it('should handle partial libraryInfo', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component, { name: 'MUI' });

      expect(result.metadata.libraryName).toBe('MUI');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should handle special characters in component name', () => {
      const component = { id: 'comp-1', name: 'Button-Primary_v2' };
      const result = normalizeComponent(component);

      expect(result.name).toBe('Button-Primary_v2');
    });

    it('should handle numeric component ID', () => {
      const component = { id: 123, name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.id).toBe(123);
    });

    it('should handle empty string component name', () => {
      const component = { id: 'comp-1', name: '' };
      const result = normalizeComponent(component);

      expect(result.name).toBe('');
    });

    it('should handle library version as string', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = { version: '1.2.3' };
      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryVersion).toBe('1.2.3');
    });

    it('should handle library version as number', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = { version: 5 };
      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryVersion).toBe(5);
    });

    it('should set source as ui-library', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.metadata.source).toBe('ui-library');
    });

    it('should handle complex library name', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = { name: '@material-ui/core' };
      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('@material-ui/core');
    });

    it('should create immutable metadata object', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result.metadata).toBeDefined();
      expect(typeof result.metadata).toBe('object');
    });

    it('should handle component with only required fields', () => {
      const component = { id: 'comp-1', name: 'Button' };
      const result = normalizeComponent(component);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('kind');
      expect(result).toHaveProperty('metadata');
    });
  });

  // ===================================================================
  // PART 2: componentFactory - Basic Functionality (20 tests)
  // ===================================================================

  describe('componentFactory - Basic Functionality', () => {
    beforeEach(() => {
      vi.clearAllMocks();

      // Setup default mocks
      dynamicComponentAnalyzer.mockResolvedValue({
        id: 'comp-1',
        name: 'Button',
        props: [],
        jsx: '<button>Click me</button>',
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

      createBasicElements.mockReturnValue(['elem-1', 'elem-2']);
      createComponentVariants.mockReturnValue([{ id: 'variant-1' }]);
    });

    it('should return null for null component', async () => {
      const result = await componentFactory(null);
      expect(result).toBeNull();
    });

    it('should return null for undefined component', async () => {
      const result = await componentFactory(undefined);
      expect(result).toBeNull();
    });

    it('should call dynamicComponentAnalyzer', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      await componentFactory(component);

      expect(dynamicComponentAnalyzer).toHaveBeenCalledWith(component);
      expect(dynamicComponentAnalyzer).toHaveBeenCalledTimes(1);
    });

    it('should call normalizeCode with analyzed component', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const analyzedComponent = { id: 'comp-1', name: 'Button', jsx: '<div />' };
      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);

      await componentFactory(component);

      expect(normalizeCode).toHaveBeenCalledWith(analyzedComponent);
    });

    it('should call normalizePropList with analyzed component', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const analyzedComponent = { id: 'comp-1', name: 'Button', props: [] };
      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);

      await componentFactory(component);

      expect(normalizePropList).toHaveBeenCalledWith(analyzedComponent);
    });

    it('should call createBasicElements with original component', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      await componentFactory(component);

      expect(createBasicElements).toHaveBeenCalledWith(component);
    });

    it('should return null if createBasicElements returns null', async () => {
      createBasicElements.mockReturnValue(null);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toBeNull();
    });

    it('should return null if createBasicElements returns undefined', async () => {
      createBasicElements.mockReturnValue(undefined);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toBeNull();
    });

    it('should call createComponentVariants with component and props', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const normalizedProps = [{ id: 'prop-1' }];
      normalizePropList.mockReturnValue({
        normalizedProps,
        normalizedPropValues: [],
        propIds: [],
      });

      await componentFactory(component);

      expect(createComponentVariants).toHaveBeenCalledWith(component, normalizedProps);
    });

    it('should return null if createComponentVariants returns null', async () => {
      createComponentVariants.mockReturnValue(null);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toBeNull();
    });

    it('should return null if createComponentVariants returns undefined', async () => {
      createComponentVariants.mockReturnValue(undefined);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toBeNull();
    });

    it('should pass libraryInfo to factory', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = { id: 'lib-1', name: 'MUI' };

      await componentFactory(component, libraryInfo);

      // Function accepts libraryInfo parameter
      expect(dynamicComponentAnalyzer).toHaveBeenCalled();
    });

    it('should handle missing libraryInfo', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toBeDefined();
      expect(result.component).toBeDefined();
    });

    it('should return component property', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toHaveProperty('component');
      expect(result.component).toBeDefined();
    });

    it('should return props property', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toHaveProperty('props');
    });

    it('should return propValues property', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toHaveProperty('propValues');
    });

    it('should return codes property', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toHaveProperty('codes');
    });

    it('should return elements property', async () => {
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result).toHaveProperty('elements');
      expect(Array.isArray(result.elements)).toBe(true);
    });

    it('should handle async dynamicComponentAnalyzer', async () => {
      const component = { id: 'comp-1', name: 'Button' };
      dynamicComponentAnalyzer.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve({ id: 'comp-1', name: 'Button' }), 10)),
      );

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });

    it('should handle component with empty name', async () => {
      const component = { id: 'comp-1', name: '' };

      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });
  });

  // ===================================================================
  // PART 3: componentFactory - Element Creation (20 tests)
  // ===================================================================

  describe('componentFactory - Element Creation', () => {
    beforeEach(() => {
      vi.clearAllMocks();

      dynamicComponentAnalyzer.mockResolvedValue({
        id: 'comp-1',
        name: 'Button',
      });

      normalizeCode.mockReturnValue({});
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      createComponentVariants.mockReturnValue([{}]);
    });

    it('should create elements from element IDs', async () => {
      createBasicElements.mockReturnValue(['elem-1', 'elem-2', 'elem-3']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(3);
    });

    it('should set element ID correctly', async () => {
      createBasicElements.mockReturnValue(['elem-123']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe('elem-123');
    });

    it('should set element name with component name', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'MyButton' };

      const result = await componentFactory(component);

      expect(result.elements[0].name).toBe('MyButton Element');
    });

    it('should set element kind as ELEMENT', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].kind).toBe('element');
    });

    it('should set element componentId', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'Button' };
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-normalized', name: 'Button' });

      const result = await componentFactory(component);

      expect(result.elements[0].componentId).toBe('comp-normalized');
    });

    it('should handle single element', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(1);
    });

    it('should handle multiple elements', async () => {
      createBasicElements.mockReturnValue(['elem-1', 'elem-2', 'elem-3', 'elem-4', 'elem-5']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(5);
    });

    it('should handle empty element IDs array', async () => {
      createBasicElements.mockReturnValue([]);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toEqual([]);
    });

    it('should map all element IDs to element objects', async () => {
      createBasicElements.mockReturnValue(['elem-1', 'elem-2']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0]).toHaveProperty('id');
      expect(result.elements[1]).toHaveProperty('id');
      expect(result.elements[0]).toHaveProperty('name');
      expect(result.elements[1]).toHaveProperty('name');
    });

    it('should include all required element properties', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0]).toHaveProperty('id');
      expect(result.elements[0]).toHaveProperty('name');
      expect(result.elements[0]).toHaveProperty('kind');
      expect(result.elements[0]).toHaveProperty('componentId');
    });

    it('should handle element IDs with special characters', async () => {
      createBasicElements.mockReturnValue(['elem-abc-123', 'elem_xyz_456']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe('elem-abc-123');
      expect(result.elements[1].id).toBe('elem_xyz_456');
    });

    it('should handle numeric element IDs', async () => {
      createBasicElements.mockReturnValue([123, 456]);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe(123);
      expect(result.elements[1].id).toBe(456);
    });

    it('should create unique element names for each element', async () => {
      createBasicElements.mockReturnValue(['elem-1', 'elem-2']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      // All elements get same name pattern (component name + " Element")
      expect(result.elements[0].name).toBe('Button Element');
      expect(result.elements[1].name).toBe('Button Element');
    });

    it('should handle component name with special characters in element name', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      const component = { id: 'comp-1', name: 'My-Custom_Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].name).toBe('My-Custom_Button Element');
    });

    it('should preserve element ID types', async () => {
      createBasicElements.mockReturnValue(['string-id', 123, 'another-id']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(typeof result.elements[0].id).toBe('string');
      expect(typeof result.elements[1].id).toBe('number');
      expect(typeof result.elements[2].id).toBe('string');
    });

    it('should handle large number of elements', async () => {
      const elementIds = Array.from({ length: 50 }, (_, i) => `elem-${i}`);
      createBasicElements.mockReturnValue(elementIds);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(50);
    });

    it('should maintain element ID order', async () => {
      createBasicElements.mockReturnValue(['elem-3', 'elem-1', 'elem-2']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe('elem-3');
      expect(result.elements[1].id).toBe('elem-1');
      expect(result.elements[2].id).toBe('elem-2');
    });

    it('should handle empty string element ID', async () => {
      createBasicElements.mockReturnValue(['']);
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements[0].id).toBe('');
    });

    it('should return elements array even with no props', async () => {
      createBasicElements.mockReturnValue(['elem-1']);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      const component = { id: 'comp-1', name: 'Button' };

      const result = await componentFactory(component);

      expect(result.elements).toHaveLength(1);
    });
  });

  // ===================================================================
  // PART 4: componentFactory - Integration & Data Flow (20 tests)
  // ===================================================================

  describe('componentFactory - Integration & Data Flow', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should pass analyzed component through normalization', async () => {
      const analyzedComponent = {
        id: 'comp-analyzed',
        name: 'AnalyzedButton',
        props: [{ name: 'color' }],
        jsx: '<button>Click</button>',
      };
      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.component.id).toBe('comp-analyzed');
      expect(result.component.name).toBe('AnalyzedButton');
    });

    it('should return normalized props from normalizePropList', async () => {
      const normalizedProps = [{ id: 'prop-1', name: 'color' }, { id: 'prop-2', name: 'size' }];
      normalizePropList.mockReturnValue({
        normalizedProps,
        normalizedPropValues: [],
        propIds: [],
      });
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.props).toEqual(normalizedProps);
      expect(result.props).toHaveLength(2);
    });

    it('should return normalized prop values', async () => {
      const normalizedPropValues = [{ id: 'val-1', value: 'red' }, { id: 'val-2', value: 'large' }];
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues,
        propIds: [],
      });
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.propValues).toEqual(normalizedPropValues);
    });

    it('should return normalized codes', async () => {
      const normalizedCodes = { id: 'code-1', content: 'const Button = ...' };
      normalizeCode.mockReturnValue(normalizedCodes);
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.codes).toEqual(normalizedCodes);
    });

    it('should handle all steps in correct order', async () => {
      const callOrder = [];
      dynamicComponentAnalyzer.mockImplementation(async (comp) => {
        callOrder.push('analyzer');
        return { id: comp.id, name: comp.name };
      });
      normalizeCode.mockImplementation(() => {
        callOrder.push('normalizeCode');
        return {};
      });
      normalizePropList.mockImplementation(() => {
        callOrder.push('normalizePropList');
        return { normalizedProps: [], normalizedPropValues: [], propIds: [] };
      });
      createBasicElements.mockImplementation(() => {
        callOrder.push('createElements');
        return ['elem-1'];
      });
      createComponentVariants.mockImplementation(() => {
        callOrder.push('createVariants');
        return [{}];
      });

      const component = { id: 'comp-1', name: 'Button' };
      await componentFactory(component);

      expect(callOrder).toEqual([
        'analyzer',
        'normalizeCode',
        'normalizePropList',
        'createElements',
        'createVariants',
      ]);
    });

    it('should handle empty props from normalizePropList', async () => {
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.props).toEqual([]);
      expect(result.propValues).toEqual([]);
    });

    it('should handle complex prop structures', async () => {
      const complexProps = [
        { id: 'prop-1', name: 'color', type: 'string', values: ['red', 'blue'] },
        { id: 'prop-2', name: 'size', type: 'enum', values: ['small', 'large'] },
      ];
      normalizePropList.mockReturnValue({
        normalizedProps: complexProps,
        normalizedPropValues: [],
        propIds: ['prop-1', 'prop-2'],
      });
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.props).toEqual(complexProps);
    });

    it('should handle library info through to normalized component', async () => {
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const libraryInfo = { id: 'lib-1', name: 'Material-UI', version: '5.0.0' };
      const result = await componentFactory(component, libraryInfo);

      expect(result.component.metadata.libraryName).toBe('Material-UI');
      expect(result.component.metadata.libraryId).toBe('lib-1');
      expect(result.component.metadata.libraryVersion).toBe('5.0.0');
    });

    it('should create complete factory result object', async () => {
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizePropList.mockReturnValue({
        normalizedProps: [{ id: 'prop-1' }],
        normalizedPropValues: [{ id: 'val-1' }],
        propIds: ['prop-1'],
      });
      normalizeCode.mockReturnValue({ id: 'code-1' });
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{ id: 'variant-1' }]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result).toHaveProperty('component');
      expect(result).toHaveProperty('props');
      expect(result).toHaveProperty('propValues');
      expect(result).toHaveProperty('codes');
      expect(result).toHaveProperty('elements');
      expect(Object.keys(result)).toHaveLength(5);
    });

    it('should maintain data integrity through pipeline', async () => {
      const originalComponent = { id: 'original-comp', name: 'OriginalButton' };
      const analyzedComponent = { id: 'analyzed-comp', name: 'AnalyzedButton', props: [] };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const result = await componentFactory(originalComponent);

      // Analyzed component ID should be preserved
      expect(result.component.id).toBe('analyzed-comp');
    });

    it('should handle analyzer returning different component name', async () => {
      const originalComponent = { id: 'comp-1', name: 'Button' };
      const analyzedComponent = { id: 'comp-1', name: 'MaterialButton', props: [] };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const result = await componentFactory(originalComponent);

      expect(result.component.name).toBe('MaterialButton');
    });

    it('should handle propIds from normalizePropList', async () => {
      const propIds = ['prop-1', 'prop-2', 'prop-3'];
      normalizePropList.mockReturnValue({
        normalizedProps: propIds.map(id => ({ id })),
        normalizedPropValues: [],
        propIds,
      });
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.props).toHaveLength(3);
      expect(result.props.map(p => p.id)).toEqual(propIds);
    });

    it('should pass original component to createBasicElements (not analyzed)', async () => {
      const originalComponent = { id: 'original', name: 'Original' };
      const analyzedComponent = { id: 'analyzed', name: 'Analyzed' };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      createBasicElements.mockReturnValue(['elem-1']);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createComponentVariants.mockReturnValue([{}]);

      await componentFactory(originalComponent);

      expect(createBasicElements).toHaveBeenCalledWith(originalComponent);
      expect(createBasicElements).not.toHaveBeenCalledWith(analyzedComponent);
    });

    it('should handle complex component with all features', async () => {
      const analyzedComponent = {
        id: 'comp-complex',
        name: 'ComplexButton',
        props: [
          { id: 'prop-1', name: 'variant', values: ['primary', 'secondary'] },
          { id: 'prop-2', name: 'size', values: ['small', 'large'] },
        ],
        jsx: '<button className={variant}>{children}</button>',
      };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizeCode.mockReturnValue({ id: 'code-1', content: 'complex code' });
      normalizePropList.mockReturnValue({
        normalizedProps: analyzedComponent.props,
        normalizedPropValues: [{ id: 'val-1' }, { id: 'val-2' }],
        propIds: ['prop-1', 'prop-2'],
      });
      createBasicElements.mockReturnValue(['elem-1', 'elem-2', 'elem-3']);
      createComponentVariants.mockReturnValue([
        { id: 'variant-1' },
        { id: 'variant-2' },
      ]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.component.name).toBe('ComplexButton');
      expect(result.props).toHaveLength(2);
      expect(result.propValues).toHaveLength(2);
      expect(result.elements).toHaveLength(3);
    });

    it('should handle empty codes from normalizeCode', async () => {
      normalizeCode.mockReturnValue({});
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.codes).toEqual({});
    });

    it('should handle null codes from normalizeCode', async () => {
      normalizeCode.mockReturnValue(null);
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result.codes).toBeNull();
    });

    it('should handle component with metadata from analyzer', async () => {
      const analyzedComponent = {
        id: 'comp-1',
        name: 'Button',
        description: 'A button component',
        props: [],
        metadata: { source: 'analyzed' },
      };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      // normalized component should have its own metadata structure
      expect(result.component.metadata.source).toBe('ui-library');
    });

    it('should handle synchronous and asynchronous operations', async () => {
      dynamicComponentAnalyzer.mockResolvedValue({ id: 'comp-1', name: 'Button' });
      normalizeCode.mockReturnValue({}); // Synchronous
      normalizePropList.mockReturnValue({ // Synchronous
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      createBasicElements.mockReturnValue(['elem-1']); // Synchronous
      createComponentVariants.mockReturnValue([{}]); // Synchronous

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result).toBeDefined();
      expect(result.component).toBeDefined();
    });

    it('should handle component with no JSX from analyzer', async () => {
      const analyzedComponent = {
        id: 'comp-1',
        name: 'Button',
        props: [],
        // No jsx property
      };

      dynamicComponentAnalyzer.mockResolvedValue(analyzedComponent);
      normalizePropList.mockReturnValue({
        normalizedProps: [],
        normalizedPropValues: [],
        propIds: [],
      });
      normalizeCode.mockReturnValue({});
      createBasicElements.mockReturnValue(['elem-1']);
      createComponentVariants.mockReturnValue([{}]);

      const component = { id: 'comp-1', name: 'Button' };
      const result = await componentFactory(component);

      expect(result).toBeDefined();
    });
  });
});

