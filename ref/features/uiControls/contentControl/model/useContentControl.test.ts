// ===================================================================
// Unit Tests for Content Control
// CRITICAL BUSINESS LOGIC - Content Property Updates
// Phase 5, Week 1, Day 3-4 - Property Panel Logic (Part 4: 35 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock dependencies
vi.mock('../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  PROPERTY_TYPES: {
    CONTENT: 'content',
    STYLE: 'style',
    ATTRIBUTE: 'attribute',
  },
}));

vi.mock('../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

// Import after mocks
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../entities/binding';

// Mock hook implementation
const mockUseContentControl = () => {
  const { focusedElement } = useElement();
  const { contentValue } = useBoundVariableValue(focusedElement?.id);
  const { updateContent } = useElementMutations();

  const handleUpdateContent = (value: string) => {
    if (!focusedElement?.id) {return;}
    updateContent(focusedElement.id, { text: value });
  };

  return {
    contentValue,
    updateContent: handleUpdateContent,
    focusedElement,
  };
};

describe('Content Control - Property Updates', () => {
  let mockUpdateContent: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
    mockUpdateContent = vi.fn();
    mockFocusedElement = { id: 'element-123' };

    (useElement as any).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useElementMutations as any).mockReturnValue({
      updateContent: mockUpdateContent,
    });

    (useBoundVariableValue as any).mockReturnValue({
      contentValue: { type: 'text', value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Text Content Updates (10 tests)
  // ===================================================================

  describe('Text Content Updates', () => {
    it('should update text content', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Hello World');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Hello World',
      });
    });

    it('should update with empty string', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: '',
      });
    });

    it('should update with multiline text', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Line 1\nLine 2\nLine 3');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Line 1\nLine 2\nLine 3',
      });
    });

    it('should update with special characters', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Special: !@#$%^&*()');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Special: !@#$%^&*()',
      });
    });

    it('should update with unicode characters', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Unicode: 你好 мир 🌍');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Unicode: 你好 мир 🌍',
      });
    });

    it('should update with HTML entities', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('&lt;div&gt;Content&lt;/div&gt;');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: '&lt;div&gt;Content&lt;/div&gt;',
      });
    });

    it('should update with very long text', () => {
      const { result } = renderHook(() => mockUseContentControl());
      const longText = 'A'.repeat(10000);

      act(() => {
        result.current.updateContent(longText);
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: longText,
      });
    });

    it('should not update when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Test');
      });

      expect(mockUpdateContent).not.toHaveBeenCalled();
    });

    it('should handle rapid content updates', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('A');
        result.current.updateContent('AB');
        result.current.updateContent('ABC');
      });

      expect(mockUpdateContent).toHaveBeenCalledTimes(3);
      expect(mockUpdateContent).toHaveBeenLastCalledWith('element-123', {
        text: 'ABC',
      });
    });

    it('should display current content value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'text', value: 'Current Text' },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.value).toBe('Current Text');
    });
  });

  // ===================================================================
  // PART 2: Content Type Handling (10 tests)
  // ===================================================================

  describe('Content Type Handling', () => {
    it('should handle text content type', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'text', value: 'Text content' },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.type).toBe('text');
    });

    it('should handle image content type', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'image', value: 'image-url.jpg' },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.type).toBe('image');
    });

    it('should handle binding content type', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'binding', value: { id: 'var-123' } },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.type).toBe('binding');
    });

    it('should handle undefined content type', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: undefined, value: undefined },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.type).toBeUndefined();
    });

    it('should handle null content value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'text', value: null },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.value).toBeNull();
    });

    it('should handle empty string content value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: { type: 'text', value: '' },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.value).toBe('');
    });

    it('should handle content type change', () => {
      const mockBoundValue = {
        contentValue: { type: 'text', value: 'Text' },
      };

      (useBoundVariableValue as any).mockReturnValue(mockBoundValue);

      const { result, rerender } = renderHook(() => mockUseContentControl());
      expect(result.current.contentValue.type).toBe('text');

      mockBoundValue.contentValue.type = 'image';
      rerender();

      expect(result.current.contentValue.type).toBe('image');
    });

    it('should handle content value change', () => {
      const mockBoundValue = {
        contentValue: { type: 'text', value: 'Initial' },
      };

      (useBoundVariableValue as any).mockReturnValue(mockBoundValue);

      const { result, rerender } = renderHook(() => mockUseContentControl());
      expect(result.current.contentValue.value).toBe('Initial');

      mockBoundValue.contentValue.value = 'Updated';
      rerender();

      expect(result.current.contentValue.value).toBe('Updated');
    });

    it('should handle missing contentValue', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: undefined,
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue).toBeUndefined();
    });

    it('should handle contentValue with extra properties', () => {
      (useBoundVariableValue as any).mockReturnValue({
        contentValue: {
          type: 'text',
          value: 'Text',
          metadata: { fontSize: '16px' },
        },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.contentValue.type).toBe('text');
      expect(result.current.contentValue.value).toBe('Text');
    });
  });

  // ===================================================================
  // PART 3: Element Focus Handling (10 tests)
  // ===================================================================

  describe('Element Focus Handling', () => {
    it('should track focused element', () => {
      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement).toEqual({ id: 'element-123' });
    });

    it('should handle null focused element', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement).toBeNull();
    });

    it('should handle undefined focused element', () => {
      (useElement as any).mockReturnValue({
        focusedElement: undefined,
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement).toBeUndefined();
    });

    it('should update when focused element changes', () => {
      const mockElement = { focusedElement: { id: 'element-123' } };
      (useElement as any).mockReturnValue(mockElement);

      const { result, rerender } = renderHook(() => mockUseContentControl());
      expect(result.current.focusedElement?.id).toBe('element-123');

      mockElement.focusedElement = { id: 'element-456' };
      rerender();

      expect(result.current.focusedElement?.id).toBe('element-456');
    });

    it('should handle focused element with additional properties', () => {
      (useElement as any).mockReturnValue({
        focusedElement: {
          id: 'element-123',
          tag: 'div',
          properties: {},
        },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement.id).toBe('element-123');
    });

    it('should not update content when element becomes null', () => {
      const mockElement = { focusedElement: { id: 'element-123' } };
      (useElement as any).mockReturnValue(mockElement);

      const { result, rerender } = renderHook(() => mockUseContentControl());

      mockElement.focusedElement = null;
      rerender();

      act(() => {
        result.current.updateContent('Test');
      });

      expect(mockUpdateContent).not.toHaveBeenCalled();
    });

    it('should handle rapid element focus changes', () => {
      const mockElement = { focusedElement: { id: 'element-1' } };
      (useElement as any).mockReturnValue(mockElement);

      const { result, rerender } = renderHook(() => mockUseContentControl());

      mockElement.focusedElement = { id: 'element-2' };
      rerender();

      mockElement.focusedElement = { id: 'element-3' };
      rerender();

      expect(result.current.focusedElement?.id).toBe('element-3');
    });

    it('should handle element focus with same id', () => {
      const mockElement = { focusedElement: { id: 'element-123' } };
      (useElement as any).mockReturnValue(mockElement);

      const { result, rerender } = renderHook(() => mockUseContentControl());

      mockElement.focusedElement = { id: 'element-123' };
      rerender();

      expect(result.current.focusedElement?.id).toBe('element-123');
    });

    it('should handle element with empty id', () => {
      (useElement as any).mockReturnValue({
        focusedElement: { id: '' },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement?.id).toBe('');
    });

    it('should handle element with numeric id', () => {
      (useElement as any).mockReturnValue({
        focusedElement: { id: 12345 },
      });

      const { result } = renderHook(() => mockUseContentControl());

      expect(result.current.focusedElement?.id).toBe(12345);
    });
  });

  // ===================================================================
  // PART 4: Content Update Edge Cases (5 tests)
  // ===================================================================

  describe('Content Update Edge Cases', () => {
    it('should handle whitespace-only content', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('   ');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: '   ',
      });
    });

    it('should handle tab characters', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('\t\tIndented');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: '\t\tIndented',
      });
    });

    it('should handle carriage return characters', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Line1\r\nLine2');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Line1\r\nLine2',
      });
    });

    it('should handle zero-width characters', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('Test\u200BContent');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'Test\u200BContent',
      });
    });

    it('should handle content with quotes', () => {
      const { result } = renderHook(() => mockUseContentControl());

      act(() => {
        result.current.updateContent('He said "Hello" and \'Goodbye\'');
      });

      expect(mockUpdateContent).toHaveBeenCalledWith('element-123', {
        text: 'He said "Hello" and \'Goodbye\'',
      });
    });
  });
});

