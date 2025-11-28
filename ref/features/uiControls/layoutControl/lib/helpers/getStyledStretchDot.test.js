// ===================================================================
// Unit Tests for getStyledStretchDot
// CRITICAL BUSINESS LOGIC - Layout Control Styling
// Week 2, Day 3 - Part 3 (20 tests)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';

// Mock constants - inline with vi.mock
vi.mock('../../../../../entities/uiElement', () => ({
  DIRECTION: {
    row: 'row',
    column: 'column',
    rowReverse: 'row-reverse',
    columnReverse: 'column-reverse',
  },
}));

vi.mock('../../model', () => ({
  POSITION: {
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    TOP_RIGHT: 'top-right',
    CENTER_LEFT: 'center-left',
    CENTER_CENTER: 'center-center',
    CENTER_RIGHT: 'center-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_RIGHT: 'bottom-right',
  },
}));

import { getStyledStretchDot } from './getStyledStretchDot';
import { DIRECTION } from '../../../../../entities/uiElement';
import { POSITION } from '../../model';

describe('getStyledStretchDot - Layout Control Styling', () => {
  // ===================================================================
  // PART 1: Row Direction - Top Row (3 tests)
  // ===================================================================

  describe('Row Direction - Top Row', () => {
    it('should style TOP_LEFT cell with top rounded corners', () => {
      const result = getStyledStretchDot(POSITION.TOP_LEFT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: '3px 3px 0 0',
        margin: '6px 0 0 0',
      });
    });

    it('should style TOP_CENTER cell with top rounded corners', () => {
      const result = getStyledStretchDot(POSITION.TOP_CENTER, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: '3px 3px 0 0',
        margin: '6px 0 0 0',
      });
    });

    it('should style TOP_RIGHT cell with top rounded corners', () => {
      const result = getStyledStretchDot(POSITION.TOP_RIGHT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: '3px 3px 0 0',
        margin: '6px 0 0 0',
      });
    });
  });

  // ===================================================================
  // PART 2: Row Direction - Center Row (3 tests)
  // ===================================================================

  describe('Row Direction - Center Row', () => {
    it('should style CENTER_LEFT cell with full height', () => {
      const result = getStyledStretchDot(POSITION.CENTER_LEFT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '100%',
      });
    });

    it('should style CENTER_CENTER cell with full height', () => {
      const result = getStyledStretchDot(POSITION.CENTER_CENTER, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '100%',
      });
    });

    it('should style CENTER_RIGHT cell with full height', () => {
      const result = getStyledStretchDot(POSITION.CENTER_RIGHT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '100%',
      });
    });
  });

  // ===================================================================
  // PART 3: Row Direction - Bottom Row (3 tests)
  // ===================================================================

  describe('Row Direction - Bottom Row', () => {
    it('should style BOTTOM_LEFT cell with bottom rounded corners', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_LEFT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: ' 0 0 3px 3px',
        margin: '0 0 6px 0',
      });
    });

    it('should style BOTTOM_CENTER cell with bottom rounded corners', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_CENTER, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: ' 0 0 3px 3px',
        margin: '0 0 6px 0',
      });
    });

    it('should style BOTTOM_RIGHT cell with bottom rounded corners', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_RIGHT, DIRECTION.row);

      expect(result).toEqual({
        width: '6px',
        height: '14px',
        borderRadius: ' 0 0 3px 3px',
        margin: '0 0 6px 0',
      });
    });
  });

  // ===================================================================
  // PART 4: Column Direction - Left Column (3 tests)
  // ===================================================================

  describe('Column Direction - Left Column', () => {
    it('should style TOP_LEFT cell with left rounded corners', () => {
      const result = getStyledStretchDot(POSITION.TOP_LEFT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '3px 0 0 3px',
        margin: '0 0 0 6px',
      });
    });

    it('should style CENTER_LEFT cell with left rounded corners', () => {
      const result = getStyledStretchDot(POSITION.CENTER_LEFT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '3px 0 0 3px',
        margin: '0 0 0 6px',
      });
    });

    it('should style BOTTOM_LEFT cell with left rounded corners', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_LEFT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '3px 0 0 3px',
        margin: '0 0 0 6px',
      });
    });
  });

  // ===================================================================
  // PART 5: Column Direction - Center Column (3 tests)
  // ===================================================================

  describe('Column Direction - Center Column', () => {
    it('should style TOP_CENTER cell with full width', () => {
      const result = getStyledStretchDot(POSITION.TOP_CENTER, DIRECTION.column);

      expect(result).toEqual({
        width: '100%',
        height: '6px',
      });
    });

    it('should style CENTER_CENTER cell with full width', () => {
      const result = getStyledStretchDot(POSITION.CENTER_CENTER, DIRECTION.column);

      expect(result).toEqual({
        width: '100%',
        height: '6px',
      });
    });

    it('should style BOTTOM_CENTER cell with full width', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_CENTER, DIRECTION.column);

      expect(result).toEqual({
        width: '100%',
        height: '6px',
      });
    });
  });

  // ===================================================================
  // PART 6: Column Direction - Right Column (3 tests)
  // ===================================================================

  describe('Column Direction - Right Column', () => {
    it('should style TOP_RIGHT cell with right rounded corners', () => {
      const result = getStyledStretchDot(POSITION.TOP_RIGHT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '0 3px 3px 0',
        margin: '0 6px 0 0',
      });
    });

    it('should style CENTER_RIGHT cell with right rounded corners', () => {
      const result = getStyledStretchDot(POSITION.CENTER_RIGHT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '0 3px 3px 0',
        margin: '0 6px 0 0',
      });
    });

    it('should style BOTTOM_RIGHT cell with right rounded corners', () => {
      const result = getStyledStretchDot(POSITION.BOTTOM_RIGHT, DIRECTION.column);

      expect(result).toEqual({
        width: '14px',
        height: '6px',
        borderRadius: '0 3px 3px 0',
        margin: '0 6px 0 0',
      });
    });
  });

  // ===================================================================
  // PART 7: Default & Edge Cases (2 tests)
  // ===================================================================

  describe('Default & Edge Cases', () => {
    it('should return default styles for null direction', () => {
      const result = getStyledStretchDot(POSITION.CENTER_CENTER, null);

      expect(result).toEqual({
        width: '6px',
        height: '6px',
      });
    });

    it('should return default styles for undefined direction', () => {
      const result = getStyledStretchDot(POSITION.TOP_LEFT, undefined);

      expect(result).toEqual({
        width: '6px',
        height: '6px',
      });
    });
  });
});

