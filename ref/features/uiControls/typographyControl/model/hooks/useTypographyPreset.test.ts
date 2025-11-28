/**
 * Unit Tests for useTypographyPreset Hook
 *
 * Phase 5 - Week 2 Day 1: Typography Advanced Tests
 *
 * Purpose: Test typography preset management (advanced feature)
 * Coverage Target: 90%+ for useTypographyPreset hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Preset Value Display (15 tests)
 * 2. Preset Updates (15 tests)
 * 3. Preset Mode Integration (15 tests)
 * 4. Edge Cases & Error Handling (10 tests)
 *
 * Total: 55 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypographyPreset } from './useTypographyPreset';

// Mock dependencies
vi.mock('../../../../../shared/lib', () => ({
  parseSizeFromUI: vi.fn((value) => value), // Simple passthrough for testing
  formatSizeForUI: vi.fn((value) => ({
    displayValue: value,
    placeholder: '',
    isPx: true,
  })),
}));

vi.mock('../../lib/weightParser', () => ({
  formatWeightForUI: vi.fn((value) => ({
    displayValue: value === 700 ? 'Bold' : value === 400 ? 'Regular' : String(value),
    placeholder: '',
    weight: value || 400,
  })),
  parseWeightFromUI: vi.fn((value) => {
    if (value === 'Bold') {return 700;}
    if (value === 'Regular') {return 400;}
    return Number(value) || 400;
  }),
}));

vi.mock('../../../../../entities/varPresetModeValue', () => ({
  usePresetModeValueMutation: vi.fn(),
  usePresetModeValues: vi.fn(),
}));

vi.mock('../../../../../entities/varMode', () => ({
  useVariableModes: vi.fn(),
}));

vi.mock('../../../../../entities/varPreset', () => ({
  usePreset: vi.fn(),
}));

import { usePresetModeValueMutation, usePresetModeValues } from '../../../../../entities/varPresetModeValue';
import { useVariableModes } from '../../../../../entities/varMode';
import { usePreset } from '../../../../../entities/varPreset';

describe('useTypographyPreset Hook', () => {
  let mockUpdatePresetModeValue: ReturnType<typeof vi.fn>;
  let mockPresetModeValue: any;
  let mockDefaultVariableMode: any;
  let mockPreset: any;

  beforeEach(() => {
    mockUpdatePresetModeValue = vi.fn();
    mockDefaultVariableMode = { id: 'mode-1', name: 'Default' };
    mockPreset = { id: 'preset-1', collectionId: 'collection-1' };
    mockPresetModeValue = {
      id: 'pmv-1',
      value: {
        fontFamily: 'Arial',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '1.5',
        letterSpacing: '0px',
        textAlign: 'left',
      },
    };

    (usePresetModeValueMutation as ReturnType<typeof vi.fn>).mockReturnValue({
      updatePresetModeValue: mockUpdatePresetModeValue,
    });

    (usePresetModeValues as ReturnType<typeof vi.fn>).mockReturnValue({
      presetModeValueByPresetIdAndVariableModeId: vi.fn(() => mockPresetModeValue),
    });

    (useVariableModes as ReturnType<typeof vi.fn>).mockReturnValue({
      defaultVariableModeByCollectionId: vi.fn(() => mockDefaultVariableMode),
    });

    (usePreset as ReturnType<typeof vi.fn>).mockReturnValue({
      preset: mockPreset,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: PRESET VALUE DISPLAY (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Preset Value Display', () => {
    it('should display font family from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe('Arial');
    });

    it('should display font size from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontSize).toBe('16px');
    });

    it('should display font weight from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      // formatWeightForUI returns 'Regular' for 400
      expect(result.current.fontWeight).toBe('Regular');
    });

    it('should display line height from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.lineHeight).toBe('1.5');
    });

    it('should display letter spacing from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.letterSpacing).toBe('0px');
    });

    it('should display text align from preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.textAlign).toBe('left');
    });

    it('should display bold font weight as "Bold"', () => {
      mockPresetModeValue.value.fontWeight = 700;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontWeight).toBe('Bold');
    });

    it('should display different font family', () => {
      mockPresetModeValue.value.fontFamily = 'Roboto';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe('Roboto');
    });

    it('should display larger font size', () => {
      mockPresetModeValue.value.fontSize = '24px';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontSize).toBe('24px');
    });

    it('should display center text alignment', () => {
      mockPresetModeValue.value.textAlign = 'center';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.textAlign).toBe('center');
    });

    it('should handle undefined font family', () => {
      mockPresetModeValue.value.fontFamily = undefined;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBeUndefined();
    });

    it('should handle undefined font size', () => {
      mockPresetModeValue.value.fontSize = undefined;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontSize).toBeUndefined();
    });

    it('should handle undefined line height', () => {
      mockPresetModeValue.value.lineHeight = undefined;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.lineHeight).toBeUndefined();
    });

    it('should handle undefined letter spacing', () => {
      mockPresetModeValue.value.letterSpacing = undefined;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.letterSpacing).toBeUndefined();
    });

    it('should handle undefined text align', () => {
      mockPresetModeValue.value.textAlign = undefined;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.textAlign).toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: PRESET UPDATES (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Preset Updates', () => {
    it('should update font family in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('Helvetica');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontFamily: 'Helvetica',
      });
    });

    it('should update font size in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontSize('18px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontSize: '18px',
      });
    });

    it('should update font weight in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontWeight('Bold');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontWeight: 700,
      });
    });

    it('should update line height in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateLineHeight('1.8');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        lineHeight: '1.8',
      });
    });

    it('should update letter spacing in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateLetterSpacing('0.5px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        letterSpacing: '0.5px',
      });
    });

    it('should update text align in preset', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateTextAlign('center');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        textAlign: 'center',
      });
    });

    it('should update font family to system font', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('system-ui');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontFamily: 'system-ui',
      });
    });

    it('should update font size to larger value', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontSize('32px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontSize: '32px',
      });
    });

    it('should update font weight to light', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontWeight('300');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        fontWeight: 300,
      });
    });

    it('should update line height to tighter value', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateLineHeight('1.2');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        lineHeight: '1.2',
      });
    });

    it('should update letter spacing to negative value', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateLetterSpacing('-0.5px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        letterSpacing: '-0.5px',
      });
    });

    it('should update text align to right', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateTextAlign('right');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        textAlign: 'right',
      });
    });

    it('should update text align to justify', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateTextAlign('justify');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1', {
        textAlign: 'justify',
      });
    });

    it('should update multiple properties sequentially', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('Times New Roman');
      });

      act(() => {
        result.current.handleUpdateFontSize('20px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledTimes(2);
      expect(mockUpdatePresetModeValue).toHaveBeenNthCalledWith(1, 'preset-1', 'mode-1', {
        fontFamily: 'Times New Roman',
      });
      expect(mockUpdatePresetModeValue).toHaveBeenNthCalledWith(2, 'preset-1', 'mode-1', {
        fontSize: '20px',
      });
    });

    it('should call update with correct preset and mode IDs', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('Arial');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith(
        'preset-1',
        'mode-1',
        expect.any(Object),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: PRESET MODE INTEGRATION (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Preset Mode Integration', () => {
    it('should use default variable mode from collection', () => {
      const mockGetDefaultMode = vi.fn(() => mockDefaultVariableMode);
      (useVariableModes as ReturnType<typeof vi.fn>).mockReturnValue({
        defaultVariableModeByCollectionId: mockGetDefaultMode,
      });

      renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(mockGetDefaultMode).toHaveBeenCalledWith('collection-1');
    });

    it('should fetch preset by ID', () => {
      const mockGetPreset = vi.fn(() => ({ preset: mockPreset }));
      (usePreset as ReturnType<typeof vi.fn>).mockImplementation(mockGetPreset);

      renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(mockGetPreset).toHaveBeenCalledWith('preset-1');
    });

    it('should fetch preset mode value by preset and mode IDs', () => {
      const mockGetPresetModeValue = vi.fn(() => mockPresetModeValue);
      (usePresetModeValues as ReturnType<typeof vi.fn>).mockReturnValue({
        presetModeValueByPresetIdAndVariableModeId: mockGetPresetModeValue,
      });

      renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(mockGetPresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-1');
    });

    it('should work with different preset ID', () => {
      mockPreset.id = 'preset-2';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-2' }));

      act(() => {
        result.current.handleUpdateFontFamily('Verdana');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-2', 'mode-1', {
        fontFamily: 'Verdana',
      });
    });

    it('should work with different collection ID', () => {
      mockPreset.collectionId = 'collection-2';

      renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      const mockGetDefaultMode = (useVariableModes as ReturnType<typeof vi.fn>).mock.results[0].value
        .defaultVariableModeByCollectionId;
      expect(mockGetDefaultMode).toHaveBeenCalledWith('collection-2');
    });

    it('should work with different mode ID', () => {
      mockDefaultVariableMode.id = 'mode-2';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontSize('14px');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-2', {
        fontSize: '14px',
      });
    });

    it('should handle preset with empty values', () => {
      mockPresetModeValue.value = {};

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBeUndefined();
      expect(result.current.fontSize).toBeUndefined();
      expect(result.current.fontWeight).toBe('undefined');
    });

    it('should handle null preset mode value', () => {
      mockPresetModeValue = null;
      (usePresetModeValues as ReturnType<typeof vi.fn>).mockReturnValue({
        presetModeValueByPresetIdAndVariableModeId: vi.fn(() => null),
      });

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBeUndefined();
    });

    it('should handle undefined preset mode value', () => {
      (usePresetModeValues as ReturnType<typeof vi.fn>).mockReturnValue({
        presetModeValueByPresetIdAndVariableModeId: vi.fn(() => undefined),
      });

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBeUndefined();
    });

    it('should re-fetch values when preset ID changes', () => {
      const { rerender } = renderHook(
        ({ presetId }) => useTypographyPreset({ presetId }),
        { initialProps: { presetId: 'preset-1' } },
      );

      rerender({ presetId: 'preset-2' });

      const mockGetPreset = (usePreset as ReturnType<typeof vi.fn>);
      expect(mockGetPreset).toHaveBeenCalledWith('preset-2');
    });

    it('should use correct mode when collection changes', () => {
      const { rerender } = renderHook(
        () => useTypographyPreset({ presetId: 'preset-1' }),
      );

      mockPreset.collectionId = 'collection-3';
      rerender();

      const mockGetDefaultMode = (useVariableModes as ReturnType<typeof vi.fn>).mock.results[0].value
        .defaultVariableModeByCollectionId;
      expect(mockGetDefaultMode).toHaveBeenCalledWith('collection-3');
    });

    it('should handle mode with different name', () => {
      mockDefaultVariableMode.name = 'Dark Mode';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe('Arial');
    });

    it('should handle collection with multiple modes', () => {
      mockDefaultVariableMode = { id: 'mode-light', name: 'Light' };
      (useVariableModes as ReturnType<typeof vi.fn>).mockReturnValue({
        defaultVariableModeByCollectionId: vi.fn(() => mockDefaultVariableMode),
      });

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('Inter');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledWith('preset-1', 'mode-light', {
        fontFamily: 'Inter',
      });
    });

    it('should maintain preset values across re-renders', () => {
      const { result, rerender } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      const initialFontFamily = result.current.fontFamily;
      rerender();

      expect(result.current.fontFamily).toBe(initialFontFamily);
    });

    it('should update values when preset mode value changes', () => {
      const { result, rerender } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe('Arial');

      mockPresetModeValue.value.fontFamily = 'Roboto';
      rerender();

      expect(result.current.fontFamily).toBe('Roboto');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: EDGE CASES & ERROR HANDLING (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Edge Cases & Error Handling', () => {
    it('should handle empty preset ID', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: '' }));

      expect(result.current.fontFamily).toBeDefined();
    });

    it('should handle null preset ID', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: null as any }));

      expect(result.current.fontFamily).toBeDefined();
    });

    it('should handle very long font family name', () => {
      const longFontName = 'A'.repeat(1000);
      mockPresetModeValue.value.fontFamily = longFontName;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe(longFontName);
    });

    it('should handle special characters in font family', () => {
      mockPresetModeValue.value.fontFamily = 'Font-Name_123 (Regular)';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontFamily).toBe('Font-Name_123 (Regular)');
    });

    it('should handle very large font size', () => {
      mockPresetModeValue.value.fontSize = '999px';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontSize).toBe('999px');
    });

    it('should handle very small font size', () => {
      mockPresetModeValue.value.fontSize = '1px';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.fontSize).toBe('1px');
    });

    it('should handle negative letter spacing', () => {
      mockPresetModeValue.value.letterSpacing = '-5px';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.letterSpacing).toBe('-5px');
    });

    it('should handle line height as unitless number', () => {
      mockPresetModeValue.value.lineHeight = '2';

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.lineHeight).toBe('2');
    });

    it('should handle invalid text align gracefully', () => {
      mockPresetModeValue.value.textAlign = 'invalid' as any;

      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      expect(result.current.textAlign).toBe('invalid');
    });

    it('should handle concurrent updates', () => {
      const { result } = renderHook(() => useTypographyPreset({ presetId: 'preset-1' }));

      act(() => {
        result.current.handleUpdateFontFamily('Arial');
        result.current.handleUpdateFontSize('16px');
        result.current.handleUpdateFontWeight('Bold');
      });

      expect(mockUpdatePresetModeValue).toHaveBeenCalledTimes(3);
    });
  });
});

