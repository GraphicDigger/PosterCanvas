/**
 * Unit Tests for useKeyboard Hook
 *
 * Phase 5 - Week 3 Day 1: High-Risk Utilities
 *
 * Purpose: Test keyboard event handling hook
 * Coverage Target: 95%+ for useKeyboard hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Basic Key Handlers (10 tests)
 * 2. Custom Keys (8 tests)
 * 3. Enabled/Disabled State (6 tests)
 * 4. Event Prevention (6 tests)
 * 5. Cleanup & Memory Leaks (5 tests)
 * 6. Edge Cases (5 tests)
 *
 * Total: 40 tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboard } from './useKeyboard';

describe('useKeyboard Hook', () => {
  let mockEscapeHandler: ReturnType<typeof vi.fn>;
  let mockEnterHandler: ReturnType<typeof vi.fn>;
  let mockArrowUpHandler: ReturnType<typeof vi.fn>;
  let mockArrowDownHandler: ReturnType<typeof vi.fn>;
  let mockKeyDownHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockEscapeHandler = vi.fn();
    mockEnterHandler = vi.fn();
    mockArrowUpHandler = vi.fn();
    mockArrowDownHandler = vi.fn();
    mockKeyDownHandler = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: BASIC KEY HANDLERS (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Basic Key Handlers', () => {
    it('should call onEscape when Escape key is pressed', () => {
      renderHook(() => useKeyboard({ onEscape: mockEscapeHandler }));

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
      expect(mockEscapeHandler).toHaveBeenCalledWith(event);
    });

    it('should call onEnter when Enter key is pressed', () => {
      renderHook(() => useKeyboard({ onEnter: mockEnterHandler }));

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);

      expect(mockEnterHandler).toHaveBeenCalledTimes(1);
      expect(mockEnterHandler).toHaveBeenCalledWith(event);
    });

    it('should call onArrowUp when ArrowUp key is pressed', () => {
      renderHook(() => useKeyboard({ onArrowUp: mockArrowUpHandler }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      document.dispatchEvent(event);

      expect(mockArrowUpHandler).toHaveBeenCalledTimes(1);
      expect(mockArrowUpHandler).toHaveBeenCalledWith(event);
    });

    it('should call onArrowDown when ArrowDown key is pressed', () => {
      renderHook(() => useKeyboard({ onArrowDown: mockArrowDownHandler }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      document.dispatchEvent(event);

      expect(mockArrowDownHandler).toHaveBeenCalledTimes(1);
      expect(mockArrowDownHandler).toHaveBeenCalledWith(event);
    });

    it('should call multiple handlers when multiple keys are configured', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          onEnter: mockEnterHandler,
        }),
      );

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(enterEvent);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
      expect(mockEnterHandler).toHaveBeenCalledTimes(1);
    });

    it('should not call handler for unregistered keys', () => {
      renderHook(() => useKeyboard({ onEscape: mockEscapeHandler }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).not.toHaveBeenCalled();
    });

    it('should call onKeyDown for all key presses', () => {
      renderHook(() => useKeyboard({ onKeyDown: mockKeyDownHandler }));

      const event1 = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event1);

      const event2 = new KeyboardEvent('keydown', { key: 'b' });
      document.dispatchEvent(event2);

      expect(mockKeyDownHandler).toHaveBeenCalledTimes(2);
    });

    it('should call onKeyDown before specific handlers', () => {
      const callOrder: string[] = [];

      renderHook(() =>
        useKeyboard({
          onKeyDown: () => callOrder.push('onKeyDown'),
          onEscape: () => callOrder.push('onEscape'),
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(callOrder).toEqual(['onKeyDown', 'onEscape']);
    });

    it('should handle rapid key presses', () => {
      renderHook(() => useKeyboard({ onEscape: mockEscapeHandler }));

      for (let i = 0; i < 10; i++) {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }

      expect(mockEscapeHandler).toHaveBeenCalledTimes(10);
    });

    it('should handle all arrow keys', () => {
      const mockArrowLeftHandler = vi.fn();
      const mockArrowRightHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          onArrowUp: mockArrowUpHandler,
          onArrowDown: mockArrowDownHandler,
          keys: {
            ArrowLeft: mockArrowLeftHandler,
            ArrowRight: mockArrowRightHandler,
          },
        }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(mockArrowUpHandler).toHaveBeenCalledTimes(1);
      expect(mockArrowDownHandler).toHaveBeenCalledTimes(1);
      expect(mockArrowLeftHandler).toHaveBeenCalledTimes(1);
      expect(mockArrowRightHandler).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: CUSTOM KEYS (8 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Custom Keys', () => {
    it('should handle custom key handlers via keys prop', () => {
      const mockCustomHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: { a: mockCustomHandler },
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);

      expect(mockCustomHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple custom keys', () => {
      const mockAHandler = vi.fn();
      const mockBHandler = vi.fn();
      const mockCHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: {
            a: mockAHandler,
            b: mockBHandler,
            c: mockCHandler,
          },
        }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));

      expect(mockAHandler).toHaveBeenCalledTimes(1);
      expect(mockBHandler).toHaveBeenCalledTimes(1);
      expect(mockCHandler).toHaveBeenCalledTimes(1);
    });

    it('should prioritize custom keys over default handlers', () => {
      const mockCustomEscapeHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          keys: { Escape: mockCustomEscapeHandler },
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      // Custom handler should override default
      expect(mockCustomEscapeHandler).toHaveBeenCalledTimes(1);
      expect(mockEscapeHandler).not.toHaveBeenCalled();
    });

    it('should handle special keys like Space', () => {
      const mockSpaceHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: { ' ': mockSpaceHandler },
        }),
      );

      const event = new KeyboardEvent('keydown', { key: ' ' });
      document.dispatchEvent(event);

      expect(mockSpaceHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle Tab key', () => {
      const mockTabHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: { Tab: mockTabHandler },
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(event);

      expect(mockTabHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle function keys (F1-F12)', () => {
      const mockF1Handler = vi.fn();
      const mockF12Handler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: {
            F1: mockF1Handler,
            F12: mockF12Handler,
          },
        }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F12' }));

      expect(mockF1Handler).toHaveBeenCalledTimes(1);
      expect(mockF12Handler).toHaveBeenCalledTimes(1);
    });

    it('should handle numeric keys', () => {
      const mock1Handler = vi.fn();
      const mock9Handler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: {
            '1': mock1Handler,
            '9': mock9Handler,
          },
        }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '9' }));

      expect(mock1Handler).toHaveBeenCalledTimes(1);
      expect(mock9Handler).toHaveBeenCalledTimes(1);
    });

    it('should handle empty keys object', () => {
      renderHook(() =>
        useKeyboard({
          keys: {},
          onEscape: mockEscapeHandler,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: ENABLED/DISABLED STATE (6 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Enabled/Disabled State', () => {
    it('should not call handlers when enabled is false', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          enabled: false,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).not.toHaveBeenCalled();
    });

    it('should call handlers when enabled is true', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          enabled: true,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
    });

    it('should default to enabled when enabled prop is not provided', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
    });

    it('should toggle handlers when enabled changes', () => {
      const { rerender } = renderHook(
        ({ enabled }) =>
          useKeyboard({
            onEscape: mockEscapeHandler,
            enabled,
          }),
        { initialProps: { enabled: true } },
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);

      rerender({ enabled: false });
      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1); // Still 1, not called again

      rerender({ enabled: true });
      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(2); // Called again
    });

    it('should handle enabled=undefined as enabled=true', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          enabled: undefined,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
    });

    it('should not add event listener when initially disabled', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

      renderHook(() =>
        useKeyboard({
          onEscape: mockEscapeHandler,
          enabled: false,
        }),
      );

      // Should not have added keydown listener
      expect(addEventListenerSpy).not.toHaveBeenCalledWith('keydown', expect.any(Function));

      addEventListenerSpy.mockRestore();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: EVENT PREVENTION (6 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event Prevention', () => {
    it('should prevent default for handled keys', () => {
      renderHook(() => useKeyboard({ onEscape: mockEscapeHandler }));

      const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default for unhandled keys', () => {
      renderHook(() => useKeyboard({ onEscape: mockEscapeHandler }));

      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should prevent default for custom keys', () => {
      const mockCustomHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: { a: mockCustomHandler },
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default for arrow keys', () => {
      renderHook(() => useKeyboard({ onArrowUp: mockArrowUpHandler }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default when onKeyDown is the only handler', () => {
      renderHook(() => useKeyboard({ onKeyDown: mockKeyDownHandler }));

      const event = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should prevent default even when onKeyDown is also defined', () => {
      renderHook(() =>
        useKeyboard({
          onKeyDown: mockKeyDownHandler,
          onEscape: mockEscapeHandler,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      document.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 5: CLEANUP & MEMORY LEAKS (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Cleanup & Memory Leaks', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = renderHook(() =>
        useKeyboard({ onEscape: mockEscapeHandler }),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('should not call handlers after unmount', () => {
      const { unmount } = renderHook(() =>
        useKeyboard({ onEscape: mockEscapeHandler }),
      );

      unmount();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(mockEscapeHandler).not.toHaveBeenCalled();
    });

    it('should update handlers when they change', () => {
      const mockNewEscapeHandler = vi.fn();

      const { rerender } = renderHook(
        ({ handler }) => useKeyboard({ onEscape: handler }),
        { initialProps: { handler: mockEscapeHandler } },
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);

      rerender({ handler: mockNewEscapeHandler });
      document.dispatchEvent(event);
      expect(mockNewEscapeHandler).toHaveBeenCalledTimes(1);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1); // Old handler not called again
    });

    it('should handle multiple mount/unmount cycles', () => {
      const { unmount: unmount1 } = renderHook(() =>
        useKeyboard({ onEscape: mockEscapeHandler }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);

      unmount1();

      const { unmount: unmount2 } = renderHook(() =>
        useKeyboard({ onEscape: mockEscapeHandler }),
      );

      document.dispatchEvent(event);
      expect(mockEscapeHandler).toHaveBeenCalledTimes(2);

      unmount2();
    });

    it('should not leak memory with rapid rerenders', () => {
      const { rerender } = renderHook(
        ({ count }) =>
          useKeyboard({
            onEscape: mockEscapeHandler,
            keys: { a: () => count },
          }),
        { initialProps: { count: 0 } },
      );

      for (let i = 0; i < 100; i++) {
        rerender({ count: i });
      }

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      // Should only be called once despite 100 rerenders
      expect(mockEscapeHandler).toHaveBeenCalledTimes(1);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 6: EDGE CASES (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('should handle hook with no options', () => {
      expect(() => renderHook(() => useKeyboard())).not.toThrow();
    });

    it('should handle hook with empty options object', () => {
      expect(() => renderHook(() => useKeyboard({}))).not.toThrow();
    });

    it('should handle undefined handlers gracefully', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: undefined,
          onEnter: undefined,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      expect(() => document.dispatchEvent(event)).not.toThrow();
    });

    it('should handle null handlers gracefully', () => {
      renderHook(() =>
        useKeyboard({
          onEscape: null as any,
          onEnter: null as any,
        }),
      );

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      expect(() => document.dispatchEvent(event)).not.toThrow();
    });

    it('should handle case-sensitive keys correctly', () => {
      const mockLowerAHandler = vi.fn();
      const mockUpperAHandler = vi.fn();

      renderHook(() =>
        useKeyboard({
          keys: {
            a: mockLowerAHandler,
            A: mockUpperAHandler,
          },
        }),
      );

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));

      expect(mockLowerAHandler).toHaveBeenCalledTimes(1);
      expect(mockUpperAHandler).toHaveBeenCalledTimes(1);
    });
  });
});

