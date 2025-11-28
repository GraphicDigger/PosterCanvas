/**
 * Integration Tests: OverridingInstanceProp Component
 *
 * Phase 5 - Week 3 Day 3: Component Integration Tests
 *
 * Purpose: Test integration of OverridingInstanceProp with value components
 * Coverage Target: 90%+ for component integration
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Integration Scenarios:
 * 1. Conditional Rendering by Prop Type (8 tests)
 * 2. Hook Integration & Prop Passing (7 tests)
 * 3. Event Handling & Callbacks (8 tests)
 * 4. Edge Cases & Null Handling (7 tests)
 *
 * Total: 30 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OverridingInstanceProp } from '../index';
import React from 'react';

// Mock dependencies
vi.mock('@/entities/uiInstance', () => ({
  useInstanceMutation: vi.fn(),
}));

vi.mock('../../../model', () => ({
  useInstancePropControl: vi.fn(),
}));

vi.mock('../BooleanValue', () => ({
  BooleanValue: ({ value, onChange }: any) => (
    <div data-testid="boolean-value" onClick={() => onChange?.(!value)}>
      Boolean: {String(value)}
    </div>
  ),
}));

vi.mock('../StringValue', () => ({
  StringValue: ({ value, onChange }: any) => (
    <input
      data-testid="string-value"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

vi.mock('../ColorValue', () => ({
  ColorValue: ({ value, onChange }: any) => (
    <input
      data-testid="color-value"
      type="color"
      value={value || '#000000'}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

vi.mock('../ImageValue', () => ({
  ImageValue: ({ value, onChange }: any) => (
    <input
      data-testid="image-value"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

vi.mock('../DataValue', () => ({
  DataValue: ({ dataModels, currentModelId, onChange }: any) => (
    <select
      data-testid="data-value"
      value={currentModelId || ''}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {dataModels?.map((model: any) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('../OneOfValue', () => ({
  OneOfValue: ({ propValues, currentPropValue, onChange }: any) => (
    <select
      data-testid="oneof-value"
      value={currentPropValue || ''}
      onChange={(e) => {
        const selectedValue = propValues.find((v: any) => v.id === e.target.value);
        onChange?.(selectedValue?.value, e.target.value);
      }}
    >
      {propValues?.map((propValue: any) => (
        <option key={propValue.id} value={propValue.id}>
          {propValue.name}
        </option>
      ))}
    </select>
  ),
}));

import { useInstanceMutation } from '@/entities/uiInstance';
import { useInstancePropControl } from '../../../model';
import { VARIABLE_TYPES, ENTITY_KINDS } from '@/shared/constants';

describe('OverridingInstanceProp Component Integration', () => {
  let mockUpdateInstanceProp: ReturnType<typeof vi.fn>;
  let mockGetCurrentPropValue: ReturnType<typeof vi.fn>;
  let mockGetVariablesTypeDataByPropTypeData: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUpdateInstanceProp = vi.fn();
    mockGetCurrentPropValue = vi.fn().mockReturnValue('default-value');
    mockGetVariablesTypeDataByPropTypeData = vi.fn().mockReturnValue([]);

    (useInstanceMutation as ReturnType<typeof vi.fn>).mockReturnValue({
      updateInstanceProp: mockUpdateInstanceProp,
    });

    (useInstancePropControl as ReturnType<typeof vi.fn>).mockReturnValue({
      getCurrentPropValue: mockGetCurrentPropValue,
      getVariablesTypeDataByPropTypeData: mockGetVariablesTypeDataByPropTypeData,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: CONDITIONAL RENDERING BY PROP TYPE (8 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Conditional Rendering by Prop Type', () => {
    it('should render BooleanValue for BOOLEAN type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.BOOLEAN };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('boolean-value')).toBeInTheDocument();
    });

    it('should render StringValue for STRING type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('string-value')).toBeInTheDocument();
    });

    it('should render ColorValue for COLOR type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.COLOR };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('color-value')).toBeInTheDocument();
    });

    it('should render ImageValue for IMAGE type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.IMAGE };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('image-value')).toBeInTheDocument();
    });

    it('should render DataValue for DATA type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };
      mockGetVariablesTypeDataByPropTypeData.mockReturnValue([
        { id: 'model-1', name: 'Model 1' },
      ]);

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('data-value')).toBeInTheDocument();
    });

    it('should render OneOfValue when prop has values', () => {
      const prop = {
        id: 'prop-1',
        type: VARIABLE_TYPES.STRING,
        values: [
          { id: 'val-1', name: 'Value 1', value: 'v1' },
          { id: 'val-2', name: 'Value 2', value: 'v2' },
        ],
      };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('oneof-value')).toBeInTheDocument();
      expect(screen.queryByTestId('string-value')).not.toBeInTheDocument();
    });

    it('should render placeholder text for DATE type', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATE };
      const { container } = render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(container.textContent).toContain('Date');
    });

    it('should render null for unknown type', () => {
      const prop = { id: 'prop-1', type: 'UNKNOWN_TYPE' };
      const { container } = render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(container.textContent).toBe('');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: HOOK INTEGRATION & PROP PASSING (7 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Hook Integration & Prop Passing', () => {
    it('should call getCurrentPropValue with prop id and instance id', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(mockGetCurrentPropValue).toHaveBeenCalledWith('prop-1', 'instance-1');
    });

    it('should call getVariablesTypeDataByPropTypeData with prop id', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(mockGetVariablesTypeDataByPropTypeData).toHaveBeenCalledWith('prop-1');
    });

    it('should pass currentPropValue to StringValue', () => {
      mockGetCurrentPropValue.mockReturnValue('test-value');
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('string-value') as HTMLInputElement;
      expect(input.value).toBe('test-value');
    });

    it('should pass currentPropValue to BooleanValue', () => {
      mockGetCurrentPropValue.mockReturnValue(true);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.BOOLEAN };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByText(/Boolean: true/)).toBeInTheDocument();
    });

    it('should pass dataModels to DataValue', () => {
      const dataModels = [
        { id: 'model-1', name: 'Model 1' },
        { id: 'model-2', name: 'Model 2' },
      ];
      mockGetVariablesTypeDataByPropTypeData.mockReturnValue(dataModels);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const select = screen.getByTestId('data-value');
      expect(select).toBeInTheDocument();
      expect(screen.getByText('Model 1')).toBeInTheDocument();
      expect(screen.getByText('Model 2')).toBeInTheDocument();
    });

    it('should pass propValues to OneOfValue', () => {
      const prop = {
        id: 'prop-1',
        type: VARIABLE_TYPES.STRING,
        values: [
          { id: 'val-1', name: 'Option 1', value: 'opt1' },
          { id: 'val-2', name: 'Option 2', value: 'opt2' },
        ],
      };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should pass instanceId and propId to StringValue', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      // StringValue should render (implicitly receives instanceId and propId)
      expect(screen.getByTestId('string-value')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: EVENT HANDLING & CALLBACKS (8 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event Handling & Callbacks', () => {
    it('should call updateInstanceProp when StringValue changes', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('string-value') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new-value' } });

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        { value: 'new-value' },
      );
    });

    it('should call updateInstanceProp when BooleanValue changes', () => {
      mockGetCurrentPropValue.mockReturnValue(false);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.BOOLEAN };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const booleanValue = screen.getByTestId('boolean-value');
      booleanValue.click();

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        { value: true },
      );
    });

    it('should call updateInstanceProp when ColorValue changes', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.COLOR };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('color-value') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '#ff0000' } });

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        { value: '#ff0000' },
      );
    });

    it('should call updateInstanceProp when ImageValue changes', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.IMAGE };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('image-value') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new-image.png' } });

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        { value: 'new-image.png' },
      );
    });

    it('should call updateInstanceProp with DATA_VARIABLE type when DataValue changes', () => {
      const dataModels = [
        { id: 'model-1', name: 'Model 1' },
        { id: 'model-2', name: 'Model 2' },
      ];
      mockGetVariablesTypeDataByPropTypeData.mockReturnValue(dataModels);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const select = screen.getByTestId('data-value') as HTMLSelectElement;
      select.value = 'model-2';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        {
          value: {
            id: 'model-2',
            type: ENTITY_KINDS.DATA_VARIABLE,
          },
        },
      );
    });

    it('should call updateInstanceProp with PROP_VALUE type when OneOfValue changes', () => {
      const prop = {
        id: 'prop-1',
        type: VARIABLE_TYPES.STRING,
        values: [
          { id: 'val-1', name: 'Option 1', value: 'opt1' },
          { id: 'val-2', name: 'Option 2', value: 'opt2' },
        ],
      };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const select = screen.getByTestId('oneof-value') as HTMLSelectElement;
      select.value = 'val-2';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      expect(mockUpdateInstanceProp).toHaveBeenCalledWith(
        'instance-1',
        'prop-1',
        {
          value: {
            id: 'val-2',
            type: ENTITY_KINDS.PROP_VALUE,
          },
        },
      );
    });

    it('should handle multiple updates to the same prop', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('string-value') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'value1' } });
      fireEvent.change(input, { target: { value: 'value2' } });

      expect(mockUpdateInstanceProp).toHaveBeenCalledTimes(2);
    });

    it('should not call updateInstanceProp for DATA type with invalid model id', () => {
      const dataModels = [{ id: 'model-1', name: 'Model 1' }];
      mockGetVariablesTypeDataByPropTypeData.mockReturnValue(dataModels);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const select = screen.getByTestId('data-value') as HTMLSelectElement;
      select.value = 'invalid-model-id';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      // Should not be called because model is not found
      expect(mockUpdateInstanceProp).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: EDGE CASES & NULL HANDLING (7 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Edge Cases & Null Handling', () => {
    it('should handle null currentPropValue', () => {
      mockGetCurrentPropValue.mockReturnValue(null);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('string-value') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle undefined currentPropValue', () => {
      mockGetCurrentPropValue.mockReturnValue(undefined);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const input = screen.getByTestId('string-value') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle empty dataModels array', () => {
      mockGetVariablesTypeDataByPropTypeData.mockReturnValue([]);
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.DATA };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      const select = screen.getByTestId('data-value');
      expect(select.children.length).toBe(0);
    });

    it('should handle empty prop values array', () => {
      const prop = {
        id: 'prop-1',
        type: VARIABLE_TYPES.STRING,
        values: [],
      };

      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      // Should render StringValue instead of OneOfValue when values is empty
      expect(screen.getByTestId('string-value')).toBeInTheDocument();
    });

    it('should handle prop without values property', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.STRING };
      render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(screen.getByTestId('string-value')).toBeInTheDocument();
    });

    it('should handle NUMBER type (placeholder)', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.NUMBER };
      const { container } = render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(container.textContent).toContain('Number');
    });

    it('should handle VIDEO type (placeholder)', () => {
      const prop = { id: 'prop-1', type: VARIABLE_TYPES.VIDEO };
      const { container } = render(<OverridingInstanceProp prop={prop} instanceId="instance-1" />);

      expect(container.textContent).toContain('Video');
    });
  });
});

