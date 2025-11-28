import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePresetMutation } from './usePresetMutation';

// Mock Redux hooks
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// Mock actions
vi.mock('../store/slice', () => ({
  addPreset: vi.fn(),
  updatePreset: vi.fn(),
  removePreset: vi.fn(),
}));

import { useDispatch } from 'react-redux';
import { addPreset, updatePreset, removePreset } from '../store/slice';

describe('usePresetMutation', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should provide mutation functions', () => {
    const { result } = renderHook(() => usePresetMutation());

    expect(result.current).toHaveProperty('addPreset');
    expect(result.current).toHaveProperty('updatePreset');
    expect(result.current).toHaveProperty('removePreset');
    expect(typeof result.current.addPreset).toBe('function');
    expect(typeof result.current.updatePreset).toBe('function');
    expect(typeof result.current.removePreset).toBe('function');
  });

  it('should dispatch addPreset action', () => {
    const mockPreset = { id: 'preset-1', name: 'Light Theme', type: 'theme' };
    addPreset.mockReturnValue({ type: 'presets/addPreset', payload: mockPreset });

    const { result } = renderHook(() => usePresetMutation());

    result.current.addPreset(mockPreset);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/addPreset', payload: expect.objectContaining(mockPreset) });
  });

  it('should dispatch updatePreset action', () => {
    const mockPreset = { id: 'preset-1', name: 'Updated Theme', type: 'theme' };
    updatePreset.mockReturnValue({ type: 'presets/updatePreset', payload: mockPreset });

    const { result } = renderHook(() => usePresetMutation());

    result.current.updatePreset(mockPreset);

    expect(updatePreset).toHaveBeenCalledWith(mockPreset);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/updatePreset', payload: mockPreset });
  });

  it('should dispatch removePreset action', () => {
    const presetId = 'preset-1';
    removePreset.mockReturnValue({ type: 'presets/removePreset', payload: presetId });

    const { result } = renderHook(() => usePresetMutation());

    result.current.removePreset(presetId);

    expect(removePreset).toHaveBeenCalledWith(presetId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/removePreset', payload: presetId });
  });

  it('should handle addPreset with partial preset data', () => {
    const partialPreset = { name: 'New Preset', type: 'theme' };
    addPreset.mockReturnValue({ type: 'presets/addPreset', payload: partialPreset });

    const { result } = renderHook(() => usePresetMutation());

    result.current.addPreset(partialPreset);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/addPreset', payload: expect.objectContaining(partialPreset) });
  });

  it('should handle updatePreset with ID only', () => {
    const presetUpdate = { id: 'preset-1' };
    updatePreset.mockReturnValue({ type: 'presets/updatePreset', payload: presetUpdate });

    const { result } = renderHook(() => usePresetMutation());

    result.current.updatePreset(presetUpdate);

    expect(updatePreset).toHaveBeenCalledWith(presetUpdate);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/updatePreset', payload: presetUpdate });
  });

  it('should handle removePreset with string ID', () => {
    const presetId = 'preset-1';
    removePreset.mockReturnValue({ type: 'presets/removePreset', payload: presetId });

    const { result } = renderHook(() => usePresetMutation());

    result.current.removePreset(presetId);

    expect(removePreset).toHaveBeenCalledWith(presetId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/removePreset', payload: presetId });
  });

  it('should handle removePreset with object containing ID', () => {
    const presetObject = { id: 'preset-1' };
    removePreset.mockReturnValue({ type: 'presets/removePreset', payload: presetObject });

    const { result } = renderHook(() => usePresetMutation());

    result.current.removePreset(presetObject);

    expect(removePreset).toHaveBeenCalledWith(presetObject);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/removePreset', payload: presetObject });
  });

  it('should handle multiple mutations in sequence', () => {
    const preset1 = { id: 'preset-1', name: 'Preset 1' };
    const preset2 = { id: 'preset-2', name: 'Preset 2' };

    addPreset.mockReturnValue({ type: 'presets/addPreset', payload: preset1 });
    updatePreset.mockReturnValue({ type: 'presets/updatePreset', payload: preset2 });

    const { result } = renderHook(() => usePresetMutation());

    result.current.addPreset(preset1);
    result.current.updatePreset(preset2);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'presets/addPreset', payload: preset1 });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'presets/updatePreset', payload: preset2 });
  });

  it('should handle mutation with metadata', () => {
    const presetWithMetadata = {
      id: 'preset-1',
      name: 'Preset',
      type: 'theme',
      metadata: { description: 'Default theme' },
    };
    addPreset.mockReturnValue({ type: 'presets/addPreset', payload: presetWithMetadata });

    const { result } = renderHook(() => usePresetMutation());

    result.current.addPreset(presetWithMetadata);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/addPreset', payload: expect.objectContaining(presetWithMetadata) });
  });

  it('should handle mutation with validation', () => {
    const presetWithValidation = {
      id: 'preset-1',
      name: 'Preset',
      type: 'theme',
      isValid: true,
      validationErrors: [],
    };
    updatePreset.mockReturnValue({ type: 'presets/updatePreset', payload: presetWithValidation });

    const { result } = renderHook(() => usePresetMutation());

    result.current.updatePreset(presetWithValidation);

    expect(updatePreset).toHaveBeenCalledWith(presetWithValidation);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/updatePreset', payload: presetWithValidation });
  });

  it('should handle mutation with timestamps', () => {
    const presetWithTimestamps = {
      id: 'preset-1',
      name: 'Preset',
      type: 'theme',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    };
    addPreset.mockReturnValue({ type: 'presets/addPreset', payload: presetWithTimestamps });

    const { result } = renderHook(() => usePresetMutation());

    result.current.addPreset(presetWithTimestamps);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/addPreset', payload: expect.objectContaining(presetWithTimestamps) });
  });

  it('should handle mutation with custom properties', () => {
    const presetWithCustomProps = {
      id: 'preset-1',
      name: 'Preset',
      type: 'theme',
      customProperty: 'customValue',
    };
    updatePreset.mockReturnValue({ type: 'presets/updatePreset', payload: presetWithCustomProps });

    const { result } = renderHook(() => usePresetMutation());

    result.current.updatePreset(presetWithCustomProps);

    expect(updatePreset).toHaveBeenCalledWith(presetWithCustomProps);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'presets/updatePreset', payload: presetWithCustomProps });
  });
});

