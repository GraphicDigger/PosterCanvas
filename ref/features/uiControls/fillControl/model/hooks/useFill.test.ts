/**
 * Unit Tests for useFill Hook
 *
 * Phase 5 - Week 2 Day 1: Typography Advanced Tests (Fill Control)
 *
 * Purpose: Test fill/background color management with format conversions
 * Coverage Target: 90%+ for useFill hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Color Format Detection (10 tests)
 * 2. Color Format Conversion (15 tests)
 * 3. Background Color Updates (15 tests)
 * 4. Edge Cases & Error Handling (10 tests)
 *
 * Total: 50 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFill } from './useFill';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
}));

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../shared/lib', () => ({
  formatColorForUI: vi.fn(),
  parseColorFromUI: vi.fn((value) => {
    if (typeof value === 'object' && value.r !== undefined) {
      return `rgb(${value.r}, ${value.g}, ${value.b})`;
    }
    if (typeof value === 'object' && value.h !== undefined) {
      return `hsl(${value.h}, ${value.s}%, ${value.b}%)`;
    }
    return value;
  }),
  hexToRgb: vi.fn((hex) => ({ r: 255, g: 0, b: 0, str: 'rgb(255, 0, 0)' })),
  hexToHsl: vi.fn((hex) => ({ h: 0, s: 100, l: 50, str: 'hsl(0, 100%, 50%)' })),
  rgbToHex: vi.fn(() => '#ff0000'),
  rgbToHsl: vi.fn(() => ({ h: 0, s: 100, l: 50, str: 'hsl(0, 100%, 50%)' })),
  hsbToHex: vi.fn(() => '#ff0000'),
  hsbToRgb: vi.fn(() => ({ r: 255, g: 0, b: 0, str: 'rgb(255, 0, 0)' })),
}));

vi.mock('../../../../../shared/constants', () => ({
  COLOR_FORMAT: {
    HEX: 'HEX',
    HEX3: 'HEX3',
    HEX6: 'HEX6',
    HEX8: 'HEX8',
    RGB: 'RGB',
    RGBA: 'RGBA',
    HSB: 'HSB',
    HSBA: 'HSBA',
  },
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { formatColorForUI } from '../../../../../shared/lib';

describe('useFill Hook', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();
    mockFocusedElement = { id: 'element-1' };

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      backgroundColorValue: { value: '#ff0000' },
      backgroundImageValue: null,
    });

    (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
      color: '#ff0000',
      opacity: 100,
      format: 'HEX6',
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: COLOR FORMAT DETECTION (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Color Format Detection', () => {
    it('should detect HEX format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isHexFormat).toBe(true);
      expect(result.current.currentFormat).toBe('HEX');
    });

    it('should detect RGB format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isRgbFormat).toBe(true);
      expect(result.current.currentFormat).toBe('RGB');
    });

    it('should detect HSB format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 0, s: 100, b: 100 },
        opacity: 100,
        format: 'HSB',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isHsbFormat).toBe(true);
      expect(result.current.currentFormat).toBe('HSB');
    });

    it('should detect HEX3 format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#f00',
        opacity: 100,
        format: 'HEX3',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isHexFormat).toBe(true);
      expect(result.current.currentFormat).toBe('HEX');
    });

    it('should detect HEX8 format with alpha', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 50,
        format: 'HEX8',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isHexFormat).toBe(true);
      expect(result.current.currentFormat).toBe('HEX');
      expect(result.current.opacity).toBe(50);
    });

    it('should detect RGBA format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 80,
        format: 'RGBA',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isRgbFormat).toBe(true);
      expect(result.current.currentFormat).toBe('RGB');
      expect(result.current.opacity).toBe(80);
    });

    it('should detect HSBA format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 120, s: 50, b: 75 },
        opacity: 60,
        format: 'HSBA',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.isHsbFormat).toBe(true);
      expect(result.current.currentFormat).toBe('HSB');
      expect(result.current.opacity).toBe(60);
    });

    it('should return undefined format for no color', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: null,
        opacity: 100,
        format: null,
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.currentFormat).toBeUndefined();
    });

    it('should display color hex value for HEX format', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#00ff00',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.colorHexValue).toBe('#00ff00');
    });

    it('should convert RGB to HEX for colorHexValue', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.colorHexValue).toBe('#ff0000');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: COLOR FORMAT CONVERSION (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Color Format Conversion', () => {
    it('should convert HEX to RGB', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(255, 0, 0)',
      });
    });

    it('should convert HEX to HSB', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HSB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(0, 100%, 50%)',
      });
    });

    it('should convert RGB to HEX', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HEX');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#ff0000',
      });
    });

    it('should convert RGB to HSB', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HSB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(0, 100%, 50%)',
      });
    });

    it('should convert HSB to HEX', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 0, s: 100, b: 100 },
        opacity: 100,
        format: 'HSB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HEX');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#ff0000',
      });
    });

    it('should convert HSB to RGB', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 0, s: 100, b: 100 },
        opacity: 100,
        format: 'HSB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(255, 0, 0)',
      });
    });

    it('should not convert if already in target format (HEX)', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HEX');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should not convert if already in target format (RGB)', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should not convert if already in target format (HSB)', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 0, s: 100, b: 100 },
        opacity: 100,
        format: 'HSB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HSB');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle conversion with different RGB values', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 128, g: 64, b: 192 },
        opacity: 100,
        format: 'RGB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('HEX');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#ff0000', // Mock returns this
      });
    });

    it('should handle conversion with different HSB values', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { h: 240, s: 100, b: 50 },
        opacity: 100,
        format: 'HSB',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(255, 0, 0)', // Mock returns this
      });
    });

    it('should handle multiple format conversions', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);

      // Simulate format change
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: { r: 255, g: 0, b: 0 },
        opacity: 100,
        format: 'RGB',
      });

      const { result: result2 } = renderHook(() => useFill());

      act(() => {
        result2.current.updateColorFormat('HSB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });

    it('should preserve opacity during format conversion', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#ff0000',
        opacity: 75,
        format: 'HEX8',
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.opacity).toBe(75);

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(result.current.opacity).toBe(75);
    });

    it('should handle conversion when displayColor is null', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: null,
        opacity: 100,
        format: 'HEX6',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      // The code still calls hexToRgb even with null color, which returns a default value
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(255, 0, 0)',
      });
    });

    it('should handle conversion from HEX3 to RGB', () => {
      (formatColorForUI as ReturnType<typeof vi.fn>).mockReturnValue({
        color: '#f00',
        opacity: 100,
        format: 'HEX3',
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateColorFormat('RGB');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(255, 0, 0)',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: BACKGROUND COLOR UPDATES (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Background Color Updates', () => {
    it('should update background color with HEX string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('#00ff00');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#00ff00',
      });
    });

    it('should update background color with RGB object', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ r: 0, g: 255, b: 0 });
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(0, 255, 0)',
      });
    });

    it('should update background color with HSB object', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ h: 120, s: 100, b: 50 });
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(120, 100%, 50%)',
      });
    });

    it('should trim whitespace from color string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('  #0000ff  ');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#0000ff',
      });
    });

    it('should set transparent for empty string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'transparent',
      });
    });

    it('should set transparent for whitespace-only string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('   ');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'transparent',
      });
    });

    it('should add default background color', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.addBackgroundColor();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#D9D9D9',
      });
    });

    it('should handle named colors', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('red');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'red',
      });
    });

    it('should handle rgba() string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('rgba(255, 0, 0, 0.5)');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      });
    });

    it('should handle hsl() string', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('hsl(120, 100%, 50%)');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(120, 100%, 50%)',
      });
    });

    it('should not update if no focused element', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('#ff0000');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle multiple color updates', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('#ff0000');
      });

      act(() => {
        result.current.updateBackgroundColor('#00ff00');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      expect(mockUpdateStyle).toHaveBeenNthCalledWith(1, 'element-1', {
        backgroundColor: '#ff0000',
      });
      expect(mockUpdateStyle).toHaveBeenNthCalledWith(2, 'element-1', {
        backgroundColor: '#00ff00',
      });
    });

    it('should handle RGB object with different values', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ r: 128, g: 64, b: 192 });
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'rgb(128, 64, 192)',
      });
    });

    it('should handle HSB object with different values', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ h: 240, s: 50, b: 75 });
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(240, 50%, 75%)',
      });
    });

    it('should display background color value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        backgroundColorValue: { value: '#0000ff' },
        backgroundImageValue: null,
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.backgroundColorValue).toEqual({ value: '#0000ff' });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: EDGE CASES & ERROR HANDLING (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Edge Cases & Error Handling', () => {
    it('should handle null background color value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        backgroundColorValue: null,
        backgroundImageValue: null,
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.backgroundColorValue).toBeNull();
    });

    it('should handle undefined background color value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        backgroundColorValue: undefined,
        backgroundImageValue: null,
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.backgroundColorValue).toBeUndefined();
    });

    it('should handle background image value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        backgroundColorValue: { value: '#ff0000' },
        backgroundImageValue: { value: 'url(image.png)' },
      });

      const { result } = renderHook(() => useFill());

      expect(result.current.backgroundImageValue).toEqual({ value: 'url(image.png)' });
    });

    it('should handle invalid HEX color', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('#gggggg');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: '#gggggg',
      });
    });

    it('should handle RGB object with missing values', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ r: 255 } as any);
      });

      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should handle HSB object with out-of-range values', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor({ h: 400, s: 150, b: 200 });
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'hsl(400, 150%, 200%)',
      });
    });

    it('should handle very long color string', () => {
      const longColor = '#' + 'f'.repeat(1000);
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor(longColor);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: longColor,
      });
    });

    it('should handle special color keywords', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('currentColor');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'currentColor',
      });
    });

    it('should handle gradient values', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('linear-gradient(red, blue)');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        backgroundColor: 'linear-gradient(red, blue)',
      });
    });

    it('should handle concurrent updates', () => {
      const { result } = renderHook(() => useFill());

      act(() => {
        result.current.updateBackgroundColor('#ff0000');
        result.current.updateColorFormat('RGB');
        result.current.addBackgroundColor();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(3);
    });
  });
});

