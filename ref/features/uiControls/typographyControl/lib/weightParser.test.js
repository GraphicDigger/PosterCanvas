// ===================================================================
// Unit Tests for Weight Parser
// CRITICAL BUSINESS LOGIC - Typography Control System
// Week 2, Day 2 - Part 2 (20 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock constants - must be defined before vi.mock
vi.mock('../../../../entities/uiElement', () => ({
  FONT_WEIGHT_MAP: {
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black',
    normal: 'Regular',
    bold: 'Bold',
    lighter: 'Light',
    bolder: 'Bold',
  },
  WEIGHT_NAME_TO_NUMBER: {
    'Thin': 100,
    'Extra Light': 200,
    'Light': 300,
    'Regular': 400,
    'Medium': 500,
    'Semi Bold': 600,
    'Bold': 700,
    'Extra Bold': 800,
    'Black': 900,
  },
}));

import { formatWeightForUI, parseWeightFromUI } from './weightParser';

describe('Weight Parser - Typography System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  // ===================================================================
  // PART 1: formatWeightForUI - Default Values (5 tests)
  // ===================================================================

  describe('formatWeightForUI - Default Values', () => {
    it('should format undefined as Regular', () => {
      const result = formatWeightForUI(undefined);

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Regular',
        weight: 400,
      });
    });

    it('should format null as Regular', () => {
      const result = formatWeightForUI(null);

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Regular',
        weight: 400,
      });
    });

    it('should format 400 as Regular with placeholder', () => {
      const result = formatWeightForUI(400);

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Regular',
        weight: 400,
      });
    });

    it('should format "normal" as Regular', () => {
      const result = formatWeightForUI('normal');

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Regular',
        weight: 400,
      });
    });

    it('should return fallback for unknown values', () => {
      const result = formatWeightForUI('invalid');

      // formatWeightForUI treats unknown strings as weight names
      expect(result).toEqual({
        displayValue: 'invalid',
        placeholder: '',
        weight: 400,
      });
    });
  });

  // ===================================================================
  // PART 2: formatWeightForUI - Numeric Values (5 tests)
  // ===================================================================

  describe('formatWeightForUI - Numeric Values', () => {
    it('should format 700 as Bold', () => {
      const result = formatWeightForUI(700);

      expect(result).toEqual({
        displayValue: 'Bold',
        placeholder: '',
        weight: 700,
      });
    });

    it('should format 300 as Light', () => {
      const result = formatWeightForUI(300);

      expect(result).toEqual({
        displayValue: 'Light',
        placeholder: '',
        weight: 300,
      });
    });

    it('should format 900 as Black', () => {
      const result = formatWeightForUI(900);

      expect(result).toEqual({
        displayValue: 'Black',
        placeholder: '',
        weight: 900,
      });
    });

    it('should format numeric string', () => {
      const result = formatWeightForUI('600');

      expect(result).toEqual({
        displayValue: 'Semi Bold',
        placeholder: '',
        weight: 600,
      });
    });

    it('should handle unknown numeric weight', () => {
      const result = formatWeightForUI(450);

      expect(result).toEqual({
        displayValue: 'Regular',
        placeholder: '',
        weight: 450,
      });
    });
  });

  // ===================================================================
  // PART 3: parseWeightFromUI - Weight Names (5 tests)
  // ===================================================================

  describe('parseWeightFromUI - Weight Names', () => {
    it('should parse "Bold" to 700', () => {
      const result = parseWeightFromUI('Bold');

      expect(result).toBe(700);
    });

    it('should parse "Light" to 300', () => {
      const result = parseWeightFromUI('Light');

      expect(result).toBe(300);
    });

    it('should parse "Black" to 900', () => {
      const result = parseWeightFromUI('Black');

      expect(result).toBe(900);
    });

    it('should parse "Medium" to 500', () => {
      const result = parseWeightFromUI('Medium');

      expect(result).toBe(500);
    });

    it('should parse "Regular" to 400', () => {
      const result = parseWeightFromUI('Regular');

      expect(result).toBe(400);
    });
  });

  // ===================================================================
  // PART 4: parseWeightFromUI - Edge Cases (3 tests)
  // ===================================================================

  describe('parseWeightFromUI - Edge Cases', () => {
    it('should parse null to 400', () => {
      const result = parseWeightFromUI(null);

      expect(result).toBe(400);
    });

    it('should parse empty string to 400', () => {
      const result = parseWeightFromUI('');

      expect(result).toBe(400);
    });

    it('should parse unknown weight name to 400', () => {
      const result = parseWeightFromUI('InvalidWeight');

      expect(result).toBe(400);
    });
  });

  // ===================================================================
  // PART 5: Integration Tests (2 tests)
  // ===================================================================

  describe('Integration - Round Trip', () => {
    it('should handle format -> parse -> format cycle for Bold', () => {
      // Start with 700
      const formatted = formatWeightForUI(700);
      expect(formatted.displayValue).toBe('Bold');

      // User sees "Bold" in UI, internally stored as weight name
      const parsed = parseWeightFromUI('Bold');
      expect(parsed).toBe(700);

      // Format again
      const reformatted = formatWeightForUI(parsed);
      expect(reformatted.displayValue).toBe('Bold');
      expect(reformatted.weight).toBe(700);
    });

    it('should handle format -> parse -> format cycle for numeric strings', () => {
      // User types "600" directly
      const parsed = parseWeightFromUI('600');
      expect(parsed).toBe(600);

      // Format for display
      const formatted = formatWeightForUI(parsed);
      expect(formatted.displayValue).toBe('Semi Bold');
      expect(formatted.weight).toBe(600);
    });
  });
});

