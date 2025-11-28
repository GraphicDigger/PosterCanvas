/**
 * Unit Tests for useWireframeControl Hook
 *
 * Phase 5 - Week 2 Day 4: Remaining High-Risk Areas
 *
 * Purpose: Test wireframe mode control operations
 * Coverage Target: 90%+ for useWireframeControl hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Wireframe Mode State (10 tests)
 * 2. Screen Selection (10 tests)
 * 3. Wireframe Block Operations (15 tests)
 * 4. Element Block ID (5 tests)
 *
 * Total: 40 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWireframeControl } from './useWireframeControl';

// Mock dependencies
vi.mock('../../../../../entities/wireframeBlock', () => ({
  useWireframeBlocks: vi.fn(),
  useWireframeBlockMutations: vi.fn(),
}));

vi.mock('../../../../../entities/uiScreen', () => ({
  useScreens: vi.fn(),
  useScreenStates: vi.fn(),
}));

vi.mock('../../../../../entities/mode/editorMode', () => ({
  useWireframeMode: vi.fn(),
}));

import { useWireframeBlocks, useWireframeBlockMutations } from '../../../../../entities/wireframeBlock';
import { useScreens, useScreenStates } from '../../../../../entities/uiScreen';
import { useWireframeMode } from '../../../../../entities/mode/editorMode';

describe('useWireframeControl Hook', () => {
  let mockDeleteWireframeBlock: ReturnType<typeof vi.fn>;
  let mockUnlinkWireframeBlock: ReturnType<typeof vi.fn>;
  let mockLinkWireframeBlockToUI: ReturnType<typeof vi.fn>;
  let mockCreateWireframeBlock: ReturnType<typeof vi.fn>;
  let mockGetScreenWireframeBlocks: ReturnType<typeof vi.fn>;
  let mockHandleSelectScreen: ReturnType<typeof vi.fn>;
  let mockWireframeBlocks: any[];
  let mockSelectedScreen: any;
  let mockIsPreviewMode: boolean;

  beforeEach(() => {
    mockDeleteWireframeBlock = vi.fn();
    mockUnlinkWireframeBlock = vi.fn();
    mockLinkWireframeBlockToUI = vi.fn();
    mockCreateWireframeBlock = vi.fn();
    mockGetScreenWireframeBlocks = vi.fn();
    mockHandleSelectScreen = vi.fn();
    mockWireframeBlocks = [
      { id: 'block-1', name: 'Header', linkedTo: 'element-1' },
      { id: 'block-2', name: 'Footer', linkedTo: 'element-2' },
    ];
    mockSelectedScreen = { id: 'screen-1', name: 'Home' };
    mockIsPreviewMode = false;

    (useWireframeBlockMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      deleteWireframeBlock: mockDeleteWireframeBlock,
      unlinkWireframeBlock: mockUnlinkWireframeBlock,
      linkWireframeBlockToUI: mockLinkWireframeBlockToUI,
      createWireframeBlock: mockCreateWireframeBlock,
    });

    (useWireframeBlocks as ReturnType<typeof vi.fn>).mockReturnValue({
      getScreenWireframeBlocks: mockGetScreenWireframeBlocks,
      wireframeBlocks: mockWireframeBlocks,
    });

    (useScreens as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedScreen: mockSelectedScreen,
    });

    (useScreenStates as ReturnType<typeof vi.fn>).mockReturnValue({
      handleSelect: mockHandleSelectScreen,
    });

    (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
      isPreviewMode: mockIsPreviewMode,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: WIREFRAME MODE STATE (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Wireframe Mode State', () => {
    it('should expose isPreviewMode', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(false);
    });

    it('should return true when in preview mode', () => {
      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: true,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(true);
    });

    it('should return false when not in preview mode', () => {
      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: false,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(false);
    });

    it('should update isPreviewMode when mode changes', () => {
      const { result, rerender } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(false);

      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: true,
      });
      rerender();

      expect(result.current.isPreviewMode).toBe(true);
    });

    it('should handle null isPreviewMode', () => {
      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: null,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBeNull();
    });

    it('should handle undefined isPreviewMode', () => {
      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: undefined,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBeUndefined();
    });

    it('should handle multiple mode toggles', () => {
      const { result, rerender } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(false);

      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({ isPreviewMode: true });
      rerender();
      expect(result.current.isPreviewMode).toBe(true);

      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({ isPreviewMode: false });
      rerender();
      expect(result.current.isPreviewMode).toBe(false);
    });

    it('should maintain isPreviewMode across re-renders', () => {
      const { result, rerender } = renderHook(() => useWireframeControl());

      const firstValue = result.current.isPreviewMode;
      rerender();
      const secondValue = result.current.isPreviewMode;

      expect(firstValue).toBe(secondValue);
    });

    it('should expose isPreviewMode as boolean type', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(typeof result.current.isPreviewMode).toBe('boolean');
    });

    it('should handle wireframe mode with additional properties', () => {
      (useWireframeMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isPreviewMode: true,
        otherProperty: 'value',
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.isPreviewMode).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: SCREEN SELECTION (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Screen Selection', () => {
    it('should expose handleSelectScreen function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.handleSelectScreen).toBeDefined();
      expect(typeof result.current.handleSelectScreen).toBe('function');
    });

    it('should call handleSelectScreen with screen ID', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen('screen-2');
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith('screen-2');
    });

    it('should call handleSelectScreen with different screen ID', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen('screen-3');
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith('screen-3');
    });

    it('should handle multiple screen selections', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen('screen-1');
      });

      act(() => {
        result.current.handleSelectScreen('screen-2');
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledTimes(2);
    });

    it('should call handleSelectScreen with null', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen(null);
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith(null);
    });

    it('should call handleSelectScreen with undefined', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen(undefined);
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith(undefined);
    });

    it('should call handleSelectScreen with empty string', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen('');
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith('');
    });

    it('should call handleSelectScreen with very long screen ID', () => {
      const longId = 'screen-' + 'x'.repeat(1000);
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen(longId);
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith(longId);
    });

    it('should maintain handleSelectScreen reference', () => {
      const { result } = renderHook(() => useWireframeControl());

      const firstRef = result.current.handleSelectScreen;
      const secondRef = result.current.handleSelectScreen;

      expect(firstRef).toBe(secondRef);
    });

    it('should call handleSelectScreen with numeric ID', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.handleSelectScreen(123 as any);
      });

      expect(mockHandleSelectScreen).toHaveBeenCalledWith(123);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: WIREFRAME BLOCK OPERATIONS (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Wireframe Block Operations', () => {
    it('should expose createWireframeBlock function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.createWireframeBlock).toBeDefined();
      expect(typeof result.current.createWireframeBlock).toBe('function');
    });

    it('should call createWireframeBlock', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.createWireframeBlock({ name: 'New Block' });
      });

      expect(mockCreateWireframeBlock).toHaveBeenCalledWith({ name: 'New Block' });
    });

    it('should expose deleteWireframeBlock function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.deleteWireframeBlock).toBeDefined();
      expect(typeof result.current.deleteWireframeBlock).toBe('function');
    });

    it('should call deleteWireframeBlock', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.deleteWireframeBlock('block-1');
      });

      expect(mockDeleteWireframeBlock).toHaveBeenCalledWith('block-1');
    });

    it('should expose unlinkWireframeBlock function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.unlinkWireframeBlock).toBeDefined();
      expect(typeof result.current.unlinkWireframeBlock).toBe('function');
    });

    it('should call unlinkWireframeBlock', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.unlinkWireframeBlock('block-1');
      });

      expect(mockUnlinkWireframeBlock).toHaveBeenCalledWith('block-1');
    });

    it('should expose linkWireframeBlockToUI function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.linkWireframeBlockToUI).toBeDefined();
      expect(typeof result.current.linkWireframeBlockToUI).toBe('function');
    });

    it('should call linkWireframeBlockToUI', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.linkWireframeBlockToUI('block-1', 'element-1');
      });

      expect(mockLinkWireframeBlockToUI).toHaveBeenCalledWith('block-1', 'element-1');
    });

    it('should expose getScreenWireframeBlocks function', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.getScreenWireframeBlocks).toBeDefined();
      expect(typeof result.current.getScreenWireframeBlocks).toBe('function');
    });

    it('should call getScreenWireframeBlocks', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.getScreenWireframeBlocks('screen-1');
      });

      expect(mockGetScreenWireframeBlocks).toHaveBeenCalledWith('screen-1');
    });

    it('should handle multiple block operations', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.createWireframeBlock({ name: 'Block 1' });
        result.current.deleteWireframeBlock('block-old');
        result.current.linkWireframeBlockToUI('block-1', 'element-1');
      });

      expect(mockCreateWireframeBlock).toHaveBeenCalledTimes(1);
      expect(mockDeleteWireframeBlock).toHaveBeenCalledTimes(1);
      expect(mockLinkWireframeBlockToUI).toHaveBeenCalledTimes(1);
    });

    it('should maintain function references', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.createWireframeBlock).toBe(mockCreateWireframeBlock);
      expect(result.current.deleteWireframeBlock).toBe(mockDeleteWireframeBlock);
      expect(result.current.unlinkWireframeBlock).toBe(mockUnlinkWireframeBlock);
      expect(result.current.linkWireframeBlockToUI).toBe(mockLinkWireframeBlockToUI);
      expect(result.current.getScreenWireframeBlocks).toBe(mockGetScreenWireframeBlocks);
    });

    it('should call createWireframeBlock with complex data', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.createWireframeBlock({
          name: 'Header',
          type: 'container',
          properties: { width: '100%', height: '80px' },
        });
      });

      expect(mockCreateWireframeBlock).toHaveBeenCalledWith({
        name: 'Header',
        type: 'container',
        properties: { width: '100%', height: '80px' },
      });
    });

    it('should call deleteWireframeBlock with different IDs', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.deleteWireframeBlock('block-1');
      });

      act(() => {
        result.current.deleteWireframeBlock('block-2');
      });

      expect(mockDeleteWireframeBlock).toHaveBeenCalledTimes(2);
    });

    it('should call linkWireframeBlockToUI with null element', () => {
      const { result } = renderHook(() => useWireframeControl());

      act(() => {
        result.current.linkWireframeBlockToUI('block-1', null);
      });

      expect(mockLinkWireframeBlockToUI).toHaveBeenCalledWith('block-1', null);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: ELEMENT BLOCK ID (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Element Block ID', () => {
    it('should return first wireframe block ID', () => {
      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.elementBlockId).toBe('block-1');
    });

    it('should return undefined when no wireframe blocks', () => {
      (useWireframeBlocks as ReturnType<typeof vi.fn>).mockReturnValue({
        getScreenWireframeBlocks: mockGetScreenWireframeBlocks,
        wireframeBlocks: [],
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.elementBlockId).toBeUndefined();
    });

    it('should update elementBlockId when blocks change', () => {
      const { result, rerender } = renderHook(() => useWireframeControl());

      expect(result.current.elementBlockId).toBe('block-1');

      (useWireframeBlocks as ReturnType<typeof vi.fn>).mockReturnValue({
        getScreenWireframeBlocks: mockGetScreenWireframeBlocks,
        wireframeBlocks: [{ id: 'block-new', name: 'New Block' }],
      });
      rerender();

      expect(result.current.elementBlockId).toBe('block-new');
    });

    // BUG FIXED: The hook now safely handles null/undefined wireframeBlocks
    // Fixed in Week 3 Day 1: wireframeBlocks[0]?.id → wireframeBlocks?.[0]?.id

    it('should handle null wireframe blocks', () => {
      (useWireframeBlocks as ReturnType<typeof vi.fn>).mockReturnValue({
        getScreenWireframeBlocks: mockGetScreenWireframeBlocks,
        wireframeBlocks: null,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.elementBlockId).toBeUndefined();
    });

    it('should handle undefined wireframe blocks', () => {
      (useWireframeBlocks as ReturnType<typeof vi.fn>).mockReturnValue({
        getScreenWireframeBlocks: mockGetScreenWireframeBlocks,
        wireframeBlocks: undefined,
      });

      const { result } = renderHook(() => useWireframeControl());

      expect(result.current.elementBlockId).toBeUndefined();
    });
  });
});

