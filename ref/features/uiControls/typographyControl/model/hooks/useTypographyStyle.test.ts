// ===================================================================
// Unit Tests for Typography Style Control
// CRITICAL BUSINESS LOGIC - Typography Property Updates
// Phase 5, Week 1, Day 3-4 - Property Panel Logic (Part 1: 35 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypographyStyle } from './useTypographyStyle';

// Mock dependencies
vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
}));

vi.mock('../../../../../shared/lib', () => ({
  parseSizeFromUI: vi.fn((value) => {
    if (!value || value === 'Auto') {return null;}
    if (typeof value === 'number') {return `${value}px`;}
    if (!isNaN(Number(value))) {return `${value}px`;}
    return value;
  }),
  formatSizeForUI: vi.fn((value) => {
    if (!value) {return { displayValue: '', placeholder: 'Auto' };}
    if (value.endsWith('px')) {return { displayValue: value.replace('px', '') };}
    return { displayValue: value };
  }),
}));

vi.mock('../../lib/weightParser', () => ({
  formatWeightForUI: vi.fn((value) => {
    if (!value) {return { displayValue: '' };}
    return { displayValue: value.toString() };
  }),
  parseWeightFromUI: vi.fn((value) => {
    if (!value) {return null;}
    const num = Number(value);
    return isNaN(num) ? value : num;
  }),
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';

describe('Typography Style Control - Property Updates', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockFocusedElement = { id: 'element-123' };

    (useElement as any).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useElementMutations as any).mockReturnValue({
      updateStyle: mockUpdateStyle,
    });

    (useBoundVariableValue as any).mockReturnValue({
      fontSizeValue: { value: undefined },
      lineHeightValue: { value: undefined },
      letterSpacingValue: { value: undefined },
      fontWeightValue: { value: undefined },
      fontFamilyValue: { value: undefined },
      textAlignValue: { value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Font Size Updates (7 tests)
  // ===================================================================

  describe('Font Size Updates', () => {
    it('should update font size with pixel value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('16');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontSize: '16px',
      });
    });

    it('should update font size with rem value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('1.5rem');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontSize: '1.5rem',
      });
    });

    it('should update font size with em value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('2em');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontSize: '2em',
      });
    });

    it('should handle font size Auto (null)', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('Auto');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontSize: null,
      });
    });

    it('should display current font size value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: '18px' },
        lineHeightValue: { value: undefined },
        letterSpacingValue: { value: undefined },
        fontWeightValue: { value: undefined },
        fontFamilyValue: { value: undefined },
        textAlignValue: { value: undefined },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.fontSize).toBe('18');
    });

    it('should handle decimal font size', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('14.5');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontSize: '14.5px',
      });
    });

    it('should not update when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontSize('16');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 2: Line Height Updates (7 tests)
  // ===================================================================

  describe('Line Height Updates', () => {
    it('should update line height with pixel value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('24');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        lineHeight: '24px',
      });
    });

    it('should update line height with unitless value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('1.5');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        lineHeight: '1.5px',
      });
    });

    it('should update line height with percentage', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('150%');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        lineHeight: '150%',
      });
    });

    it('should handle line height Auto (null)', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('Auto');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        lineHeight: null,
      });
    });

    it('should display current line height value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: undefined },
        lineHeightValue: { value: '28px' },
        letterSpacingValue: { value: undefined },
        fontWeightValue: { value: undefined },
        fontFamilyValue: { value: undefined },
        textAlignValue: { value: undefined },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.lineHeight).toBe('28');
    });

    it('should handle normal line height', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('normal');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        lineHeight: 'normal',
      });
    });

    it('should not update when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLineHeight('24');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 3: Letter Spacing Updates (7 tests)
  // ===================================================================

  describe('Letter Spacing Updates', () => {
    it('should update letter spacing with pixel value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('2');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        letterSpacing: '2px',
      });
    });

    it('should update letter spacing with em value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('0.1em');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        letterSpacing: '0.1em',
      });
    });

    it('should handle negative letter spacing', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('-1');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        letterSpacing: '-1px',
      });
    });

    it('should handle letter spacing Auto (null)', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('Auto');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        letterSpacing: null,
      });
    });

    it('should display current letter spacing value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: undefined },
        lineHeightValue: { value: undefined },
        letterSpacingValue: { value: '1px' },
        fontWeightValue: { value: undefined },
        fontFamilyValue: { value: undefined },
        textAlignValue: { value: undefined },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.letterSpacing).toBe('1');
    });

    it('should handle normal letter spacing', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('normal');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        letterSpacing: 'normal',
      });
    });

    it('should not update when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateLetterSpacing('2');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 4: Font Weight Updates (7 tests)
  // ===================================================================

  describe('Font Weight Updates', () => {
    it('should update font weight with numeric value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('700');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontWeight: 700,
      });
    });

    it('should update font weight with keyword value', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('bold');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontWeight: 'bold',
      });
    });

    it('should handle normal font weight', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('normal');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontWeight: 'normal',
      });
    });

    it('should handle font weight 400', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('400');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontWeight: 400,
      });
    });

    it('should display current font weight value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: undefined },
        lineHeightValue: { value: undefined },
        letterSpacingValue: { value: undefined },
        fontWeightValue: { value: '600' },
        fontFamilyValue: { value: undefined },
        textAlignValue: { value: undefined },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.fontWeight).toBe('600');
    });

    it('should handle lighter/bolder keywords', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('lighter');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontWeight: 'lighter',
      });
    });

    it('should not update when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontWeight('700');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 5: Font Family & Text Align Updates (7 tests)
  // ===================================================================

  describe('Font Family & Text Align Updates', () => {
    it('should update font family', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontFamily('Arial');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontFamily: 'Arial',
      });
    });

    it('should update font family with fallback', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateFontFamily('Arial, sans-serif');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        fontFamily: 'Arial, sans-serif',
      });
    });

    it('should display current font family value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: undefined },
        lineHeightValue: { value: undefined },
        letterSpacingValue: { value: undefined },
        fontWeightValue: { value: undefined },
        fontFamilyValue: { value: 'Roboto' },
        textAlignValue: { value: undefined },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.fontFamily).toBe('Roboto');
    });

    it('should update text align to left', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateTextAlign('left');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        textAlign: 'left',
      });
    });

    it('should update text align to center', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateTextAlign('center');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        textAlign: 'center',
      });
    });

    it('should update text align to justify', () => {
      const { result } = renderHook(() => useTypographyStyle());

      act(() => {
        result.current.updateTextAlign('justify');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        textAlign: 'justify',
      });
    });

    it('should display current text align value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        fontSizeValue: { value: undefined },
        lineHeightValue: { value: undefined },
        letterSpacingValue: { value: undefined },
        fontWeightValue: { value: undefined },
        fontFamilyValue: { value: undefined },
        textAlignValue: { value: 'right' },
      });

      const { result } = renderHook(() => useTypographyStyle());

      expect(result.current.textAlign).toBe('right');
    });
  });
});

