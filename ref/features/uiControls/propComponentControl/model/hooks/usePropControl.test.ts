/**
 * Unit Tests for usePropControl Hook
 *
 * Phase 5 - Week 2 Day 2: Prop Control Tests
 *
 * Purpose: Test component prop management (CRUD operations)
 * Coverage Target: 90%+ for usePropControl hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Prop Name Updates (10 tests)
 * 2. Prop Type Updates (10 tests)
 * 3. Prop Default Value Updates (10 tests)
 * 4. Prop Value Operations (15 tests)
 * 5. Prop Deletion (5 tests)
 *
 * Total: 50 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePropControl } from './usePropControl';

// Mock dependencies
vi.mock('../../../../../entities/uiComponent', () => ({
  useComponents: vi.fn(),
}));

vi.mock('../../../../../entities/varProp', () => ({
  usePropMutation: vi.fn(),
}));

vi.mock('../../../../../entities/varPropValue', () => ({
  usePropValueMutation: vi.fn(),
}));

import { useComponents } from '../../../../../entities/uiComponent';
import { usePropMutation } from '../../../../../entities/varProp';
import { usePropValueMutation } from '../../../../../entities/varPropValue';

describe('usePropControl Hook', () => {
  let mockUpdateProp: ReturnType<typeof vi.fn>;
  let mockDeleteProp: ReturnType<typeof vi.fn>;
  let mockUpdatePropValue: ReturnType<typeof vi.fn>;
  let mockAddPropValue: ReturnType<typeof vi.fn>;
  let mockSelectedComponent: any;

  beforeEach(() => {
    // Suppress console.log in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});

    mockUpdateProp = vi.fn();
    mockDeleteProp = vi.fn();
    mockUpdatePropValue = vi.fn();
    mockAddPropValue = vi.fn();
    mockSelectedComponent = {
      id: 'component-1',
      name: 'TestComponent',
      props: [
        { id: 'prop-1', name: 'title', type: 'string', defaultValue: 'Hello' },
        { id: 'prop-2', name: 'count', type: 'number', defaultValue: 0 },
      ],
    };

    (usePropMutation as ReturnType<typeof vi.fn>).mockReturnValue({
      updateProp: mockUpdateProp,
      deleteProp: mockDeleteProp,
    });

    (usePropValueMutation as ReturnType<typeof vi.fn>).mockReturnValue({
      updatePropValue: mockUpdatePropValue,
      addPropValue: mockAddPropValue,
    });

    (useComponents as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedComponent: mockSelectedComponent,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: PROP NAME UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Prop Name Updates', () => {
    it('should update prop name', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'newTitle');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'newTitle' });
    });

    it('should update prop name with camelCase', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'myCustomProp');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'myCustomProp' });
    });

    it('should update prop name with snake_case', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'my_custom_prop');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'my_custom_prop' });
    });

    it('should update prop name with kebab-case', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'my-custom-prop');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'my-custom-prop' });
    });

    it('should update prop name with empty string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', '');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: '' });
    });

    it('should update prop name with special characters', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'prop$Name@123');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'prop$Name@123' });
    });

    it('should update prop name with very long string', () => {
      const longName = 'a'.repeat(1000);
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', longName);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: longName });
    });

    it('should update prop name for different prop ID', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-2', 'newCount');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-2', { name: 'newCount' });
    });

    it('should handle multiple prop name updates', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'name1');
      });

      act(() => {
        result.current.updatePropName('prop-2', 'name2');
      });

      expect(mockUpdateProp).toHaveBeenCalledTimes(2);
      expect(mockUpdateProp).toHaveBeenNthCalledWith(1, 'prop-1', { name: 'name1' });
      expect(mockUpdateProp).toHaveBeenNthCalledWith(2, 'prop-2', { name: 'name2' });
    });

    it('should update prop name with Unicode characters', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropName('prop-1', 'пропerty');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { name: 'пропerty' });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: PROP TYPE UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Prop Type Updates', () => {
    it('should update prop type to string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'string');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'string' });
    });

    it('should update prop type to number', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'number');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'number' });
    });

    it('should update prop type to boolean', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'boolean');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'boolean' });
    });

    it('should update prop type to object', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'object');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'object' });
    });

    it('should update prop type to array', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'array');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'array' });
    });

    it('should update prop type to function', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'function');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'function' });
    });

    it('should update prop type to custom type', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'CustomType');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: 'CustomType' });
    });

    it('should update prop type for different prop ID', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-2', 'string');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-2', { type: 'string' });
    });

    it('should handle multiple prop type updates', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', 'number');
      });

      act(() => {
        result.current.updatePropType('prop-2', 'boolean');
      });

      expect(mockUpdateProp).toHaveBeenCalledTimes(2);
      expect(mockUpdateProp).toHaveBeenNthCalledWith(1, 'prop-1', { type: 'number' });
      expect(mockUpdateProp).toHaveBeenNthCalledWith(2, 'prop-2', { type: 'boolean' });
    });

    it('should update prop type with empty string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropType('prop-1', '');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { type: '' });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: PROP DEFAULT VALUE UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Prop Default Value Updates', () => {
    it('should update prop default value with string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', 'New Default');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: 'New Default' });
    });

    it('should update prop default value with number', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-2', 42);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-2', { defaultValue: 42 });
    });

    it('should update prop default value with boolean', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', true);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: true });
    });

    it('should update prop default value with null', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', null);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: null });
    });

    it('should update prop default value with undefined', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', undefined);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: undefined });
    });

    it('should update prop default value with object', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', { key: 'value' });
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: { key: 'value' } });
    });

    it('should update prop default value with array', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', [1, 2, 3]);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: [1, 2, 3] });
    });

    it('should update prop default value with empty string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', '');
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-1', { defaultValue: '' });
    });

    it('should update prop default value with zero', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-2', 0);
      });

      expect(mockUpdateProp).toHaveBeenCalledWith('prop-2', { defaultValue: 0 });
    });

    it('should handle multiple default value updates', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropDefaultValue('prop-1', 'value1');
      });

      act(() => {
        result.current.updatePropDefaultValue('prop-2', 100);
      });

      expect(mockUpdateProp).toHaveBeenCalledTimes(2);
      expect(mockUpdateProp).toHaveBeenNthCalledWith(1, 'prop-1', { defaultValue: 'value1' });
      expect(mockUpdateProp).toHaveBeenNthCalledWith(2, 'prop-2', { defaultValue: 100 });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: PROP VALUE OPERATIONS (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Prop Value Operations', () => {
    it('should update prop value name', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValueName('value-1', 'prop-1', 'New Value Name');
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { name: 'New Value Name' });
    });

    it('should update prop value', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', 'New Value');
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: 'New Value' });
    });

    it('should update prop value with number', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-2', 999);
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-2', { value: 999 });
    });

    it('should update prop value with boolean', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', false);
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: false });
    });

    it('should update prop value with object', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', { nested: 'value' });
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: { nested: 'value' } });
    });

    it('should update prop value with array', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', ['a', 'b', 'c']);
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: ['a', 'b', 'c'] });
    });

    it('should update prop value with null', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', null);
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: null });
    });

    it('should add prop value with string type', () => {
      const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.addPropValue('prop-1', 'string', mockEvent as any);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockAddPropValue).toHaveBeenCalledWith('prop-1', 'string');
    });

    it('should add prop value with number type', () => {
      const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.addPropValue('prop-2', 'number', mockEvent as any);
      });

      expect(mockAddPropValue).toHaveBeenCalledWith('prop-2', 'number');
    });

    it('should add prop value with boolean type', () => {
      const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.addPropValue('prop-1', 'boolean', mockEvent as any);
      });

      expect(mockAddPropValue).toHaveBeenCalledWith('prop-1', 'boolean');
    });

    it('should handle multiple prop value updates', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', 'val1');
      });

      act(() => {
        result.current.updatePropValue('value-2', 'prop-2', 'val2');
      });

      expect(mockUpdatePropValue).toHaveBeenCalledTimes(2);
    });

    it('should update prop value name with empty string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValueName('value-1', 'prop-1', '');
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { name: '' });
    });

    it('should update prop value with empty string', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', '');
      });

      expect(mockUpdatePropValue).toHaveBeenCalledWith('value-1', 'prop-1', { value: '' });
    });

    it('should handle concurrent prop value operations', () => {
      const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.updatePropValue('value-1', 'prop-1', 'test');
        result.current.updatePropValueName('value-2', 'prop-2', 'name');
        result.current.addPropValue('prop-3', 'string', mockEvent as any);
      });

      expect(mockUpdatePropValue).toHaveBeenCalledTimes(2);
      expect(mockAddPropValue).toHaveBeenCalledTimes(1);
    });

    it('should prevent event propagation when adding prop value', () => {
      const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.addPropValue('prop-1', 'string', mockEvent as any);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 5: PROP DELETION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Prop Deletion', () => {
    it('should delete prop', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.deleteProp('prop-1');
      });

      expect(mockDeleteProp).toHaveBeenCalledWith('prop-1');
    });

    it('should delete different prop', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.deleteProp('prop-2');
      });

      expect(mockDeleteProp).toHaveBeenCalledWith('prop-2');
    });

    it('should handle multiple prop deletions', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.deleteProp('prop-1');
      });

      act(() => {
        result.current.deleteProp('prop-2');
      });

      expect(mockDeleteProp).toHaveBeenCalledTimes(2);
      expect(mockDeleteProp).toHaveBeenNthCalledWith(1, 'prop-1');
      expect(mockDeleteProp).toHaveBeenNthCalledWith(2, 'prop-2');
    });

    it('should delete prop with empty string ID', () => {
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.deleteProp('');
      });

      expect(mockDeleteProp).toHaveBeenCalledWith('');
    });

    it('should delete prop with very long ID', () => {
      const longId = 'prop-' + 'x'.repeat(1000);
      const { result } = renderHook(() => usePropControl());

      act(() => {
        result.current.deleteProp(longId);
      });

      expect(mockDeleteProp).toHaveBeenCalledWith(longId);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // ADDITIONAL: SELECTED COMPONENT (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Selected Component', () => {
    it('should return selected component', () => {
      const { result } = renderHook(() => usePropControl());

      expect(result.current.selectedComponent).toEqual(mockSelectedComponent);
    });

    it('should return selected component with props', () => {
      const { result } = renderHook(() => usePropControl());

      expect(result.current.selectedComponent.props).toHaveLength(2);
    });

    it('should handle null selected component', () => {
      (useComponents as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedComponent: null,
      });

      const { result } = renderHook(() => usePropControl());

      expect(result.current.selectedComponent).toBeNull();
    });

    it('should handle undefined selected component', () => {
      (useComponents as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedComponent: undefined,
      });

      const { result } = renderHook(() => usePropControl());

      expect(result.current.selectedComponent).toBeUndefined();
    });

    it('should update when selected component changes', () => {
      const { result, rerender } = renderHook(() => usePropControl());

      expect(result.current.selectedComponent.id).toBe('component-1');

      mockSelectedComponent = { id: 'component-2', name: 'NewComponent', props: [] };
      (useComponents as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedComponent: mockSelectedComponent,
      });

      rerender();

      expect(result.current.selectedComponent.id).toBe('component-2');
    });
  });
});

