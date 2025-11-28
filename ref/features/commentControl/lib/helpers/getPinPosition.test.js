// ===================================================================
// Unit Tests for getPinPosition
// CRITICAL BUSINESS LOGIC - Comment Pin Positioning
// Week 2, Day 4 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getPinPosition } from './getPinPosition';

describe('getPinPosition - Comment Pin Positioning', () => {
  let mockElement;

  beforeEach(() => {
    // Mock DOM element with getBoundingClientRect
    mockElement = {
      getBoundingClientRect: vi.fn(() => ({
        left: 100,
        top: 200,
        width: 400,
        height: 300,
      })),
    };

    // Mock querySelector
    document.querySelector = vi.fn((selector) => {
      if (selector === '[data-ui-id="element-1"]') {
        return mockElement;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // PART 1: Basic Pin Position Calculation (5 tests)
  // ===================================================================

  describe('Basic Pin Position Calculation', () => {
    it('should calculate position at center (0.5, 0.5)', () => {
      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      // center: left: 100 + (400 * 0.5) = 300, top: 200 + (300 * 0.5) = 350
      expect(result).toEqual({
        x: 300,
        y: 350,
      });
      expect(document.querySelector).toHaveBeenCalledWith('[data-ui-id="element-1"]');
    });

    it('should calculate position at top-left (0, 0)', () => {
      const pin = { x: 0, y: 0 };
      const result = getPinPosition(pin, 'element-1');

      // top-left: left: 100 + 0 = 100, top: 200 + 0 = 200
      expect(result).toEqual({
        x: 100,
        y: 200,
      });
    });

    it('should calculate position at bottom-right (1, 1)', () => {
      const pin = { x: 1, y: 1 };
      const result = getPinPosition(pin, 'element-1');

      // bottom-right: left: 100 + 400 = 500, top: 200 + 300 = 500
      expect(result).toEqual({
        x: 500,
        y: 500,
      });
    });

    it('should calculate position at top-right (1, 0)', () => {
      const pin = { x: 1, y: 0 };
      const result = getPinPosition(pin, 'element-1');

      // top-right: left: 100 + 400 = 500, top: 200 + 0 = 200
      expect(result).toEqual({
        x: 500,
        y: 200,
      });
    });

    it('should calculate position at bottom-left (0, 1)', () => {
      const pin = { x: 0, y: 1 };
      const result = getPinPosition(pin, 'element-1');

      // bottom-left: left: 100 + 0 = 100, top: 200 + 300 = 500
      expect(result).toEqual({
        x: 100,
        y: 500,
      });
    });
  });

  // ===================================================================
  // PART 2: Fractional Positions (5 tests)
  // ===================================================================

  describe('Fractional Positions', () => {
    it('should calculate position at (0.25, 0.25)', () => {
      const pin = { x: 0.25, y: 0.25 };
      const result = getPinPosition(pin, 'element-1');

      // left: 100 + (400 * 0.25) = 200, top: 200 + (300 * 0.25) = 275
      expect(result).toEqual({
        x: 200,
        y: 275,
      });
    });

    it('should calculate position at (0.75, 0.75)', () => {
      const pin = { x: 0.75, y: 0.75 };
      const result = getPinPosition(pin, 'element-1');

      // left: 100 + (400 * 0.75) = 400, top: 200 + (300 * 0.75) = 425
      expect(result).toEqual({
        x: 400,
        y: 425,
      });
    });

    it('should calculate position at (0.33, 0.66)', () => {
      const pin = { x: 0.33, y: 0.66 };
      const result = getPinPosition(pin, 'element-1');

      // left: 100 + (400 * 0.33) = 232, top: 200 + (300 * 0.66) = 398
      expect(result).toEqual({
        x: 232,
        y: 398,
      });
    });

    it('should calculate position with high precision (0.123, 0.456)', () => {
      const pin = { x: 0.123, y: 0.456 };
      const result = getPinPosition(pin, 'element-1');

      // left: 100 + (400 * 0.123) = 149.2, top: 200 + (300 * 0.456) = 336.8
      expect(result).toEqual({
        x: 149.2,
        y: 336.8,
      });
    });

    it('should handle very small decimals (0.001, 0.001)', () => {
      const pin = { x: 0.001, y: 0.001 };
      const result = getPinPosition(pin, 'element-1');

      // left: 100 + (400 * 0.001) = 100.4, top: 200 + (300 * 0.001) = 200.3
      expect(result).toEqual({
        x: 100.4,
        y: 200.3,
      });
    });
  });

  // ===================================================================
  // PART 3: Different Element Sizes (4 tests)
  // ===================================================================

  describe('Different Element Sizes', () => {
    it('should handle small element (50x50)', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 10,
        top: 20,
        width: 50,
        height: 50,
      }));

      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 35,
        y: 45,
      });
    });

    it('should handle large element (1920x1080)', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
      }));

      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 960,
        y: 540,
      });
    });

    it('should handle wide element (800x100)', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 50,
        top: 100,
        width: 800,
        height: 100,
      }));

      const pin = { x: 0.75, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 650,
        y: 150,
      });
    });

    it('should handle tall element (100x800)', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 50,
        top: 100,
        width: 100,
        height: 800,
      }));

      const pin = { x: 0.5, y: 0.75 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 100,
        y: 700,
      });
    });
  });

  // ===================================================================
  // PART 4: Element Not Found (3 tests)
  // ===================================================================

  describe('Element Not Found', () => {
    it('should return {left: 0, top: 0} when element not found', () => {
      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'non-existent');

      expect(result).toEqual({
        left: 0,
        top: 0,
      });
      expect(document.querySelector).toHaveBeenCalledWith('[data-ui-id="non-existent"]');
    });

    it('should handle null targetId', () => {
      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, null);

      expect(result).toEqual({
        left: 0,
        top: 0,
      });
    });

    it('should handle undefined targetId', () => {
      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, undefined);

      expect(result).toEqual({
        left: 0,
        top: 0,
      });
    });
  });

  // ===================================================================
  // PART 5: Edge Cases (3 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle zero-sized element', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 100,
        top: 200,
        width: 0,
        height: 0,
      }));

      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 100,
        y: 200,
      });
    });

    it('should handle negative coordinates', () => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: -50,
        top: -100,
        width: 200,
        height: 150,
      }));

      const pin = { x: 0.5, y: 0.5 };
      const result = getPinPosition(pin, 'element-1');

      expect(result).toEqual({
        x: 50,
        y: -25,
      });
    });

    it('should verify querySelector is called with correct selector', () => {
      const pin = { x: 0, y: 0 };
      getPinPosition(pin, 'my-element-id');

      expect(document.querySelector).toHaveBeenCalledWith('[data-ui-id="my-element-id"]');
    });
  });
});
