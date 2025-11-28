// ===================================================================
// Unit Tests for debounce - Preventing Frequent Updates
// Coverage Target: 100%
// Phase 5 - Final Push: Debounce Utility (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './preventingFrequentUpdates';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic functionality', () => {
    it('should debounce function calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call function after wait time', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 200);

      debouncedFunc();
      vi.advanceTimersByTime(200);

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should not call function before wait time', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 300);

      debouncedFunc();
      vi.advanceTimersByTime(299);

      expect(func).not.toHaveBeenCalled();
    });
  });

  describe('Multiple calls', () => {
    it('should only call function once for multiple rapid calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on each call', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      vi.advanceTimersByTime(50);
      debouncedFunc();
      vi.advanceTimersByTime(50);

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should handle many rapid calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      for (let i = 0; i < 10; i++) {
        debouncedFunc();
        vi.advanceTimersByTime(10);
      }

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('Arguments', () => {
    it('should pass arguments to debounced function', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('arg1', 'arg2', 'arg3');
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });

    it('should pass last call arguments when multiple calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('first');
      debouncedFunc('second');
      debouncedFunc('third');

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledWith('third');
    });

    it('should handle no arguments', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith();
    });

    it('should handle object arguments', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      const obj = { key: 'value' };
      debouncedFunc(obj);
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith(obj);
    });

    it('should handle array arguments', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      const arr = [1, 2, 3];
      debouncedFunc(arr);
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith(arr);
    });

    it('should handle multiple argument types', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('string', 123, true, null, undefined);
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith('string', 123, true, null, undefined);
    });
  });

  describe('Wait times', () => {
    it('should handle different wait times', () => {
      const func1 = vi.fn();
      const func2 = vi.fn();
      const debouncedFunc1 = debounce(func1, 50);
      const debouncedFunc2 = debounce(func2, 200);

      debouncedFunc1();
      debouncedFunc2();

      vi.advanceTimersByTime(50);
      expect(func1).toHaveBeenCalledTimes(1);
      expect(func2).not.toHaveBeenCalled();

      vi.advanceTimersByTime(150);
      expect(func2).toHaveBeenCalledTimes(1);
    });

    it('should handle zero wait time', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 0);

      debouncedFunc();
      vi.advanceTimersByTime(0);

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should handle very long wait time', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 5000);

      debouncedFunc();
      vi.advanceTimersByTime(4999);
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('Independent debounced functions', () => {
    it('should create independent debounced functions', () => {
      const func = vi.fn();
      const debounced1 = debounce(func, 100);
      const debounced2 = debounce(func, 100);

      debounced1();
      debounced2();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(2);
    });

    it('should not interfere with each other', () => {
      const func1 = vi.fn();
      const func2 = vi.fn();
      const debounced1 = debounce(func1, 100);
      const debounced2 = debounce(func2, 100);

      debounced1('arg1');
      debounced2('arg2');

      vi.advanceTimersByTime(100);

      expect(func1).toHaveBeenCalledWith('arg1');
      expect(func2).toHaveBeenCalledWith('arg2');
    });
  });

  describe('Edge cases', () => {
    it('should handle function that throws error', () => {
      const func = vi.fn(() => {
        throw new Error('Test error');
      });
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();

      expect(() => {
        vi.advanceTimersByTime(100);
      }).toThrow('Test error');
    });

    it('should handle undefined function', () => {
      const debouncedFunc = debounce(undefined, 100);

      expect(() => {
        debouncedFunc();
        vi.advanceTimersByTime(100);
      }).toThrow();
    });

    it('should handle function that returns value', () => {
      const func = vi.fn(() => 'return value');
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      vi.advanceTimersByTime(100);

      expect(func).toHaveReturnedWith('return value');
    });
  });

  describe('Cancellation behavior', () => {
    it('should cancel previous timeout when called again', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('first');
      vi.advanceTimersByTime(50);
      debouncedFunc('second');
      vi.advanceTimersByTime(50);

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith('second');
    });

    it('should handle rapid cancellations', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      for (let i = 0; i < 5; i++) {
        debouncedFunc(`call-${i}`);
        vi.advanceTimersByTime(20);
      }

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith('call-4');
    });
  });
});

