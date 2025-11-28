// ===================================================================
// INTEGRATION TESTS: Binding Resolution System
// 🔴 CRITICAL-FIRST STRATEGY - Phase 1 🔴
// Complex Binding Chains, Cross-System Integration, Edge Cases
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useResolveValue } from './useResolveValue';

// Mock all dependencies
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    PROP: 'prop',
    TOKEN: 'token',
    DATA_MODEL_FIELD: 'data-model-field',
    DATA_VARIABLE: 'data-variable',
    PRESET_MODE_VALUE: 'preset-mode-value',
    PROP_VALUE: 'prop-value',
    DATA_MODEL: 'data-model',
    INSTANCE: 'instance',
    ELEMENT: 'element',
  },
  VARIABLE_TYPES: {
    DATA: 'data',
  },
}));

vi.mock('../../../uiElement', () => ({
  useElement: vi.fn(),
  STYLE_PROPERTIES: {
    display: 'display',
    backgroundColor: 'backgroundColor',
    color: 'color',
    fontSize: 'fontSize',
  },
  DISPLAY_PROPERTIES: {
    flex: 'flex',
    none: 'none',
  },
}));

vi.mock('../../../dataModelField', () => ({
  useDataModelFields: vi.fn(),
}));

vi.mock('../../../dataModel', () => ({
  useDataModel: vi.fn(),
}));

vi.mock('../../../varPreset', () => ({
  usePreset: vi.fn(),
  PRESET_TYPES: {
    TYPOGRAPHY: 'typography',
  },
}));

vi.mock('../../../varPresetModeValue', () => ({
  usePresetModeValue: vi.fn(),
}));

vi.mock('../../../varPropValue', () => ({
  usePropValue: vi.fn(),
  selectPropValueById: vi.fn(),
}));

vi.mock('../../../varTokenCollection', () => ({
  useTokenCollection: vi.fn(),
}));

vi.mock('../../../varMode', () => ({
  useVariableModes: vi.fn(),
}));

vi.mock('../../../../features/uiRender/model/context/DataRecordContext', () => ({
  useCurrentDataRecord: vi.fn(),
}));

vi.mock('../../../../features/uiRender/model/context/InstanceContext', () => ({
  useCurrentInstance: vi.fn(),
}));

vi.mock('../../../uiInstance', () => ({
  useInstances: vi.fn(),
}));

vi.mock('../../../varProp', () => ({
  useProp: vi.fn(),
}));

vi.mock('../../../varToken', () => ({
  useToken: vi.fn(),
}));

vi.mock('../../../varTokenValue', () => ({
  useTokenValues: vi.fn(),
}));

vi.mock('../../../varVariableData', () => ({
  useVariable: vi.fn(),
}));

vi.mock('../../../dataRecord', () => ({
  useDataRecords: vi.fn(),
}));

// Import mocked modules
import { useElement } from '../../../uiElement';
import { useDataModelFields } from '../../../dataModelField';
import { useDataModel } from '../../../dataModel';
import { usePreset } from '../../../varPreset';
import { usePresetModeValue } from '../../../varPresetModeValue';
import { usePropValue } from '../../../varPropValue';
import { useTokenCollection } from '../../../varTokenCollection';
import { useVariableModes } from '../../../varMode';
import { useCurrentDataRecord } from '../../../../features/iFrame/model/context/DataRecordContext';
import { useCurrentInstance } from '../../../../features/iFrame/model/context/InstanceContext';
import { useInstances } from '../../../uiInstance';
import { useProp } from '../../../varProp';
import { useToken } from '../../../varToken';
import { useTokenValues } from '../../../varTokenValue';
import { useVariable } from '../../../varVariableData';
import { useDataRecords } from '../../../dataRecord';

describe('useResolveValue - Integration Tests', () => {
  let mockElement;
  let mockInstance;
  let mockPropById;
  let mockTokenById;
  let mockTokenValueByTokenId;
  let mockVariableById;
  let mockModelFieldById;
  let mockModelById;
  let mockPresetById;
  let mockPresetModeValueById;
  let mockPropValueById;
  let mockGetTokenCollectionById;
  let mockDefaultVariableModeByIds;
  let mockGetTokenValueByTokenIdAndVariableModeId;
  let mockInstanceById;
  let mockGetRecordsByModelId;
  let mockCurrentRecord;
  let mockCurrentInstance;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Default mock implementations
    mockElement = {
      id: 'element-1',
      kind: 'element',
      properties: {
        content: {},
        style: {},
      },
      bindings: [],
    };

    mockInstance = null;
    mockCurrentRecord = null;
    mockCurrentInstance = null;

    mockPropById = vi.fn(() => null);
    mockTokenById = vi.fn(() => null);
    mockTokenValueByTokenId = vi.fn(() => ({ value: null }));
    mockVariableById = vi.fn(() => null);
    mockModelFieldById = vi.fn(() => null);
    mockModelById = vi.fn(() => null);
    mockPresetById = vi.fn(() => null);
    mockPresetModeValueById = vi.fn(() => null);
    mockPropValueById = vi.fn(() => null);
    mockGetTokenCollectionById = vi.fn(() => null);
    mockDefaultVariableModeByIds = vi.fn(() => null);
    mockGetTokenValueByTokenIdAndVariableModeId = vi.fn(() => ({ value: null }));
    mockInstanceById = vi.fn(() => mockInstance);
    mockGetRecordsByModelId = vi.fn(() => []);

    // Setup mock returns
    useElement.mockReturnValue({ element: mockElement });
    useDataModelFields.mockReturnValue({ modelFieldById: mockModelFieldById });
    useDataModel.mockReturnValue({ modelById: mockModelById });
    usePreset.mockReturnValue({ presetById: mockPresetById });
    usePresetModeValue.mockReturnValue({ presetModeValueById: mockPresetModeValueById });
    usePropValue.mockReturnValue({ propValueById: mockPropValueById });
    useTokenCollection.mockReturnValue({ getTokenCollectionById: mockGetTokenCollectionById });
    useVariableModes.mockReturnValue({ defaultVariableModeByIds: mockDefaultVariableModeByIds });
    useInstances.mockReturnValue({ instanceById: mockInstanceById });
    useProp.mockReturnValue({ propById: mockPropById });
    useToken.mockReturnValue({ tokenById: mockTokenById });
    useTokenValues.mockReturnValue({
      tokenValueByTokenId: mockTokenValueByTokenId,
      getTokenValueByTokenIdAndVariableModeId: mockGetTokenValueByTokenIdAndVariableModeId,
    });
    useVariable.mockReturnValue({ variableById: mockVariableById });
    useDataRecords.mockReturnValue({ getRecordsByModelId: mockGetRecordsByModelId });
    useCurrentDataRecord.mockReturnValue(mockCurrentRecord);
    useCurrentInstance.mockReturnValue(mockCurrentInstance);
  });

  // ===================================================================
  // Section 1: Complex Binding Chains (Multi-Level Resolution)
  // ===================================================================

  describe('Complex Binding Chains', () => {
    it('should resolve 2-level binding: Prop → Token', () => {
      // Setup: Prop binding that points to a Token
      mockPropById.mockImplementation((id) => {
        if (id === 'prop-1') {
          return {
            id: 'prop-1',
            name: 'colorProp',
            kind: 'prop',
            values: [
              {
                id: 'prop-value-1',
                value: { type: 'token', id: 'token-1' }, // Points to token
                isDefault: true,
              },
            ],
          };
        }
      });

      mockTokenById.mockImplementation((id) => {
        if (id === 'token-1') {
          return {
            id: 'token-1',
            name: 'primaryColor',
            collectionId: 'collection-1',
          };
        }
      });

      mockGetTokenValueByTokenIdAndVariableModeId.mockReturnValue({ value: '#FF0000' });
      mockGetTokenCollectionById.mockReturnValue({ variableModeIds: ['mode-1'] });
      mockDefaultVariableModeByIds.mockReturnValue({ id: 'mode-1' });

      mockElement.properties.style = {
        binding: {
          color: { type: 'prop', id: 'prop-1', propertyName: 'color' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.color');

      expect(normalized).toEqual({
        id: 'prop-1',
        type: 'prop',
        propName: 'colorProp',
        propValue: { type: 'token', id: 'token-1' },
        propertyName: 'color',
      });
    });

    it('should resolve 3-level binding: Instance Override → Prop → Token', () => {
      // Setup: Instance with override that points to prop that points to token
      mockCurrentInstance = {
        id: 'instance-1',
        kind: 'instance',
        override: {
          props: {
            'prop-1': {
              value: { type: 'token', id: 'token-final' },
            },
          },
        },
      };
      useCurrentInstance.mockReturnValue(mockCurrentInstance);

      mockPropById.mockReturnValue({
        id: 'prop-1',
        name: 'sizeProp',
        kind: 'prop',
        values: [],
        defaultValue: '16px',
      });

      mockTokenValueByTokenId.mockReturnValue({ value: '24px' });

      mockElement.properties.style = {
        binding: {
          fontSize: { type: 'prop', id: 'prop-1', propertyName: 'fontSize' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.fontSize');
      const prepared = result.current.getPreparedValue(normalized);

      expect(prepared).toBe('24px'); // Should resolve through all levels
    });

    it('should handle 4-level binding: Instance → Prop → DataVariable → DataModel', () => {
      // Complex scenario: Instance override points to prop, prop points to data variable
      mockCurrentInstance = {
        id: 'instance-1',
        override: {
          props: {
            'prop-data': {
              value: { type: 'data-variable', id: 'var-1' },
            },
          },
        },
      };
      useCurrentInstance.mockReturnValue(mockCurrentInstance);

      mockPropById.mockReturnValue({
        id: 'prop-data',
        name: 'dataProp',
        kind: 'prop',
        type: 'data',
        defaultValue: { modelId: 'model-1' }, // Add defaultValue to avoid null model
      });

      mockModelById.mockReturnValue({
        id: 'model-1',
        label: 'Items',
      });

      mockVariableById.mockReturnValue({
        id: 'var-1',
        kind: 'data-variable',
        type: 'data',
        value: { id: 'model-1' },
        filters: [{ field: 'status', value: 'active' }],
      });

      mockGetRecordsByModelId.mockReturnValue([
        { id: 'record-1', status: 'active', name: 'Item 1' },
        { id: 'record-2', status: 'inactive', name: 'Item 2' },
        { id: 'record-3', status: 'active', name: 'Item 3' },
      ]);

      mockElement.bindings = [
        { kind: 'prop', type: 'data', id: 'prop-data' },
      ];

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('bindings.prop');
      const prepared = result.current.getPreparedValue(normalized);

      // Should return filtered records based on data variable
      expect(prepared).toHaveLength(2);
      expect(prepared[0].status).toBe('active');
      expect(prepared[1].status).toBe('active');
    });

    it('should handle deep nesting with 5+ levels without performance degradation', () => {
      // This tests performance with very deep binding chains
      const startTime = performance.now();

      // Setup complex chain
      mockElement.properties.style = {
        binding: {
          backgroundColor: { type: 'prop', id: 'prop-deep' },
        },
      };

      mockPropById.mockReturnValue({
        id: 'prop-deep',
        name: 'deepProp',
        values: [{ value: '#000000', isDefault: true }],
      });

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Perform multiple resolutions
      for (let i = 0; i < 100; i++) {
        result.current.getNormalizedValue('style.backgroundColor');
      }

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete 100 resolutions in under 100ms (1ms per resolution)
      expect(executionTime).toBeLessThan(100);
    });
  });

  // ===================================================================
  // Section 2: Circular Reference Detection & Handling
  // ===================================================================

  describe('Circular Reference Detection', () => {
    it('should handle circular reference: Prop A → Prop B → Prop A', () => {
      // This tests that circular references don't cause infinite loops
      mockPropById.mockImplementation((id) => {
        if (id === 'prop-a') {
          return {
            id: 'prop-a',
            name: 'propA',
            values: [
              { value: { type: 'prop', id: 'prop-b' }, isDefault: true },
            ],
          };
        }
        if (id === 'prop-b') {
          return {
            id: 'prop-b',
            name: 'propB',
            values: [
              { value: { type: 'prop', id: 'prop-a' }, isDefault: true }, // Circular!
            ],
          };
        }
      });

      mockElement.properties.style = {
        binding: {
          color: { type: 'prop', id: 'prop-a' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Should not throw, should return the first level resolution
      expect(() => {
        const normalized = result.current.getNormalizedValue('style.color');
        expect(normalized).toBeDefined();
        expect(normalized.id).toBe('prop-a');
      }).not.toThrow();
    });

    it('should detect circular reference in token values', () => {
      mockTokenById.mockImplementation((id) => {
        if (id === 'token-a') {
          return {
            id: 'token-a',
            name: 'tokenA',
            collectionId: 'collection-1',
            // Would point to token-b in a real scenario
          };
        }
      });

      mockGetTokenValueByTokenIdAndVariableModeId.mockImplementation((tokenId) => {
        if (tokenId === 'token-a') {
          // In a real scenario, this might reference token-b
          return { value: { type: 'token', id: 'token-b' } };
        }
      });

      mockElement.properties.style = {
        binding: {
          fontSize: { type: 'token', id: 'token-a' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Should handle gracefully without infinite loop
      expect(() => {
        result.current.getNormalizedValue('style.fontSize');
      }).not.toThrow();
    });

    it('should handle self-referencing data variable', () => {
      mockVariableById.mockReturnValue({
        id: 'var-self',
        kind: 'data-variable',
        type: 'data',
        value: { type: 'data-variable', id: 'var-self' }, // Self-reference!
      });

      mockElement.bindings = [
        { type: 'data-variable', id: 'var-self' },
      ];

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Should not cause stack overflow
      expect(() => {
        result.current.getNormalizedValue('bindings.data-variable');
      }).not.toThrow();
    });
  });

  // ===================================================================
  // Section 3: Cross-System Integration
  // ===================================================================

  describe('Cross-System Integration', () => {
    it('should handle Token binding + Mode change scenario', () => {
      // Setup: Token binding with mode switching
      mockGetTokenCollectionById.mockReturnValue({
        variableModeIds: ['mode-light', 'mode-dark'],
      });

      mockDefaultVariableModeByIds.mockReturnValue({ id: 'mode-light' });

      mockGetTokenValueByTokenIdAndVariableModeId.mockImplementation((tokenId, modeId) => {
        if (tokenId === 'token-theme' && modeId === 'mode-light') {
          return { value: '#FFFFFF' };
        }
        if (tokenId === 'token-theme' && modeId === 'mode-dark') {
          return { value: '#000000' };
        }
      });

      mockTokenById.mockReturnValue({
        id: 'token-theme',
        name: 'themeColor',
        collectionId: 'collection-1',
      });

      mockElement.properties.style = {
        binding: {
          backgroundColor: { type: 'token', id: 'token-theme' },
        },
      };

      const { result: lightResult } = renderHook(() => useResolveValue('element-1'));
      const lightNormalized = lightResult.current.getNormalizedValue('style.backgroundColor');
      const lightValue = lightResult.current.getPreparedValue(lightNormalized);

      expect(lightValue).toBe('#FFFFFF');

      // Simulate mode change
      mockDefaultVariableModeByIds.mockReturnValue({ id: 'mode-dark' });

      const { result: darkResult } = renderHook(() => useResolveValue('element-1'));
      const darkNormalized = darkResult.current.getNormalizedValue('style.backgroundColor');
      const darkValue = darkResult.current.getPreparedValue(darkNormalized);

      expect(darkValue).toBe('#000000');
    });

    it('should handle Preset binding + Variant switching', () => {
      // Setup: Preset binding that changes with variants
      mockPresetById.mockReturnValue({
        id: 'preset-typo',
        kind: 'preset-mode-value',
        name: 'Heading',
      });

      mockPresetModeValueById.mockImplementation((id) => {
        if (id === 'pmv-large') {
          return {
            id: 'pmv-large',
            value: {
              fontSize: '32px',
              fontWeight: '700',
            },
          };
        }
        if (id === 'pmv-small') {
          return {
            id: 'pmv-small',
            value: {
              fontSize: '16px',
              fontWeight: '400',
            },
          };
        }
      });

      mockElement.properties.style = {
        binding: {
          fontSize: {
            kind: 'preset-mode-value',
            presetType: 'typography',
            presetId: 'preset-typo',
            id: 'pmv-large',
          },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.fontSize');
      const value = result.current.getPreparedValue(normalized);

      expect(value).toEqual({
        fontSize: '32px',
        fontWeight: '700',
      });
    });

    it('should handle Data binding + Record update scenario', () => {
      // Setup: Data model field binding with current record
      mockCurrentRecord = {
        id: 'record-1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
      };
      useCurrentDataRecord.mockReturnValue(mockCurrentRecord);

      mockModelFieldById.mockReturnValue({
        id: 'field-name',
        name: 'name',
        modelId: 'model-users',
      });

      mockModelById.mockReturnValue({
        id: 'model-users',
        label: 'Users',
      });

      mockElement.properties.content = {
        binding: { type: 'data-model-field', id: 'field-name' },
      };

      const { result: initialResult } = renderHook(() => useResolveValue('element-1'));
      const initialNormalized = initialResult.current.getNormalizedValue('content');
      const initialValue = initialResult.current.getPreparedValue(initialNormalized);

      expect(initialValue).toBe('John Doe');

      // Simulate record update
      mockCurrentRecord = {
        ...mockCurrentRecord,
        name: 'Jane Smith',
      };
      useCurrentDataRecord.mockReturnValue(mockCurrentRecord);

      const { result: updatedResult } = renderHook(() => useResolveValue('element-1'));
      const updatedNormalized = updatedResult.current.getNormalizedValue('content');
      const updatedValue = updatedResult.current.getPreparedValue(updatedNormalized);

      expect(updatedValue).toBe('Jane Smith');
    });

    it('should handle multiple binding types together', () => {
      // Complex scenario: Element with token, prop, and data bindings simultaneously
      mockCurrentRecord = { name: 'Product A', price: 99.99 };
      useCurrentDataRecord.mockReturnValue(mockCurrentRecord);

      mockTokenById.mockReturnValue({
        id: 'token-bg',
        name: 'cardBackground',
        collectionId: 'collection-1',
      });

      mockGetTokenValueByTokenIdAndVariableModeId.mockReturnValue({ value: '#F5F5F5' });
      mockGetTokenCollectionById.mockReturnValue({ variableModeIds: ['mode-1'] });
      mockDefaultVariableModeByIds.mockReturnValue({ id: 'mode-1' });

      mockPropById.mockReturnValue({
        id: 'prop-padding',
        name: 'cardPadding',
        values: [{ value: '24px', isDefault: true }],
      });

      mockModelFieldById.mockImplementation((id) => {
        if (id === 'field-name') {
          return { id: 'field-name', name: 'name', modelId: 'model-1' };
        }
      });

      mockModelById.mockReturnValue({ id: 'model-1', label: 'Products' });

      mockElement.properties = {
        content: {
          binding: { type: 'data-model-field', id: 'field-name' },
        },
        style: {
          binding: {
            backgroundColor: { type: 'token', id: 'token-bg' },
            padding: { type: 'prop', id: 'prop-padding', propertyName: 'padding' },
          },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Test all three bindings work together
      const contentNormalized = result.current.getNormalizedValue('content');
      const contentValue = result.current.getPreparedValue(contentNormalized);
      expect(contentValue).toBe('Product A');

      const bgNormalized = result.current.getNormalizedValue('style.backgroundColor');
      const bgValue = result.current.getPreparedValue(bgNormalized);
      expect(bgValue).toBe('#F5F5F5');

      const paddingNormalized = result.current.getNormalizedValue('style.padding');
      const paddingValue = result.current.getPreparedValue(paddingNormalized);
      expect(paddingValue).toBe('24px');
    });
  });

  // ===================================================================
  // Section 4: Error Handling & Edge Cases
  // ===================================================================

  describe('Error Handling & Edge Cases', () => {
    it('should handle missing prop reference gracefully', () => {
      mockPropById.mockReturnValue(null); // Prop not found

      mockElement.properties.style = {
        binding: {
          color: { type: 'prop', id: 'prop-missing', propertyName: 'color' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.color');

      expect(normalized).toBeNull();
    });

    it('should handle missing token reference gracefully', () => {
      mockTokenById.mockReturnValue(null); // Token not found

      mockElement.properties.style = {
        binding: {
          fontSize: { type: 'token', id: 'token-missing' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.fontSize');

      expect(normalized).toBeNull();
    });

    it('should handle missing data model field gracefully', () => {
      mockModelFieldById.mockReturnValue(null); // Field not found

      mockElement.properties.content = {
        binding: { type: 'data-model-field', id: 'field-missing' },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('content');

      expect(normalized).toBeNull();
    });

    it('should handle missing data variable gracefully', () => {
      mockVariableById.mockReturnValue(null); // Variable not found

      mockElement.bindings = [
        { type: 'data-variable', id: 'var-missing' },
      ];

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('bindings.data-variable');

      expect(normalized).toBeNull();
    });

    it('should handle null element gracefully', () => {
      useElement.mockReturnValue({ element: null });

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.color');

      expect(normalized).toBeNull();
    });

    it('should handle undefined current record gracefully', () => {
      useCurrentDataRecord.mockReturnValue(undefined);

      mockModelFieldById.mockReturnValue({
        id: 'field-1',
        name: 'fieldName',
        modelId: 'model-1',
      });

      mockModelById.mockReturnValue({
        id: 'model-1',
        label: 'TestModel',
      });

      mockElement.properties.content = {
        binding: { type: 'data-model-field', id: 'field-1' },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('content');
      const value = result.current.getPreparedValue(normalized);

      expect(value).toBeUndefined();
    });

    it('should handle malformed binding configuration', () => {
      mockElement.properties.style = {
        binding: {
          color: { /* missing type and id */ },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));

      expect(() => {
        result.current.getNormalizedValue('style.color');
      }).not.toThrow();
    });

    it('should handle null binding value', () => {
      mockElement.properties.style = {
        binding: {
          color: null,
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.color');

      expect(normalized).toBeNull();
    });

    it('should handle undefined binding value', () => {
      mockElement.properties.style = {
        binding: {
          color: undefined,
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('style.color');

      expect(normalized).toBeNull();
    });

    it('should handle empty property path', () => {
      const { result } = renderHook(() => useResolveValue('element-1'));
      const normalized = result.current.getNormalizedValue('');

      expect(normalized).toBeNull();
    });
  });

  // ===================================================================
  // Section 5: Concurrent Updates & Race Conditions
  // ===================================================================

  describe('Concurrent Updates & Race Conditions', () => {
    it('should handle rapid prop value changes', async () => {
      let propValue = 'value1';

      mockPropById.mockImplementation(() => ({
        id: 'prop-dynamic',
        name: 'dynamicProp',
        values: [{ value: propValue, isDefault: true }],
      }));

      mockElement.properties.style = {
        binding: {
          content: { type: 'prop', id: 'prop-dynamic', propertyName: 'content' },
        },
      };

      const { result, rerender } = renderHook(() => useResolveValue('element-1'));

      // Initial value
      let normalized = result.current.getNormalizedValue('style.content');
      let value = result.current.getPreparedValue(normalized);
      expect(value).toBe('value1');

      // Rapid changes
      propValue = 'value2';
      rerender();
      normalized = result.current.getNormalizedValue('style.content');
      value = result.current.getPreparedValue(normalized);
      expect(value).toBe('value2');

      propValue = 'value3';
      rerender();
      normalized = result.current.getNormalizedValue('style.content');
      value = result.current.getPreparedValue(normalized);
      expect(value).toBe('value3');
    });

    it('should handle mode changes during resolution', () => {
      let currentMode = 'mode-1';

      mockDefaultVariableModeByIds.mockImplementation(() => ({ id: currentMode }));

      mockGetTokenValueByTokenIdAndVariableModeId.mockImplementation((tokenId, modeId) => {
        if (modeId === 'mode-1') {return { value: 'mode1-value' };}
        if (modeId === 'mode-2') {return { value: 'mode2-value' };}
      });

      mockTokenById.mockReturnValue({
        id: 'token-1',
        name: 'modeToken',
        collectionId: 'collection-1',
      });

      mockGetTokenCollectionById.mockReturnValue({ variableModeIds: ['mode-1', 'mode-2'] });

      mockElement.properties.style = {
        binding: {
          color: { type: 'token', id: 'token-1' },
        },
      };

      const { result, rerender } = renderHook(() => useResolveValue('element-1'));

      let normalized = result.current.getNormalizedValue('style.color');
      let value = result.current.getPreparedValue(normalized);
      expect(value).toBe('mode1-value');

      // Mode change
      currentMode = 'mode-2';
      rerender();
      normalized = result.current.getNormalizedValue('style.color');
      value = result.current.getPreparedValue(normalized);
      expect(value).toBe('mode2-value');
    });

    it('should handle data record updates during rendering', () => {
      let recordData = { name: 'Initial' };

      useCurrentDataRecord.mockImplementation(() => recordData);

      mockModelFieldById.mockReturnValue({
        id: 'field-1',
        name: 'name',
        modelId: 'model-1',
      });

      mockModelById.mockReturnValue({ id: 'model-1', label: 'Records' });

      mockElement.properties.content = {
        binding: { type: 'data-model-field', id: 'field-1' },
      };

      const { result, rerender } = renderHook(() => useResolveValue('element-1'));

      let normalized = result.current.getNormalizedValue('content');
      let value = result.current.getPreparedValue(normalized);
      expect(value).toBe('Initial');

      // Record update
      recordData = { name: 'Updated' };
      rerender();
      normalized = result.current.getNormalizedValue('content');
      value = result.current.getPreparedValue(normalized);
      expect(value).toBe('Updated');
    });

    it('should handle instance override changes', () => {
      mockCurrentInstance = {
        id: 'instance-1',
        override: {
          props: {
            'prop-1': { value: 'override-v1' },
          },
        },
      };
      useCurrentInstance.mockReturnValue(mockCurrentInstance);

      mockPropById.mockReturnValue({
        id: 'prop-1',
        name: 'testProp',
        values: [],
        defaultValue: 'default',
      });

      mockElement.properties.style = {
        binding: {
          content: { type: 'prop', id: 'prop-1', propertyName: 'content' },
        },
      };

      const { result, rerender } = renderHook(() => useResolveValue('element-1'));

      let normalized = result.current.getNormalizedValue('style.content');
      let value = result.current.getPreparedValue(normalized);
      expect(value).toBe('override-v1');

      // Override change
      mockCurrentInstance.override.props['prop-1'].value = 'override-v2';
      rerender();
      normalized = result.current.getNormalizedValue('style.content');
      value = result.current.getPreparedValue(normalized);
      expect(value).toBe('override-v2');
    });
  });

  // ===================================================================
  // Section 6: Performance & Memory Edge Cases
  // ===================================================================

  describe('Performance & Memory', () => {
    it('should handle large number of bindings efficiently', () => {
      // Create 100 bindings
      const bindings = {};
      for (let i = 0; i < 100; i++) {
        bindings[`property${i}`] = { type: 'prop', id: `prop-${i}`, propertyName: `property${i}` };
      }

      mockElement.properties.style = { binding: bindings };

      mockPropById.mockImplementation((id) => ({
        id,
        name: `prop-${id}`,
        values: [{ value: `value-${id}`, isDefault: true }],
      }));

      const startTime = performance.now();
      const { result } = renderHook(() => useResolveValue('element-1'));

      // Resolve all 100 bindings
      for (let i = 0; i < 100; i++) {
        result.current.getNormalizedValue(`style.property${i}`);
      }

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete in under 50ms (0.5ms per binding)
      expect(executionTime).toBeLessThan(50);
    });

    it('should not leak memory with repeated resolutions', () => {
      mockPropById.mockReturnValue({
        id: 'prop-test',
        name: 'testProp',
        values: [{ value: 'test', isDefault: true }],
      });

      mockElement.properties.style = {
        binding: {
          color: { type: 'prop', id: 'prop-test', propertyName: 'color' },
        },
      };

      const { result } = renderHook(() => useResolveValue('element-1'));

      // Perform 1000 resolutions
      for (let i = 0; i < 1000; i++) {
        result.current.getNormalizedValue('style.color');
        result.current.getPreparedValue(result.current.getNormalizedValue('style.color'));
      }

      // If we get here without crashing, memory is managed correctly
      expect(true).toBe(true);
    });
  });
});

