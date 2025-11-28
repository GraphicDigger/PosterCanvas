// ===================================================================
// Unit Tests for API Entity State Selectors
// CRITICAL BUSINESS LOGIC - API State Management
// Week 2, Day 5 - Part 3 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import {
  selectHoveredApiId,
  selectSelectedApiId,
  selectFocusedApiId,
  selectHoveredCallId,
  selectFocusedCallId,
  selectSelectedCallId,
  selectHoveredCategoryId,
  selectFocusedCategoryId,
  selectSelectedCategoryId,
  selectApiCheckStates,
  selectCallCheckStates,
  selectCategoryCheckStates,
} from './selectors';

describe('API Entity State Selectors', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      apiEntity: {
        hoveredApiId: 'api-1',
        selectedApiId: 'api-2',
        focusedApiId: 'api-3',
        hoveredCallId: 'call-1',
        focusedCallId: 'call-2',
        selectedCallId: 'call-3',
        hoveredCategoryId: 'cat-1',
        focusedCategoryId: 'cat-2',
        selectedCategoryId: 'cat-3',
      },
    };
  });

  // ===================================================================
  // PART 1: API State Selectors (3 tests)
  // ===================================================================

  describe('API State Selectors', () => {
    it('should select hovered API ID', () => {
      const result = selectHoveredApiId(mockState);

      expect(result).toBe('api-1');
    });

    it('should select selected API ID', () => {
      const result = selectSelectedApiId(mockState);

      expect(result).toBe('api-2');
    });

    it('should select focused API ID', () => {
      const result = selectFocusedApiId(mockState);

      expect(result).toBe('api-3');
    });
  });

  // ===================================================================
  // PART 2: Call State Selectors (3 tests)
  // ===================================================================

  describe('Call State Selectors', () => {
    it('should select hovered Call ID', () => {
      const result = selectHoveredCallId(mockState);

      expect(result).toBe('call-1');
    });

    it('should select focused Call ID', () => {
      const result = selectFocusedCallId(mockState);

      expect(result).toBe('call-2');
    });

    it('should select selected Call ID', () => {
      const result = selectSelectedCallId(mockState);

      expect(result).toBe('call-3');
    });
  });

  // ===================================================================
  // PART 3: Category State Selectors (3 tests)
  // ===================================================================

  describe('Category State Selectors', () => {
    it('should select hovered Category ID', () => {
      const result = selectHoveredCategoryId(mockState);

      expect(result).toBe('cat-1');
    });

    it('should select focused Category ID', () => {
      const result = selectFocusedCategoryId(mockState);

      expect(result).toBe('cat-2');
    });

    it('should select selected Category ID', () => {
      const result = selectSelectedCategoryId(mockState);

      expect(result).toBe('cat-3');
    });
  });

  // ===================================================================
  // PART 4: API Check States (3 tests)
  // ===================================================================

  describe('API Check States', () => {
    it('should return correct check states for selected API', () => {
      const result = selectApiCheckStates(mockState, 'api-2');

      expect(result).toEqual({
        isSelected: true,
        isHovered: false,
        isFocused: false,
      });
    });

    it('should return correct check states for hovered API', () => {
      const result = selectApiCheckStates(mockState, 'api-1');

      expect(result).toEqual({
        isSelected: false,
        isHovered: true,
        isFocused: false,
      });
    });

    it('should return correct check states for focused API', () => {
      const result = selectApiCheckStates(mockState, 'api-3');

      expect(result).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: true,
      });
    });
  });

  // ===================================================================
  // PART 5: Call Check States (3 tests)
  // ===================================================================

  describe('Call Check States', () => {
    it('should return correct check states for selected Call', () => {
      const result = selectCallCheckStates(mockState, 'call-3');

      expect(result).toEqual({
        isSelected: true,
        isHovered: false,
        isFocused: false,
      });
    });

    it('should return correct check states for hovered Call', () => {
      const result = selectCallCheckStates(mockState, 'call-1');

      expect(result).toEqual({
        isSelected: false,
        isHovered: true,
        isFocused: false,
      });
    });

    it('should return correct check states for focused Call', () => {
      const result = selectCallCheckStates(mockState, 'call-2');

      expect(result).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: true,
      });
    });
  });

  // ===================================================================
  // PART 6: Category Check States (3 tests)
  // ===================================================================

  describe('Category Check States', () => {
    it('should return correct check states for selected Category', () => {
      const result = selectCategoryCheckStates(mockState, 'cat-3');

      expect(result).toEqual({
        isSelected: true,
        isHovered: false,
        isFocused: false,
      });
    });

    it('should return correct check states for hovered Category', () => {
      const result = selectCategoryCheckStates(mockState, 'cat-1');

      expect(result).toEqual({
        isSelected: false,
        isHovered: true,
        isFocused: false,
      });
    });

    it('should return correct check states for focused Category', () => {
      const result = selectCategoryCheckStates(mockState, 'cat-2');

      expect(result).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: true,
      });
    });
  });

  // ===================================================================
  // PART 7: Edge Cases & Null Handling (2 tests)
  // ===================================================================

  describe('Edge Cases & Null Handling', () => {
    it('should handle undefined apiEntity gracefully', () => {
      const emptyState = { apiEntity: undefined };

      expect(selectHoveredApiId(emptyState)).toBeUndefined();
      expect(selectSelectedApiId(emptyState)).toBeUndefined();
      expect(selectFocusedApiId(emptyState)).toBeUndefined();
      expect(selectHoveredCallId(emptyState)).toBeUndefined();
      expect(selectHoveredCategoryId(emptyState)).toBeUndefined();
    });

    it('should return all false for non-matching IDs', () => {
      const apiResult = selectApiCheckStates(mockState, 'api-999');
      const callResult = selectCallCheckStates(mockState, 'call-999');
      const categoryResult = selectCategoryCheckStates(mockState, 'cat-999');

      expect(apiResult).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: false,
      });

      expect(callResult).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: false,
      });

      expect(categoryResult).toEqual({
        isSelected: false,
        isHovered: false,
        isFocused: false,
      });
    });
  });
});

