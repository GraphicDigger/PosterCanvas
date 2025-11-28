// ===================================================================
// Unit Tests for getElementInfo
// FEATURE UTILITY - Extract DOM Element Information from Mouse Event
// Day 1 of Path to 65% - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getElementInfo } from './getElementInfo';

describe('getElementInfo', () => {
  let mockElement: HTMLElement;
  let mockSurfaceElement: HTMLElement;
  let mockEvent: Partial<React.MouseEvent>;

  beforeEach(() => {
    // Create mock surface element (StyledSurface)
    mockSurfaceElement = document.createElement('div');
    mockSurfaceElement.id = 'styled-surface';
    mockSurfaceElement.style.display = 'block';
    document.body.appendChild(mockSurfaceElement);

    // Create mock target element
    mockElement = document.createElement('div');
    mockElement.id = 'target-element';
    mockElement.className = 'test-class';
    mockElement.dataset.testId = 'test-123';
    document.body.appendChild(mockElement);

    // Mock getBoundingClientRect
    vi.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 200,
      width: 300,
      height: 150,
      right: 400,
      bottom: 350,
      x: 100,
      y: 200,
      toJSON: () => ({}),
    });

    // Mock elementFromPoint (JSDOM doesn't have this by default)
    document.elementFromPoint = vi.fn().mockReturnValue(mockElement);

    // Create mock event
    mockEvent = {
      clientX: 250,
      clientY: 275,
      currentTarget: mockSurfaceElement,
    } as any;
  });

  afterEach(() => {
    document.body.removeChild(mockSurfaceElement);
    document.body.removeChild(mockElement);
    vi.restoreAllMocks();
  });

  // ===================================================================
  // PART 1: Basic Functionality (5 tests)
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return element info when element is found', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result).not.toBeNull();
      expect(result?.element).toBe(mockElement);
    });

    it('should return null when no element is found', () => {
      document.elementFromPoint = vi.fn().mockReturnValue(null);

      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result).toBeNull();
    });

    it('should temporarily hide surface element', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      // Surface should be visible again after execution
      expect(mockSurfaceElement.style.display).toBe('block');
      expect(result).not.toBeNull();
    });

    it('should call elementFromPoint with correct coordinates', () => {
      const spy = document.elementFromPoint as any;

      getElementInfo(mockEvent as React.MouseEvent);

      expect(spy).toHaveBeenCalledWith(250, 275);
    });

    it('should restore surface display after getting element', () => {
      mockSurfaceElement.style.display = 'flex';

      getElementInfo(mockEvent as React.MouseEvent);

      expect(mockSurfaceElement.style.display).toBe('flex');
    });
  });

  // ===================================================================
  // PART 2: Element Information Extraction (6 tests)
  // ===================================================================

  describe('Element Information Extraction', () => {
    it('should extract element ID', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.id).toBe('target-element');
    });

    it('should extract element className', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.className).toBe('test-class');
    });

    it('should extract element tagName', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.tagName).toBe('DIV');
    });

    it('should extract element dataset', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.dataset).toBeDefined();
      expect(result?.dataset.testId).toBe('test-123');
    });

    it('should extract element rect information', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.rect).toEqual({
        left: 100,
        top: 200,
        width: 300,
        height: 150,
      });
    });

    it('should handle element without ID', () => {
      mockElement.id = '';

      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.id).toBe('');
      expect(result?.element).toBe(mockElement);
    });
  });

  // ===================================================================
  // PART 3: Coordinate Calculations (5 tests)
  // ===================================================================

  describe('Coordinate Calculations', () => {
    it('should calculate relative X coordinate correctly', () => {
      // clientX: 250, rect.left: 100, rect.width: 300
      // relativeX = (250 - 100) / 300 = 0.5
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.relativeX).toBe(0.5);
    });

    it('should calculate relative Y coordinate correctly', () => {
      // clientY: 275, rect.top: 200, rect.height: 150
      // relativeY = (275 - 200) / 150 = 0.5
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.relativeY).toBe(0.5);
    });

    it('should store absolute X coordinate', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.absoluteX).toBe(250);
    });

    it('should store absolute Y coordinate', () => {
      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.absoluteY).toBe(275);
    });

    it('should handle click at element origin (0,0)', () => {
      mockEvent.clientX = 100;
      mockEvent.clientY = 200;

      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.relativeX).toBe(0);
      expect(result?.relativeY).toBe(0);
    });
  });

  // ===================================================================
  // PART 4: Edge Cases (4 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle click at element bottom-right corner', () => {
      mockEvent.clientX = 400; // left + width = 100 + 300
      mockEvent.clientY = 350; // top + height = 200 + 150

      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.relativeX).toBe(1);
      expect(result?.relativeY).toBe(1);
    });

    it('should handle element with zero width', () => {
      mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
        left: 100,
        top: 200,
        width: 0,
        height: 150,
        right: 100,
        bottom: 350,
        x: 100,
        y: 200,
        toJSON: () => ({}),
      });

      const result = getElementInfo(mockEvent as React.MouseEvent);

      // Division by zero should result in Infinity
      expect(result?.relativeX).toBe(Infinity);
    });

    it('should handle element with zero height', () => {
      mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
        left: 100,
        top: 200,
        width: 300,
        height: 0,
        right: 400,
        bottom: 200,
        x: 100,
        y: 200,
        toJSON: () => ({}),
      });

      const result = getElementInfo(mockEvent as React.MouseEvent);

      // Division by zero should result in Infinity
      expect(result?.relativeY).toBe(Infinity);
    });

    it('should handle multiple dataset attributes', () => {
      mockElement.dataset.testId = 'test-123';
      mockElement.dataset.componentId = 'comp-456';
      mockElement.dataset.screenId = 'screen-789';

      const result = getElementInfo(mockEvent as React.MouseEvent);

      expect(result?.dataset.testId).toBe('test-123');
      expect(result?.dataset.componentId).toBe('comp-456');
      expect(result?.dataset.screenId).toBe('screen-789');
    });
  });
});

