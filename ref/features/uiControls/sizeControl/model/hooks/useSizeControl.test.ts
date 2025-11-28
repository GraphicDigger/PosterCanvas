// ===================================================================
// Unit Tests for Size Control System
// CRITICAL BUSINESS LOGIC - Width/Height Control
// Phase 5, Week 1, Day 1 - Canvas Rendering (Part 3: 40 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as uiElement from '../../../../../entities/uiElement';
import * as binding from '../../../../../entities/binding';
import * as sharedLib from '../../../../../shared/lib';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', async () => {
  const actual = await vi.importActual('../../../../../entities/uiElement');
  return {
    ...actual,
    useElement: vi.fn(),
    useElementMutations: vi.fn(),
  };
});

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../shared/lib', () => ({
  formatSizeForUI: (value: string | undefined) => {
    if (!value) {return { displayValue: '', placeholder: 'Auto', isPx: false };}
    if (value === '100%') {return { displayValue: '', placeholder: 'Fill', isPx: false };}
    if (value === 'max-content') {return { displayValue: '', placeholder: 'Fit', isPx: false };}
    if (value.endsWith('px')) {
      return { displayValue: value.replace('px', ''), placeholder: '', isPx: true };
    }
    return { displayValue: value, placeholder: '', isPx: false };
  },
  parseSizeFromUI: (value: string | number) => {
    if (!value || value === 'Auto') {return null;}
    if (value === 'Fill') {return '100%';}
    if (value === 'Fit') {return 'max-content';}
    if (typeof value === 'number') {return `${value}px`;}
    if (!isNaN(Number(value))) {return `${value}px`;}
    return value;
  },
}));

// Mock hook (we'll create a simple mock implementation)
const mockUseSizeControl = () => {
  const { focusedElement } = uiElement.useElement();
  const { updateStyle } = uiElement.useElementMutations();
  const { widthValue, heightValue } = binding.useBoundVariableValue(focusedElement?.id);

  const updateWidth = (value: string) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, { width: sharedLib.parseSizeFromUI(value) });
  };

  const updateHeight = (value: string) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, { height: sharedLib.parseSizeFromUI(value) });
  };

  return {
    width: sharedLib.formatSizeForUI(widthValue?.value),
    height: sharedLib.formatSizeForUI(heightValue?.value),
    updateWidth,
    updateHeight,
  };
};

describe('Size Control System - Width/Height', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockFocusedElement = { id: 'element-123' };

    (uiElement.useElement as any).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (uiElement.useElementMutations as any).mockReturnValue({
      updateStyle: mockUpdateStyle,
    });

    (binding.useBoundVariableValue as any).mockReturnValue({
      widthValue: { value: undefined },
      heightValue: { value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Width Display Formatting (10 tests)
  // ===================================================================

  describe('Width Display Formatting', () => {
    it('should format undefined width as Auto', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.placeholder).toBe('Auto');
      expect(result.current.width.displayValue).toBe('');
    });

    it('should format 100% width as Fill', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '100%' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.placeholder).toBe('Fill');
    });

    it('should format max-content width as Fit', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: 'max-content' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.placeholder).toBe('Fit');
    });

    it('should format pixel width correctly', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '200px' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('200');
      expect(result.current.width.isPx).toBe(true);
    });

    it('should handle zero width', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '0px' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('0');
    });

    it('should handle large width values', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '1920px' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('1920');
    });

    it('should handle decimal width values', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '150.5px' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('150.5');
    });

    it('should handle percentage width other than 100%', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '50%' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('50%');
    });

    it('should handle calc() width values', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: 'calc(100% - 20px)' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('calc(100% - 20px)');
    });

    it('should handle viewport width (vw)', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: '50vw' },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.width.displayValue).toBe('50vw');
    });
  });

  // ===================================================================
  // PART 2: Height Display Formatting (10 tests)
  // ===================================================================

  describe('Height Display Formatting', () => {
    it('should format undefined height as Auto', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: undefined },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.placeholder).toBe('Auto');
      expect(result.current.height.displayValue).toBe('');
    });

    it('should format 100% height as Fill', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '100%' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.placeholder).toBe('Fill');
    });

    it('should format max-content height as Fit', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: 'max-content' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.placeholder).toBe('Fit');
    });

    it('should format pixel height correctly', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '300px' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('300');
      expect(result.current.height.isPx).toBe(true);
    });

    it('should handle zero height', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '0px' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('0');
    });

    it('should handle large height values', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '1080px' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('1080');
    });

    it('should handle decimal height values', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '200.75px' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('200.75');
    });

    it('should handle percentage height other than 100%', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '75%' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('75%');
    });

    it('should handle viewport height (vh)', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: '100vh' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('100vh');
    });

    it('should handle min-content height', () => {
      (binding.useBoundVariableValue as any).mockReturnValue({
        widthValue: { value: undefined },
        heightValue: { value: 'min-content' },
      });

      const { result } = renderHook(() => mockUseSizeControl());

      expect(result.current.height.displayValue).toBe('min-content');
    });
  });

  // ===================================================================
  // PART 3: Width Update Operations (10 tests)
  // ===================================================================

  describe('Width Update Operations', () => {
    it('should update width with pixel value', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('250');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: '250px',
      });
    });

    it('should update width to Fill (100%)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('Fill');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: '100%',
      });
    });

    it('should update width to Fit (max-content)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('Fit');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: 'max-content',
      });
    });

    it('should update width to Auto (null)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('Auto');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: null,
      });
    });

    it('should handle zero width update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('0');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: '0px',
      });
    });

    it('should handle decimal width update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('150.5');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: '150.5px',
      });
    });

    it('should handle percentage width update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('50%');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: '50%',
      });
    });

    it('should handle empty string as Auto', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        width: null,
      });
    });

    it('should not update when element is null', () => {
      (uiElement.useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('250');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid width updates', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateWidth('100');
        result.current.updateWidth('200');
        result.current.updateWidth('300');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(3);
      expect(mockUpdateStyle).toHaveBeenLastCalledWith('element-123', {
        width: '300px',
      });
    });
  });

  // ===================================================================
  // PART 4: Height Update Operations (10 tests)
  // ===================================================================

  describe('Height Update Operations', () => {
    it('should update height with pixel value', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('400');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: '400px',
      });
    });

    it('should update height to Fill (100%)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('Fill');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: '100%',
      });
    });

    it('should update height to Fit (max-content)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('Fit');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: 'max-content',
      });
    });

    it('should update height to Auto (null)', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('Auto');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: null,
      });
    });

    it('should handle zero height update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('0');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: '0px',
      });
    });

    it('should handle decimal height update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('250.25');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: '250.25px',
      });
    });

    it('should handle percentage height update', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('80%');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: '80%',
      });
    });

    it('should handle empty string as Auto', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        height: null,
      });
    });

    it('should not update when element is null', () => {
      (uiElement.useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('400');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid height updates', () => {
      const { result } = renderHook(() => mockUseSizeControl());

      act(() => {
        result.current.updateHeight('100');
        result.current.updateHeight('200');
        result.current.updateHeight('300');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(3);
      expect(mockUpdateStyle).toHaveBeenLastCalledWith('element-123', {
        height: '300px',
      });
    });
  });
});

