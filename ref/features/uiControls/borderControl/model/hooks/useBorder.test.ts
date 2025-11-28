/**
 * Unit Tests for useBorder Hook
 *
 * Phase 5 - Week 2 Day 4: Border Control Testing
 *
 * Purpose: Test border width, style, color, and separate border logic
 * Coverage Target: 90%+ for useBorder hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Border Width Updates (10 tests)
 * 2. Border Style Updates (10 tests)
 * 3. Border Color Updates (10 tests)
 * 4. Separate Border Logic (10 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBorder } from './useBorder';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: {
    border: 'border',
    borderTopWidth: 'borderTopWidth',
    borderBottomWidth: 'borderBottomWidth',
    borderLeftWidth: 'borderLeftWidth',
    borderRightWidth: 'borderRightWidth',
  },
  BORDER_PROPERTIES: ['border', 'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth'],
}));

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../shared/lib', () => ({
  parseSizeFromUI: vi.fn((value) => value), // Simple passthrough for testing
  formatSizeForUI: vi.fn((value) => ({
    displayValue: value,
    placeholder: '',
    isPx: true,
  })),
}));

vi.mock('../../lib', () => ({
  parseBorder: vi.fn((value) => {
    if (!value) {return { width: null, style: null, color: null };}
    // Simple parser for testing
    const parts = value.split(' ');
    return {
      width: parts[0] || null,
      style: parts[1] || null,
      color: parts[2] || null,
    };
  }),
  formatBorder: vi.fn((borderObj) => {
    if (!borderObj) {return '';}
    const parts = [];
    if (borderObj.width) {parts.push(borderObj.width);}
    if (borderObj.style) {parts.push(borderObj.style);}
    if (borderObj.color) {parts.push(borderObj.color);}
    return parts.join(' ');
  }),
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';

describe('useBorder Hook', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: { id: 'element-1', kind: 'element', type: 'div' },
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      borderValue: { value: '1px solid #000000' },
      borderTopValue: null,
      borderBottomValue: null,
      borderLeftValue: null,
      borderRightValue: null,
      borderWidthValue: null,
      borderTopWidthValue: null,
      borderBottomWidthValue: null,
      borderLeftWidthValue: null,
      borderRightWidthValue: null,
      borderColorValue: null,
      borderTopColorValue: null,
      borderBottomColorValue: null,
      borderLeftColorValue: null,
      borderRightColorValue: null,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: BORDER WIDTH UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Border Width Updates', () => {
    it('should update border width to 2px', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('2px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '2px solid #000000',
      });
    });

    it('should update border width to 0px (remove border)', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('0px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '0px solid #000000',
      });
    });

    it('should update border width to 5px', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('5px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '5px solid #000000',
      });
    });

    it('should update border width with em units', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('1.5em');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1.5em solid #000000',
      });
    });

    it('should update border width with rem units', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('2rem');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '2rem solid #000000',
      });
    });

    it('should update border width when no existing border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('3px');
      });

      // Should create border with default style and color (only width is set when no existing border)
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '3px',
      });
    });

    it('should update border top width separately', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderTopWidth('4px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderTopWidth: '4px',
      });
    });

    it('should update border bottom width separately', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderBottomWidth('3px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderBottomWidth: '3px',
      });
    });

    it('should update border left width separately', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderLeftWidth('2px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderLeftWidth: '2px',
      });
    });

    it('should update border right width separately', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderRightWidth('5px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderRightWidth: '5px',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: BORDER STYLE UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Border Style Updates', () => {
    it('should update border style to dashed', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('dashed');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px dashed #000000',
      });
    });

    it('should update border style to dotted', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('dotted');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px dotted #000000',
      });
    });

    it('should update border style to double', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('double');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px double #000000',
      });
    });

    it('should update border style to groove', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('groove');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px groove #000000',
      });
    });

    it('should update border style to ridge', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('ridge');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px ridge #000000',
      });
    });

    it('should update border style to inset', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('inset');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px inset #000000',
      });
    });

    it('should update border style to outset', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('outset');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px outset #000000',
      });
    });

    it('should update border style to none', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('none');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px none #000000',
      });
    });

    it('should update border style when no existing border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('dashed');
      });

      // Should create border with default width and color (only style is set when no existing border)
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: 'dashed',
      });
    });

    it('should preserve width and color when updating style', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '3px solid #FF0000' },
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderStyle('dotted');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '3px dotted #FF0000',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: BORDER COLOR UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Border Color Updates', () => {
    it('should update border color to red', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('#FF0000');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid #FF0000',
      });
    });

    it('should update border color to blue', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('#0000FF');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid #0000FF',
      });
    });

    it('should update border color to green', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('#00FF00');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid #00FF00',
      });
    });

    it('should update border color with rgba', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('rgba(255,0,0,0.5)');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid rgba(255,0,0,0.5)',
      });
    });

    it('should update border color with named color', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('red');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid red',
      });
    });

    it('should update border color when no existing border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('#FF00FF');
      });

      // Should create border with default width and style (only color is set when no existing border)
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '#FF00FF',
      });
    });

    it('should preserve width and style when updating color', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '3px dashed #000000' },
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('#FFFF00');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '3px dashed #FFFF00',
      });
    });

    it('should handle null color (remove color)', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor(null);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid',
      });
    });

    it('should handle empty string color', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid',
      });
    });

    it('should update border color with hsl', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderColor('hsl(120,100%,50%)');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid hsl(120,100%,50%)',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: SEPARATE BORDER LOGIC (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Separate Border Logic', () => {
    it('should add border with default values', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.addBorder();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid #000000',
      });
    });

    it('should remove border completely', () => {
      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.removeBorder();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-1', [
        'border',
        'borderTopWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderRightWidth',
      ]);
    });

    it('should detect border exists', () => {
      const { result } = renderHook(() => useBorder());

      // hasBorder returns the value itself, not a boolean
      expect(result.current.hasBorder).toBeTruthy();
    });

    it('should detect no border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      // hasBorder returns undefined when no border
      expect(result.current.hasBorder).toBeFalsy();
    });

    it('should detect separate border exists', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderTopWidthValue: { value: '2px' },
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      // hasSeparateBorder returns the value itself, not a boolean
      expect(result.current.hasSeparateBorder).toBeTruthy();
    });

    it('should separate border from unified to individual sides', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px solid #000000' },
        borderTopWidthValue: null,
        borderBottomWidthValue: null,
        borderLeftWidthValue: null,
        borderRightWidthValue: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.separateBorder();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderTopWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px',
        borderRightWidth: '2px',
      });
    });

    it('should unify separate borders back to single border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderTopWidthValue: { value: '2px' },
        borderBottomWidthValue: { value: '3px' },
        borderLeftWidthValue: { value: '4px' },
        borderRightWidthValue: { value: '5px' },
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.separateBorder();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-1', [
        'borderTopWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'borderRightWidth',
      ]);
    });

    it('should return border object with parsed values', () => {
      const { result } = renderHook(() => useBorder());

      expect(result.current.border).toEqual({
        width: '1px',
        color: '#000000',
        style: 'solid',
      });
    });

    it('should return display values for separate borders', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderTopWidthValue: { value: '2px' },
        borderBottomWidthValue: { value: '3px' },
        borderLeftWidthValue: { value: '4px' },
        borderRightWidthValue: { value: '5px' },
      });

      const { result } = renderHook(() => useBorder());

      expect(result.current.borderTopWidth).toBe('2px');
      expect(result.current.borderBottomWidth).toBe('3px');
      expect(result.current.borderLeftWidth).toBe('4px');
      expect(result.current.borderRightWidth).toBe('5px');
    });

    it('should not update style if no focused element', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useBorder());

      act(() => {
        result.current.updateBorderWidth('2px');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });
});

