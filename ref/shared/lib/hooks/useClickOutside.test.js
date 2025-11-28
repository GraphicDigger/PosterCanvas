// ===================================================================
// Unit Tests for useClickOutside Hook
// Coverage Target: 95%+
// Infrastructure Phase (Testing Shared Utilities - Toward 2,500!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';
import { createRef } from 'react';

describe('useClickOutside Hook', () => {
  let handler;
  let ref;
  let element;

  beforeEach(() => {
    handler = vi.fn();
    ref = createRef();
    element = document.createElement('div');
    element.setAttribute('data-testid', 'inside-element');
    document.body.appendChild(element);
    // @ts-ignore - Manually assign current for testing
    ref.current = element;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should call handler when clicking outside', () => {
      renderHook(() => useClickOutside(ref, handler));

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should NOT call handler when clicking inside', () => {
      renderHook(() => useClickOutside(ref, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      element.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should NOT call handler when clicking on the ref element itself', () => {
      renderHook(() => useClickOutside(ref, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: element, enumerable: true });
      element.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Refs Support', () => {
    it('should handle array of refs', () => {
      const ref1 = createRef();
      const ref2 = createRef();
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      document.body.appendChild(element1);
      document.body.appendChild(element2);

      // @ts-ignore
      ref1.current = element1;
      // @ts-ignore
      ref2.current = element2;

      renderHook(() => useClickOutside([ref1, ref2], handler));

      // Click outside both
      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should NOT call handler when clicking inside any of multiple refs', () => {
      const ref1 = createRef();
      const ref2 = createRef();
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      document.body.appendChild(element1);
      document.body.appendChild(element2);

      // @ts-ignore
      ref1.current = element1;
      // @ts-ignore
      ref2.current = element2;

      renderHook(() => useClickOutside([ref1, ref2], handler));

      // Click inside ref1
      const event1 = new MouseEvent('mousedown', { bubbles: true });
      element1.dispatchEvent(event1);
      expect(handler).not.toHaveBeenCalled();

      // Click inside ref2
      const event2 = new MouseEvent('mousedown', { bubbles: true });
      element2.dispatchEvent(event2);
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Nested Elements', () => {
    it('should NOT call handler when clicking on child element', () => {
      const childElement = document.createElement('span');
      childElement.textContent = 'Child';
      element.appendChild(childElement);

      renderHook(() => useClickOutside(ref, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: childElement, enumerable: true });
      childElement.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle deeply nested elements', () => {
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      const child3 = document.createElement('span');

      element.appendChild(child1);
      child1.appendChild(child2);
      child2.appendChild(child3);

      renderHook(() => useClickOutside(ref, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: child3, enumerable: true });
      child3.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Ref State Handling', () => {
    it('should call handler when ref has no current (treats as no protected area)', () => {
      const emptyRef = createRef();

      renderHook(() => useClickOutside(emptyRef, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      // When ref.current is null, it's skipped in the check, so any click calls handler
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should handle array with some empty refs', () => {
      const validRef = createRef();
      const emptyRef = createRef();
      const validElement = document.createElement('div');
      document.body.appendChild(validElement);

      // @ts-ignore
      validRef.current = validElement;

      renderHook(() => useClickOutside([validRef, emptyRef], handler));

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should handle null ref', () => {
      renderHook(() => useClickOutside(null, handler));

      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      // Should not crash
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Event Cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = renderHook(() => useClickOutside(ref, handler));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('should NOT call handler after unmount', () => {
      const { unmount } = renderHook(() => useClickOutside(ref, handler));

      unmount();

      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Shadow DOM Support', () => {
    it('should handle composedPath for Shadow DOM', () => {
      const shadowElement = document.createElement('div');
      document.body.appendChild(shadowElement);

      renderHook(() => useClickOutside(ref, handler));

      // Create event with composedPath
      const event = new MouseEvent('mousedown', { bubbles: true, composed: true });
      const path = [shadowElement, document.body, document.documentElement];
      Object.defineProperty(event, 'composedPath', {
        value: () => path,
        enumerable: true,
      });

      shadowElement.dispatchEvent(event);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should NOT call handler when element is in composedPath', () => {
      renderHook(() => useClickOutside(ref, handler));

      const event = new MouseEvent('mousedown', { bubbles: true, composed: true });
      const path = [element, document.body, document.documentElement];
      Object.defineProperty(event, 'composedPath', {
        value: () => path,
        enumerable: true,
      });

      document.body.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Handler Updates', () => {
    it('should use latest handler', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const { rerender } = renderHook(
        ({ handler }) => useClickOutside(ref, handler),
        { initialProps: { handler: handler1 } },
      );

      // Update handler
      rerender({ handler: handler2 });

      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple clicks', () => {
      renderHook(() => useClickOutside(ref, handler));

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      // Click 3 times
      for (let i = 0; i < 3; i++) {
        const event = new MouseEvent('mousedown', { bubbles: true });
        outsideElement.dispatchEvent(event);
      }

      expect(handler).toHaveBeenCalledTimes(3);
    });

    it('should handle rapid clicks alternating inside/outside', () => {
      renderHook(() => useClickOutside(ref, handler));

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      // Outside
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      // Inside
      element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1); // Still 1

      // Outside again
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(2);
    });

    it('should handle when element is removed from DOM', () => {
      renderHook(() => useClickOutside(ref, handler));

      // Remove element from DOM
      element.remove();

      const event = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(event);

      // Should still work (calls handler since element is not in DOM)
      expect(handler).toHaveBeenCalled();
    });
  });
});

